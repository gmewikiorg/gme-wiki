import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { TimelineEvent } from './timeline-item/timeline-event.class';
import { TimelineEventType } from './timeline-item/timeline-event-type.enum';
import { EarningsResult } from '../../financials/earnings-results/earnings-result.class';

@Injectable({
  providedIn: 'root'
})
export class TimelineItemsService {

  constructor() { }

  private _significanceValue: number = 1;
  private _itemCategories: TimelineEventType[] = [
    TimelineEventType.CORP, TimelineEventType.SOCIAL_MEDIA, TimelineEventType.DRS, TimelineEventType.MEDIA, TimelineEventType.OTHER, TimelineEventType.RC,
  ];

  private _itemSelected$: Subject<{ item: TimelineEvent, source: 'CHART' | 'ITEMS' | 'UNSELECT' }> = new Subject();
  public get itemSelected$(): Observable<{ item: TimelineEvent, source: 'CHART' | 'ITEMS' | 'UNSELECT' }> { return this._itemSelected$.asObservable(); }
  private _unselectAll$: Subject<boolean> = new Subject();
  public get unselectAll$(): Observable<boolean> { return this._unselectAll$.asObservable(); }
  public selectItem(item: TimelineEvent, source: 'CHART' | 'ITEMS') { this._itemSelected$.next({ item: item, source: source }); }
  public unselectItem(item: TimelineEvent) { this._itemSelected$.next({ item: item, source: 'UNSELECT' }); }

  public unselectAll() { this._unselectAll$.next(true); }

  private _allTimelineItems$: BehaviorSubject<TimelineEvent[]> = new BehaviorSubject<TimelineEvent[]>([]);
  private _displayedTimelineItems$: BehaviorSubject<TimelineEvent[]> = new BehaviorSubject<TimelineEvent[]>([]);
  public setAllTimelineEvents(items: TimelineEvent[]) {
    this._allTimelineItems$.next(items);
    this._displayedTimelineItems$.next(items);
  }

  public setDisplayedTimelineEvents(events: TimelineEvent[]) {
    this._displayedTimelineItems$.next(events);
  }

  public resetTimelineEvents() {
    this._displayedTimelineItems$.next(this.allTimelineItems);
  }

  // public get allTimelineItems$(): Observable<TimelineEvent[]> { return this._allTimelineItems$.asObservable(); }
  public get allTimelineItems(): TimelineEvent[] { return this._allTimelineItems$.getValue(); }

  public get displayedTimelineItems$(): Observable<TimelineEvent[]> { return this._displayedTimelineItems$.asObservable(); }
  public get displayedTimelineItems(): TimelineEvent[] { return this._displayedTimelineItems$.getValue(); }


  public get stockSplitItem(): TimelineEvent | undefined { return this.allTimelineItems.find(item => item.specialIdentifier === 'STOCK-SPLIT'); }

  public onClickStockSplitItem() {
    if (this.stockSplitItem) {
      this.selectItem(this.stockSplitItem, 'ITEMS');
    }
  }

  public updateSignificanceValue(value: number) {
    this._significanceValue = value;
    this._update();
  }
  public updateCategories(categories: TimelineEventType[]) {
    this._itemCategories = categories;
    this._update();
  }

  private _update() {
    const displayedItems = this.allTimelineItems.filter(item => {
      const showBySignificance: boolean = item.significance >= this._significanceValue;
      let showByCategory: boolean = false;
      item.types.forEach(type => {
        if (this._itemCategories.indexOf(type) > -1) {
          showByCategory = true;
        }
      });
      return showBySignificance && showByCategory;
    });
    // displayedItems.forEach(item => {
    //   if(item.types.length > 1){
    //     // console.log("ITEM has more than 1 type:", item.title, item.types)
    //   }
    // })
    this._displayedTimelineItems$.next(displayedItems);
  }

  public setQuarterlyFinancialResults(results: EarningsResult[]) {
    this.allTimelineItems.forEach(item => {
      results.forEach(result => {
        if (item.dateYYYYMMDD === result.filingDateYYYYMMDD && item.types.indexOf(TimelineEventType.CORP) > -1) {
          item.setQuarterlyFinancialResult(result);
        }
      });
    });
  }

}
