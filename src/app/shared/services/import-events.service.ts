import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map, Observable, Subject } from 'rxjs';
import { TimelineEventConfig } from '../../main-pages/timeline/timeline-items/timeline-item/timeline-event-config.interface';
import { TimelineEventURL, TimelineEventViewType } from '../../main-pages/timeline/timeline-items/timeline-item/timeline-event-url.interface';
import { TimelineEventType } from '../../main-pages/timeline/timeline-items/timeline-item/timeline-event-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ImportEventsService {

  constructor(private httpClient: HttpClient) { }


  /**
   * 
   * The .csv document is picky, must remove the last empty line.
   * separated by ">"
   */
  public async importEventsFromCSV$(){
    const eventsSubject: Subject<TimelineEventConfig[]> = new Subject();
    const eventConfigs: TimelineEventConfig[] = [];

    const eventsFilename = 'assets/data/timeline-events.csv';

    return await lastValueFrom(this.httpClient.get(eventsFilename, { responseType: 'text' },)
      .pipe(
        map(data => this._buildEventConfigs(data)),
        // catchError(error => of([]))
      ))
  }

  private _buildEventConfigs(response: string): TimelineEventConfig[] {

    const eventConfigs: TimelineEventConfig[] = [];
    let lines = response.split('\n');
    lines = lines.slice(1);
    lines.forEach(line => {
      if(line.length > 0){
        let commaSplitLine = line.split('>');
        const title = commaSplitLine[0];
        const shortTitle = commaSplitLine[1];
        const description = commaSplitLine[2];
        const dateYYYYMMDD = commaSplitLine[3];
        const significance = Number(commaSplitLine[4]);
        const imgSrc = commaSplitLine[5];
        const tags: string[] = this._getTagsFromSource(commaSplitLine[6]);
        const urls: TimelineEventURL[] = this._getUrlsFromSource(commaSplitLine[7]);
        const types: TimelineEventType[] = this._getEventTypes(commaSplitLine[8]);
        const localArticle: TimelineEventURL | null = this._getLocalArticle(commaSplitLine[9]);
        const expandedUrls: TimelineEventURL[] = this._getUrlsFromSource(commaSplitLine[10]);
        const specificView: TimelineEventViewType[] = this._getViewType(commaSplitLine[11]);
        const eventConfig: TimelineEventConfig = {
          title: title,
          shortTitle: shortTitle,
          dateYYYYMMDD: dateYYYYMMDD,
          urls: urls,
          description: description,
          types: types,
          significance: significance,
          imgSrc: imgSrc,
          tags: tags,
          localArticle: localArticle,
          expandedUrls: expandedUrls,
          specificViews: specificView,
        }
        eventConfigs.push(eventConfig);
      }
      
    });
    return eventConfigs;
  }

  private _getViewType(sourceValue: string): TimelineEventViewType[] {
    const viewTypes: TimelineEventViewType[] = [];
    sourceValue = sourceValue.substring(1, sourceValue.length - 2);
    let sourceTypes = sourceValue.split(";").filter(value => value !== "");
    sourceTypes.forEach(sourceType => {
      let type: TimelineEventViewType | null = null;
      if (sourceType === 'CURRENT') {
        type = 'CURRENT';
      } else if (sourceType === 'HISTORIC') {
        type = 'HISTORIC';
      } else if (sourceType === 'CURRENT_MOBILE') {
        type = 'CURRENT_MOBILE';
      } else if (sourceType === 'HISTORIC_MOBILE') {
        type = 'HISTORIC_MOBILE';
      }else if (sourceType === 'SNEEZE') {
        type = 'SNEEZE';
      }
      if(type !== null){
        viewTypes.push(type);
      }

    })
    return viewTypes;
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
