import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import { ImportGmeDataService } from './import-gme-data.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { SettingsService } from './settings.service';
import { GmePriceEntry } from './gme-price-entry.interface';
import { EarningsResult } from './earnings-results/earnings-result.class';
import { TimelineEvent } from '../../main-pages/timeline/timeline-items/timeline-item/timeline-event.class';
import { ChartDataManagerService } from '../../main-pages/timeline/timeline-chart/timeline-chart-data-manager-service';
import { TimelineItemsService } from '../../main-pages/timeline/timeline-items/timeline-items.service';
import { TimelineEventConfig } from '../../main-pages/timeline/timeline-items/timeline-item/timeline-event-config.interface';
import { Import10KDataService } from './earnings-results/import-10k-data.service';
import { ImportEventsService } from './import-events.service';
import { TimelineItemsBuilder } from '../../main-pages/timeline/timeline-items/timeline-items-builder.class';
import { ChartDataSetManager } from '../../main-pages/timeline/timeline-chart/timeline-chart-dataset-manager.class';
import { TimelineControlsService } from '../../main-pages/timeline/timeline-controls/timeline-controls.service';
import { ScreenService } from './screen-size.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    private _dataManagerService: ChartDataManagerService,
    private _gmeDataService: ImportGmeDataService,
    private _timelineItemsService: TimelineItemsService,
    private _settingsService: SettingsService,
    private _import10KService: Import10KDataService,
    private _importEventsService: ImportEventsService,
    private _timelineControlsService: TimelineControlsService,
    private _screenService: ScreenService
  ) {
  }


  private _allEventConfigs: TimelineEventConfig[] = [];
  private _priceEntries: GmePriceEntry[] = [];
  private _quarterlyResults: EarningsResult[] = [];

  private _dataIsLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private _loadingMessage: string = '';
  public get dataIsLoading(): boolean { return this._dataIsLoading$.getValue(); }
  public get dataIsLoading$(): Observable<boolean> { return this._dataIsLoading$.asObservable(); }
  public get loadingMessage(): string { return this._loadingMessage; }
  public set loadingMessage(loadingMessage: string) { this._loadingMessage = loadingMessage; }

  private _allDataImported: boolean = false;

  public async loadData$() {
    this._dataIsLoading$.next(true);
    if (this._allDataImported === false) {
      await this._importData$();
      await this._updateChartData$();
      this._allDataImported = true;
    }
    this._dataIsLoading$.next(false);
  }

  private async _importData$() {
    this._dataIsLoading$.next(true);
    this._loadingMessage = 'Loading stuff...';

    this._loadingMessage = 'Loading GME price data...';
    await this._loadGmeData();
    this._loadingMessage = 'Loading events data...';
    await this._loadEvents();
  }

  private async _loadEvents() {
    let needsUpdate: boolean = true;
    const today = dayjs().format('YYYY-MM-DD');
    if (this._settingsService.eventConfigs.length > 0) {
      const today = dayjs().format('YYYY-MM-DD');
      if (this._settingsService.eventConfigs[0].dateYYYYMMDD === today) {
        needsUpdate = false;
      }
    }
    const lastEventsCheckedDate = this._settingsService.lastEventsCheckedDateYYYYMMDD;
    if (lastEventsCheckedDate !== null) {
      if (lastEventsCheckedDate === today) {
        needsUpdate = false;
      }
    }
    this._allEventConfigs = await this._importEventsService.importEventsFromCSV$();
    if (needsUpdate) {
      // this._allEventConfigs = await this._importEventsService.importEventsFromCSV$();
      this._settingsService.setLastEventsCheckedDate();
      this._settingsService.setEventsData(this._allEventConfigs);
    } else {
      // this._allEventConfigs = this._settingsService.eventConfigs
    }
  }

  private async _loadGmeData() {
    this._priceEntries = await this._gmeDataService.loadGMEPriceEntries$();
    this._settingsService.setGmeData(this._priceEntries);
  }


  public async loadEarnings() {
    let quarterlyResults: EarningsResult[] = this._import10KService.load10QData();
    let annualResults: EarningsResult[] = this._import10KService.load10KData();
    this._settingsService.setEarningsData(annualResults, quarterlyResults);
    this._import10KService.setQuarterlyResults(quarterlyResults);
    this._import10KService.setAnnualResults(annualResults);
    this._quarterlyResults = quarterlyResults
  }

  private async _updateChartData$() {
    this._loadingMessage = 'Building chart...';
    const timelineItems: TimelineEvent[] = TimelineItemsBuilder.getTimelineItems(this._allEventConfigs, this._priceEntries);
    this._timelineItemsService.setAllTimelineEvents(timelineItems);
    this._timelineItemsService.updateSignificanceValue(this._settingsService.significanceValue);
    this._timelineItemsService.updateCategories(this._settingsService.categories);
    const priceEntries = this._gmeDataService.allPriceEntries;

    const dataManager: ChartDataSetManager = new ChartDataSetManager(
      this._timelineControlsService.startDateYYYYMMDD,
      this._timelineControlsService.endDateYYYYMMDD,
      priceEntries,
      this._timelineItemsService.allTimelineItems, 
      this._settingsService.categories, 
      this._settingsService.significanceValue, 
      this._settingsService.getDarkMode(),
      this._screenService.isMobile,
    );
    this._dataManagerService.setDataManager(dataManager);
    this._timelineItemsService.setQuarterlyFinancialResults(this._quarterlyResults);
    this._loadingMessage = '';

  }
}
