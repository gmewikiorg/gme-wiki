import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChartDataSetManager } from './timeline-chart-dataset-manager.class';
import { TimelineEventType } from '../timeline-items/timeline-item/timeline-event-type.enum';
import { TimelineEvent } from '../timeline-items/timeline-item/timeline-event.class';
import { ChartDataset, ScatterDataPoint } from 'chart.js';

@Injectable({
  providedIn: 'root'
})

export class ChartDataManagerService {
  /**
   * The ChartDataManagerService manages the datasets for the chart.  As filters are applied, the datasets need to be updated.
   */
  constructor() {
    this._dataManager = new ChartDataSetManager('', '', [], [], [], -1, false, false);
  }

  private _dataSets$: BehaviorSubject<ChartDataset<"line", (number | ScatterDataPoint | null)[]>[]> = new BehaviorSubject<ChartDataset<"line", (number | ScatterDataPoint | null)[]>[]>([]);
  private _chartLabels: string[] = [];
  private _dataManager: ChartDataSetManager;
  public get chartLabels(): string[] { return this._chartLabels; }
  public get dataSets(): ChartDataset<"line", (number | ScatterDataPoint | null)[]>[] { return this._dataSets$.getValue(); }
  public get dataSets$(): Observable<ChartDataset<"line", (number | ScatterDataPoint | null)[]>[]> { return this._dataSets$.asObservable(); }

  public get viewStartDateYYYYMMDD(): string { return this._dataManager.startDateYYYYMMDD; }
  public get viewEndDateYYYYMMDD(): string { return this._dataManager.endDateYYYYMMDD; }

  /** this value is set one time, provided by AppComponent */
  public setDataManager(dataManager: ChartDataSetManager) {
    /** this value is set one time, provided by AppComponent */
    this._dataManager = dataManager;
    // console.log('register data manager', dataManager)

    this._dataManager.datasets$.subscribe({
      next: (datasets) => {
        this._chartLabels = this._dataManager.chartLabels;
        this._dataSets$.next(datasets);
      },
      error: () => { },
      complete: () => { },
    });
    // console.log("****.getAndUpdateDatasets()")
    this._dataManager.getAndUpdateDatasets();
  }

  // public getAndUpdateDatasets() { this._dataManager.getAndUpdateDatasets(); }

  public updateSignificanceValue(value: number) {
    this._dataManager.updateSignificanceValue(value);
  }
  public updateCategories(categories: TimelineEventType[]) {
    this._dataManager.updateCategories(categories);
  }
  public updateDisplayedEvents(events: TimelineEvent[]) {
    this._dataManager.updateDisplayedEvents(events);
  }
  public updatePeriod(period: '2_YEARS' | '5_YEARS' | 'CURRENT' | 'HISTORIC' | 'CUSTOM', startDateYYYYMMDD: string, endDateYYYYMMDD: string) {
    this._dataManager.updatePeriod(period, startDateYYYYMMDD, endDateYYYYMMDD);
  }
  public updateMetric(metric: 'PRICE' | 'VOLUME' | 'EQUITY' | 'PTOB' | 'PTOS' | 'PTOE') {
    this._dataManager.updateMetric(metric);
  }

  public updateDarkMode(isDarkMode: boolean) {
    this._dataManager.updateDarkMode(isDarkMode);
  }
  public updateIsMobile(isMobile: boolean){
    this._dataManager.updateIsMobile(isMobile);
  }



  public clearSearchResults(significance: number, categories: TimelineEventType[], allEvents: TimelineEvent[]) {
    this._dataManager.clearSearchResults(significance, categories, allEvents);
  }

  public lookupEventByIndex(datasetIndex: number, index: number) {
    return this._dataManager.lookupTimelineItemByIndex(datasetIndex, index);
  }
  public lookupDataset(datasetIndex: number) {
    return this._dataManager.lookupDataset(datasetIndex);
  }
  public lookupIndexByEvent(event: TimelineEvent): { datasetIndex: number, itemIndex: number } {
    return this._dataManager.lookupIndexByTimelineItem(event);
  }



}
