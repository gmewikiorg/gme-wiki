import { GmePriceEntry } from "../../../shared/services/gme-price-entry.interface";
import { TimelineEventType } from "../timeline-items/timeline-item/timeline-event-type.enum";
import { TimelineEvent } from "../timeline-items/timeline-item/timeline-event.class";
import { DatasetConfig } from "./timeline-chart-dataset-config.class";
import { BehaviorSubject, Observable } from 'rxjs';
import { ChartDataItemBuilder } from "./timeline-chart-data-item-builder.class";
import { ChartDataset, ScatterDataPoint } from "chart.js";
import dayjs from "dayjs";


export class ChartDataSetManager {

  private _allPriceEntries: GmePriceEntry[] = [];
  private _datasets$: BehaviorSubject<any[]> = new BehaviorSubject<any>([]);
  private _chartLabels: string[] = [];
  private _datasetConfigs: DatasetConfig[] = [];
  private _timelineEvents: TimelineEvent[] = [];

  private _startDateYYYYMMDD: string = '2020-07-01';
  private _endDateYYYYMMDD: string = dayjs().format('YYYY-MM-DD');

  public get startDateYYYYMMDD(): string { return this._startDateYYYYMMDD; }
  public get endDateYYYYMMDD(): string { return this._endDateYYYYMMDD; }


  private _signifianceValue: number = -1;
  private _timelineCategories: TimelineEventType[] = [];
  public get datasets$(): Observable<ChartDataset<"line", (number | ScatterDataPoint | null)[]>[]> { return this._datasets$.asObservable(); }
  public get chartLabels(): string[] { return this._chartLabels; }
  // public get datasetConfigs(): DatasetConfig[] { return this._datasetConfigs; }


  /**
   * This class gets constructed in AppComponent.
   * This class makes use of chart-data-item-builder.class.ts
   * 
   * @param priceEntries price entries provided by HistoricGMEDataService
   * @param timelineItems 
   * @param categories 
   * @param significanceValue 
   */
  constructor(priceEntries: GmePriceEntry[], timelineItems: TimelineEvent[], categories: TimelineEventType[], significanceValue: number) {
    this._allPriceEntries = priceEntries;
    this._timelineEvents = timelineItems;
    this._timelineCategories = categories;
    this._signifianceValue = significanceValue;
    // console.log("BUILDING DataSetManager", this._allPriceEntries, this._timelineEvents, this._timelineCategories, this._signifianceValue)
    this.getAndUpdateDatasets()
  }

  public updateSignificanceValue(value: number) {
    this._signifianceValue = value;
    this.getAndUpdateDatasets();
  }

  public updateCategories(categories: TimelineEventType[]) {
    this._timelineCategories = categories;
    this.getAndUpdateDatasets();
  }

  public updateDateRange(startDateYYYYMMDD: string, endDateYYYYMMDD: string) {
    this._startDateYYYYMMDD = startDateYYYYMMDD;
    this._endDateYYYYMMDD = endDateYYYYMMDD;
    this.getAndUpdateDatasets();
  }

  public updateDisplayedEvents(events: TimelineEvent[]) {
    this._timelineEvents = events;
    this._signifianceValue = 0;
    this._timelineCategories = [TimelineEventType.DRS,
    TimelineEventType.CORP,
    TimelineEventType.RC,
    TimelineEventType.MEDIA,
    TimelineEventType.SOCIAL_MEDIA,
    TimelineEventType.OTHER];
    this.getAndUpdateDatasets();
  }
  public clearSearchResults(significance: number, categories: TimelineEventType[], allEvents: TimelineEvent[]) {
    this._signifianceValue = significance;
    this._timelineCategories = categories;
    this._timelineEvents = Object.assign([], allEvents);
    this.getAndUpdateDatasets();
  }

  public getAndUpdateDatasets() {
    const chartData: {
      datasets: ChartDataset<"line", (number | ScatterDataPoint | null)[]>[],
      datasetConfigs:  DatasetConfig[],
      labels: string[],
    } = ChartDataItemBuilder.buildChartDataItems(
      this.startDateYYYYMMDD,
      this.endDateYYYYMMDD,
      this._allPriceEntries,
      this._timelineEvents,
      this._signifianceValue,
      this._timelineCategories);
    const datasets: ChartDataset<"line", (number | ScatterDataPoint | null)[]>[] = chartData.datasets;
    this._chartLabels = chartData.labels;
    this._datasetConfigs = chartData.datasetConfigs;
    this._datasets$.next(datasets);
  }

  public getTypeColor(type: TimelineEventType, transparency?: number): string {
    return ChartDataItemBuilder.getTypeColor(type, transparency);
  }

  public lookupIndexByTimelineItem(timelineItem: TimelineEvent): { datasetIndex: number, itemIndex: number } {
    const indexValue = {
      datasetIndex: -1, itemIndex: -1,
    }
    this._datasetConfigs.forEach(config => {
      const itemIndex = config.getIndexOfTimelineItem(timelineItem);
      if (itemIndex > -1) {
        indexValue.datasetIndex = this._datasetConfigs.indexOf(config) + 1;
        indexValue.itemIndex = itemIndex;
      }
    });
    return indexValue;
  }

  public lookupTimelineItemByIndex(datasetIndex: number, index: number) {
    const config = this._datasetConfigs[datasetIndex - 1];
    const timelineItem: TimelineEvent | null = config.timelineItems[index];
    if (timelineItem !== null) {
      if (timelineItem.gmePriceEntry) {
        const event = this._lookupEvent(timelineItem.gmePriceEntry.dateYYYYMMDD, config.itemType, config.significance);
        return event;
      }
    }
    return undefined;
  }

  public lookupDataset(datasetIndex: number) {
    const config = this._datasetConfigs[datasetIndex - 1];
    return config;
  }

  private _lookupEvent(dateYYYYMMDD: string, type: TimelineEventType, significance: number): TimelineEvent | undefined {
    const foundItem = this._timelineEvents.find(item => (item.dateYYYYMMDD === dateYYYYMMDD) && (item.types.indexOf(type) > -1) && item.significance === significance);
    return foundItem;
  }

}
