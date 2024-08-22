import { Injectable } from '@angular/core';
import { TimelineEventConfig } from '../pages/display-timeline/timeline-items/timeline-item/timeline-event-config.interface';
import { HttpClient } from '@angular/common/http';
import { TimelineEventType } from '../pages/display-timeline/timeline-items/timeline-item/timeline-event-type.enum';
import { TimelineEventURL } from '../pages/display-timeline/timeline-items/timeline-item/timeline-event-url.interface';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportEventsService {

  constructor(private httpClient: HttpClient) { }

  public importEventsFromGoogleSheet$(): Observable<TimelineEventConfig[]> {
    const eventsSubject: Subject<TimelineEventConfig[]> = new Subject();
    /**
     *  Google Sheet needs to be publish as tsv (tab-separated values) and not csv.
     *  TSV output is far more simple to parse. 
     */
    const eventsGoogleSheetTsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQixUOsD8VuEXI06nXbOqMGsDbQiofVAYlbL9_-fh6xo21SSt84x2e0iqDBqWmj_e--CXKpKtiPbjOq/pub?gid=1314216829&single=true&output=tsv';
    const eventConfigs: TimelineEventConfig[] = [];
    this.httpClient.get(eventsGoogleSheetTsvUrl, { responseType: 'text' }).subscribe({
      next: (response) => {
        let lines = response.split('\n');
        lines = lines.slice(1);
        lines.forEach(line => {
          let tabSplitLine = line.split('\t');
          const title = tabSplitLine[0];
          const description = tabSplitLine[1];
          const dateYYYYMMDD = tabSplitLine[2];
          const significance = Number(tabSplitLine[3]);
          const specialIdentifier = tabSplitLine[4];
          const imgSrc = tabSplitLine[5];
          const tags: string[] = this._getTagsFromSource(tabSplitLine[6]);
          const urls: TimelineEventURL[] = this._getUrlsFromSource(tabSplitLine[7]);
          const types: TimelineEventType[] = this._getEventTypes(tabSplitLine[8]);
          const localArticle: TimelineEventURL | null = this._getLocalArticle(tabSplitLine[9]);
          const expandedUrls: TimelineEventURL[] = this._getUrlsFromSource(tabSplitLine[10]);
          const eventConfig: TimelineEventConfig = {
            title: title,
            dateYYYYMMDD: dateYYYYMMDD,
            urls: urls,
            description: description,
            types: types,
            significance: significance,
            imgSrc: imgSrc,
            specialIdentifier: specialIdentifier,
            tags: tags,
            localArticle: localArticle,
            expandedUrls: [],
          }
          eventConfigs.push(eventConfig);
        });

        // console.log("Event configs", eventConfigs)
        eventsSubject.next(eventConfigs);
        eventsSubject.complete();
      },
    })

    return eventsSubject.asObservable();
  }

  private _getLocalArticle(sourceValue: string): TimelineEventURL | null {
    if (sourceValue === '{}') {
      return null;
    } else {
      let localArticle = sourceValue.substring(1, sourceValue.length - 1);
      let split = localArticle.split('}}');
      const url = split[0];
      const label = split[1];
      const eventUrl: TimelineEventURL = {
        url: url,
        type: 'NEWS',
        label: label,
      };
      return eventUrl;
    }

  }

  private _getEventTypes(sourceValue: string): TimelineEventType[] {
    const types: TimelineEventType[] = [];
    sourceValue = sourceValue.substring(1, sourceValue.length - 2);
    let sourceTags = sourceValue.split(";").filter(value => value !== "");
    sourceTags.forEach(sourceTag => {
      let type: TimelineEventType = TimelineEventType.OTHER;
      if (sourceTag === 'Media') {
        type = TimelineEventType.MEDIA;
      } else if (sourceTag === 'Corporate') {
        type = TimelineEventType.CORP;
      } else if (sourceTag === 'Ryan Cohen') {
        type = TimelineEventType.RC;
      } else if (sourceTag === 'Social Media') {
        type = TimelineEventType.SOCIAL_MEDIA;
      } else if (sourceTag === 'DRS') {
        type = TimelineEventType.DRS;
      }
      types.push(type);
    })
    return types;
  }

  private _getTagsFromSource(sourceTags: string): string[] {
    const tags: string[] = [];
    sourceTags = sourceTags.substring(1, sourceTags.length - 1);
    sourceTags.split(";").filter(tag => tag !== '').forEach(tag => { tags.push(tag) });
    return tags;
  }

  private _getUrlsFromSource(sourceValue: string): TimelineEventURL[] {
    const urls: TimelineEventURL[] = [];
    if (sourceValue !== '[]') {

      sourceValue = sourceValue.substring(1, sourceValue.length - 2);
      //remove starting character [ and ending character ]

      if (sourceValue.length > 0) {
        let sourceURLs = sourceValue.split(';');
        sourceURLs.forEach(sourceUrl => {
          const splitSource = sourceUrl.split('}}');
          const newUrl: TimelineEventURL = {
            url: splitSource[0],
            type: this._getUrlType(splitSource[0]),
            label: splitSource[1],
            archiveLink: '',
          }
          urls.push(newUrl);
        });
      }
    }
    // console.log("Returning URLS", urls)
    return urls;
  }

  private _getUrlType(sourceUrl: string): 'YOUTUBE' | 'REDDIT' | 'LEMMY' | 'WIKIPEDIA' | 'X-TWITTER' | 'ARCHIVE' | 'NEWS' | 'DOCUMENT' | 'GAMESTOP' | 'OTHER' {
    let urlType: 'YOUTUBE' | 'REDDIT' | 'LEMMY' | 'WIKIPEDIA' | 'X-TWITTER' | 'ARCHIVE' | 'NEWS' | 'DOCUMENT' | 'GAMESTOP' | 'OTHER' = 'OTHER';
    sourceUrl = sourceUrl.toLowerCase();
    if (sourceUrl.includes('youtube.com') || sourceUrl.includes('youtu.be')) {
      urlType = 'YOUTUBE';
    }
    if (sourceUrl.includes('reddit.com')) {
      urlType = 'REDDIT';
    }
    if (sourceUrl.includes('lemmy.')) {
      urlType = 'LEMMY';
    }
    if (sourceUrl.includes('wikipedia.')) {
      urlType = 'WIKIPEDIA';
    }
    if (sourceUrl.includes('//x.com') || sourceUrl.includes('twitter.')) {
      urlType = 'X-TWITTER';
    }
    if (sourceUrl.includes('sec.gov')) {
      urlType = 'DOCUMENT';
    }
    if (sourceUrl.includes('gamestop.com') || sourceUrl.includes('gamestop.gcs-web.com')) {
      urlType = 'GAMESTOP';
    }
    if (sourceUrl.includes('forbes.com') || sourceUrl.includes('businessinsider.com') || sourceUrl.includes('reuters.com')) {
      urlType = 'NEWS';
    }
    if (sourceUrl.includes('web.archive')) {
      urlType = 'ARCHIVE';
    }
    return urlType;
  }
}
