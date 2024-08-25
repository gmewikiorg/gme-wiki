import { Injectable } from '@angular/core';
import { TimelineEvent } from '../../../timeline-items/timeline-item/timeline-event.class';
import { HttpClient } from '@angular/common/http';
import { TagAssociation, TagAssociation as string } from './tag-association.interface';
import { TagAssociationLoader } from './tag-association-loader';
import { TagSearchManager } from './tag-search-manager.class';
import { TagSearchable } from './tag-searchable.class';
import { Observable, Subject } from 'rxjs';
import { DdSearchManager } from './dd-search-manager.class';
import { DdEntry } from '../../../../../shared/services/dd-entry.interface';

@Injectable({
  providedIn: 'root'
})
export class EventSearchService {
  constructor(private _httpClient: HttpClient) { }

  private _timelineItems: TimelineEvent[] = [];
  private _tagSearchManager: TagSearchManager = new TagSearchManager([],[]);
  private _ddSearchManager: DdSearchManager = new DdSearchManager([]);

  private _tagAssociations: TagAssociation[] = [];

  private _showStoryOverviewButton: boolean = false;
  public get showStoryOverviewButton(): boolean { return this._showStoryOverviewButton; }
  
  private _closeControls$: Subject<boolean> = new Subject();
  public get closeControls$(): Observable<boolean> { return this._closeControls$.asObservable(); }

  public setTimelineItems(timelineItems: TimelineEvent[], ddEntries: DdEntry[]) {
    this._timelineItems = timelineItems;
    this._ddSearchManager = new DdSearchManager(ddEntries);
    this._initiate();
  }

  private _isInitiated: boolean = false;
  private _initiate(){
    if(!this._isInitiated){
      const loader: TagAssociationLoader = new TagAssociationLoader(this._httpClient);
      loader.loadTagAssociationsCSV$().subscribe({
        next: (tags) => {
          this._tagAssociations = tags;
          this._isInitiated = true;
          this._tagSearchManager = new TagSearchManager(this._timelineItems, this._tagAssociations);
        },
        error: () => { },
        complete: () => { },
      });
    }
  }
  public get allTimelineEvents(): TimelineEvent[] { return this._timelineItems; }

  private _tagResults: TagSearchable[] = [];
  public get tagResults(): TagSearchable[] { return this._tagResults; }
  private _eventResults: TimelineEvent[] = [];
  public get eventResults(): TimelineEvent[] { return this._eventResults; }

  private _ddResults: DdEntry[] = [];
  public get ddResults(): DdEntry[] { return this._ddResults; }


  public search(searchValue: string){
    this._tagResults = this._tagSearchManager.search(searchValue);
    if(this._tagResults.length === 1){
      this._eventResults = this.tagResults[0].events;
    }
    this._ddResults = [];
    if(searchValue.length > 1){
      this._ddResults = this._ddSearchManager.search(searchValue);
    }
    
  }
  public clearSearch(){
    this._tagSearchManager.clearSearch();
    this._tagResults = [];
    this._eventResults = [];
    this._closeControls$.next(true);
  }
  public onClickTagSearchable(tag: TagSearchable){
    this._tagResults = this._tagSearchManager.setTagSearchable(tag);
    this._eventResults = this.tagResults[0].events;
  }


  public getEventsByDates(startDateYYYYMMDD: string, endDateYYYYMMDD: string){
    const results: TimelineEvent[] = [];
    this.allTimelineEvents
      .filter(event => event.dateYYYYMMDD >= startDateYYYYMMDD && event.dateYYYYMMDD <= endDateYYYYMMDD)
      .filter(event => event.significance >= 1)
      .forEach(event => results.push(event));
    this._eventResults = results;
    return results;
  }

  public onClickChapter(){
    this._showStoryOverviewButton = true;
    this._closeControls$.next(true);
  }
  public onClickStoryOverviewButton(){
    this._showStoryOverviewButton = false;
    this._closeControls$.next(true);
  }


}
