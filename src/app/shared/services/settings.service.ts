import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GmePriceEntry } from './gme-price-entry.interface';
import { TimelineEventType } from '../../main-pages/timeline/timeline-items/timeline-item/timeline-event-type.enum';
import { EarningsResult } from '../../main-pages/financials/earnings-results/earnings-result.class';
import { EarningsResultInterface } from '../../main-pages/financials/earnings-results/earnings-result.interface';
import { TimelineEventConfig } from '../../main-pages/timeline/timeline-items/timeline-item/timeline-event-config.interface';
import dayjs from 'dayjs';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this._localStorage = localStorage;
    } else {
      this._localStorage = null;
    }

  }


  private _localStorage: Storage | null;
  private _categories: TimelineEventType[] = [];
  private _significanceValue: number = -1;
  private _chartListIsVertical: boolean = false;
  private _chartListIsVertical$: Subject<boolean> = new Subject();

  private _quarterlyEarnings: EarningsResult[] = [];
  private _annualEarnings: EarningsResult[] = [];

  private _latestEarningsDateYYYYMMDD: string | null = null;
  private _lastEventsCheckedDateYYYYMMDD: string | null = null;

  private _gmeData: GmePriceEntry[] = [];
  private _eventConfigs: TimelineEventConfig[] = [];


  public get categories(): TimelineEventType[] { return this._categories; }
  public get significanceValue(): number { return this._significanceValue; }
  public get quarterlyEarnings(): EarningsResult[] { return this._quarterlyEarnings; }
  public get annualEarnings(): EarningsResult[] { return this._annualEarnings; }
  public get gmeData(): GmePriceEntry[] { return this._gmeData; }
  public get eventConfigs(): TimelineEventConfig[] { return this._eventConfigs; }

  public get latestEarningsDateYYYYMMDD(): string | null { return this._latestEarningsDateYYYYMMDD; }
  public get lastEventsCheckedDateYYYYMMDD(): string | null { return this._lastEventsCheckedDateYYYYMMDD; }

  public get chartListIsVertical(): boolean { return this._chartListIsVertical; }
  public get chartListIsVertical$(): Observable<boolean> { return this._chartListIsVertical$.asObservable(); }

  public getSettings() {
    this._chartListIsVertical = this._loadDirectionIsVerticalFromLS();
    this._categories = this._loadCategoriesFromLS();
    this._significanceValue = this._loadSignificanceFromLS();
    this._quarterlyEarnings = this._loadQuarterlyEarningsFromLS();
    this._annualEarnings = this._loadAnnualEarningsFromLS();
    this._latestEarningsDateYYYYMMDD = this._getLatestEarningsDate();
    this._gmeData = this._loadGmeDataFromLS();
    this._eventConfigs = this._loadEventsFromLS();
    const lastCheckDate = this._getLastEventsCheckedDate();
    if (lastCheckDate) {
      this._lastEventsCheckedDateYYYYMMDD = lastCheckDate.format('YYYY-MM-DD');
    } else {

    }
  }


  
  public getDarkMode(): boolean {
    let darkMode: boolean = false;
    if (this._localStorage) {
      let storageValue = this._localStorage.getItem('light-or-dark');
      if(storageValue !== null){
        if(storageValue === 'LIGHT'){
          darkMode = false;
        }else if(storageValue === 'DARK'){
          darkMode = true;
        }
      }
    }
    return darkMode;
  }
  public setDarkMode(isDarkMode: boolean){
    if (this._localStorage) {
      let storageValue = 'LIGHT';
      if(isDarkMode === true){
        storageValue = 'DARK';
      }
      this._localStorage.setItem('light-or-dark', storageValue);
    }
  }

  /**
   * 
   * @param now current time to compare against previous time
   * @returns true if an update is required, false to take no action.
   */
  public gmeCheckTimeLapsed(now: dayjs.Dayjs): boolean {
    if (this._localStorage) {
      let storageValue = this._localStorage.getItem('latest_events_check_time');
      if (storageValue) {
        const prevTime = dayjs(storageValue);
        if (now.isAfter(prevTime.add(24, 'hours'))) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
    return true;
  }

  private _getLastEventsCheckedDate(): dayjs.Dayjs | null {
    if (this._localStorage) {
      let storageValue = this._localStorage.getItem('latest_events_check_time');
      if (storageValue) {
        let timeValue = dayjs(storageValue);
        return timeValue;
      }
    }
    return null;
  }

  public setLastEventsCheckedDate() {
    if(this._localStorage){
      this._localStorage.setItem('latest_events_check_time', dayjs().format());
    }
  }

  private _loadGmeDataFromLS(): GmePriceEntry[] {
    if(this._localStorage){
      let storageValue = this._localStorage.getItem('gme_data');
      if (storageValue !== null) {
        let priceEntries: GmePriceEntry[] = JSON.parse(storageValue);
        return priceEntries;
      }
    }

    return [];
  }
  private _loadEventsFromLS(): TimelineEventConfig[] {
    if(this._localStorage){
      let storageValue = this._localStorage.getItem('events_data');
      if (storageValue !== null) {
        let events: TimelineEventConfig[] = JSON.parse(storageValue);
        return events;
      }
    }
    return [];
  }

  public updateCategories(selectedCategories: TimelineEventType[]) {
    // console.log(selectedCategories);
    let categoriesString = '';
    selectedCategories.forEach(category => {
      categoriesString += "'" + category + "', ";
    });
    categoriesString = categoriesString.trimEnd();
    categoriesString = categoriesString.substring(0, categoriesString.length - 1);

    this._localStorage?.setItem('categories', categoriesString);
    this._categories = this._loadCategoriesFromLS();
  }
  public updateSignificanceValue(value: number) {
    this._significanceValue = value;
    this._localStorage?.setItem('significance', String(this._significanceValue));
  }
  public updateListDirection(direction: 'VERTICAL' | 'HORIZONTAL') {
    if (direction === 'VERTICAL') {
      this._chartListIsVertical = true;
    } else {
      this._chartListIsVertical = false;
    }
    this._chartListIsVertical$.next(this._chartListIsVertical);
    this._localStorage?.setItem('list_display_direction', direction);
  }

  public setEarningsData(annualResults: EarningsResult[], quarterlyResults: EarningsResult[]) {
    this._localStorage?.setItem('quarterly_earnings', JSON.stringify(quarterlyResults.map(item => item.data)));
    this._localStorage?.setItem('annual_earnings', JSON.stringify(annualResults.map(item => item.data)));
  }
  public setGmeData(gmeData: GmePriceEntry[]) {
    this._localStorage?.setItem('gme_data', JSON.stringify(gmeData));
  }
  public setEventsData(events: TimelineEventConfig[]) {
    this._localStorage?.setItem('events_data', JSON.stringify(events));
  }


  private _getLatestEarningsDate(): string | null {
    let value: string = '';
    if (this.quarterlyEarnings.length > 0) {
      if (this.quarterlyEarnings[0].filingDateYYYYMMDD) {
        value = this.quarterlyEarnings[0].filingDateYYYYMMDD;
        return value;
      }
    }
    return null;
  }


  private _loadQuarterlyEarningsFromLS(): EarningsResult[] {
    if(this._localStorage){
      let storageValue = this._localStorage.getItem('quarterly_earnings');
      if (storageValue !== null) {
        let config: EarningsResultInterface[] = JSON.parse(storageValue);
        let earnings: EarningsResult[] = config.map(config => new EarningsResult(config));
        return earnings;
      }
    }
    return [];
  }
  private _loadAnnualEarningsFromLS(): EarningsResult[] {
    if(this._localStorage){
      let storageValue = this._localStorage.getItem('annual_earnings');
      if (storageValue !== null) {
        let config: EarningsResultInterface[] = JSON.parse(storageValue);
        let earnings: EarningsResult[] = config.map(config => new EarningsResult(config));
        return earnings;
      }
    }
    return [];
  }

  private _loadSignificanceFromLS(): number {
    if(this._localStorage){
      const significanceStr = this._localStorage.getItem('significance');
      let significance: number = 3;
      if (significanceStr !== null) {
        significance = Number(significanceStr);
      }
      return significance;
    }
    return 3;
  }

  private _loadDirectionIsVerticalFromLS(): boolean {
    if(this._localStorage){
      const displayValue = this._localStorage.getItem('list_display_direction');
      let isVertical: boolean = false;
      if (displayValue !== null) {
        if (displayValue === 'VERTICAL') {
          isVertical = true;
        }
      }
      return isVertical;
    }
    return false;
  }

  private _loadCategoriesFromLS(): TimelineEventType[] {
    if(this._localStorage){
      const categoriesString = this._localStorage.getItem('categories');
      const categoriesSplit = categoriesString?.split(", ");
      let categories: TimelineEventType[] = [];
      categoriesSplit?.forEach(category => {
        category = category.substring(1, category.length - 1)
        categories.push(this._resolveCategory(category));
      });
      if (categories.length === 0) {
        categories.push(TimelineEventType.DRS);
        categories.push(TimelineEventType.CORP);
        categories.push(TimelineEventType.RC);
        categories.push(TimelineEventType.MEDIA);
        categories.push(TimelineEventType.SOCIAL_MEDIA);
        categories.push(TimelineEventType.OTHER);
      }
      categories = this._sortCategories(categories);
      return categories;
    }
    return [];
  }

  private _sortCategories(categories: TimelineEventType[]) {
    const priority = [
      TimelineEventType.DRS, TimelineEventType.CORP, TimelineEventType.RC, TimelineEventType.MEDIA, TimelineEventType.SOCIAL_MEDIA, TimelineEventType.OTHER,
    ];
    const newCategories: TimelineEventType[] = [];
    priority.forEach(priorityItem => {
      if (categories.indexOf(priorityItem) > -1) {
        newCategories.push(priorityItem);
      }
    })
    return newCategories;
  }

  private _resolveCategory(categoryString: string): TimelineEventType {
    let type: TimelineEventType = TimelineEventType.OTHER;
    if (categoryString === 'Corporate') {
      type = TimelineEventType.CORP;
    } else if (categoryString === 'DRS') {
      type = TimelineEventType.DRS;
    } else if (categoryString === 'Media') {
      type = TimelineEventType.MEDIA;
    } else if (categoryString === 'Ryan Cohen') {
      type = TimelineEventType.RC;
    } else if (categoryString === 'Social Media') {
      type = TimelineEventType.SOCIAL_MEDIA;
    } else if (categoryString === 'Other') {
      type = TimelineEventType.OTHER;
    }
    return type;
  }
}
