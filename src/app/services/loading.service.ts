import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import { ImportGmeDataService } from './import-gme-data.service';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { SettingsService } from './settings.service';
import { GmePriceEntry } from './gme-price-entry.interface';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    // private _dataManagerService: ChartDataManagerService,
    private _gmeDataService: ImportGmeDataService,
    // private _timelineItemsService: TimelineItemsService,
    private _settingsService: SettingsService,
    // private _ddService: DdImportService,
    // private _import10KService: Import10KDataService,
    // private _importEventsService: ImportEventsService,
    // private _searchService: EventSearchService,
    // private _calendarService: CalendarService
  ) { }


  // private _ddEntries: DdEntry[] = [];
  // private _allEventConfigs: TimelineEventConfig[] = [];
  private _priceEntries: GmePriceEntry[] = [];
  // private _quarterlyResults: EarningsResult[] = [];

  private _dataIsLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _loadingMessage: string = '';
  public get dataIsLoading(): boolean { return this._dataIsLoading$.getValue(); }
  public get dataIsLoading$(): Observable<boolean> { return this._dataIsLoading$.asObservable(); }
  public get loadingMessage(): string { return this._loadingMessage; }

  public set loadingMessage(loadingMessage: string) { this._loadingMessage = loadingMessage; }
  public beginLoading() { this._dataIsLoading$.next(true); }

  private _allDataImported: boolean = false;

  public async loadData$() {
    if (this._allDataImported === false) {
      await this._importData$();
      await this._updateChartData$();
    }
    this._dataIsLoading$.next(false);
  }

  private async _importData$() {
    this._dataIsLoading$.next(true);
    this._loadingMessage = 'Loading stuff...';
    // this._ddEntries = await lastValueFrom(this._ddService.loadDDItems$());
    this._loadingMessage = 'Loading earnings data...';
    await this._loadEarnings();
    this._loadingMessage = 'Loading GME price data...';
    await this._loadGmeData();
    this._loadingMessage = 'Loading events data...';
    await this._loadEvents();
  }

  private async _loadEvents() {
    // let needsUpdate: boolean = true;
    // const today = dayjs().format('YYYY-MM-DD');
    // if (this._settingsService.eventConfigs.length > 0) {
    //   const today = dayjs().format('YYYY-MM-DD');
    //   if (this._settingsService.eventConfigs[0].dateYYYYMMDD === today) {
    //     needsUpdate = false;
    //   }
    // }
    // const lastEventsCheckedDate = this._settingsService.lastEventsCheckedDateYYYYMMDD;
    // if (lastEventsCheckedDate !== null) {
    //   if (lastEventsCheckedDate === today) {
    //     needsUpdate = false;
    //   }
    // }
    // if (needsUpdate) {
    //   // this._allEventConfigs = await lastValueFrom(this._importEventsService.importEventsFromGoogleSheet$());
    //   // this._settingsService.setLastEventsCheckedDate();
    //   // this._settingsService.setEventsData(this._allEventConfigs);
    // } else {
    //   // console.log("dooes not need update")
    //   // this._allEventConfigs = this._settingsService.eventConfigs
    // }
  }

  private async _loadGmeData() {
    // let needsUpdate: boolean = this._needsGMEUpdate();
    // if(needsUpdate){
    //   this._priceEntries = await lastValueFrom(this._gmeDataService.loadGmeData$());
    //   this._settingsService.setGmeData(this._priceEntries);
    //   this._settingsService.setLastEventsCheckedDate();
    // }else{
    //   this._priceEntries = this._settingsService.gmeData;
    //   this._gmeDataService.setGmePriceEntries(this._priceEntries);
    // }
  }



  /*
    2024-06-18
    Earnings are now loaded via local .csv file again and not a Google Sheet document
    reason:  loading from Google sheet took a long time to load earnings.
    Earnings only changes 4 times a year so it can be done locally at those times 
    without checking for and loading from Google sheets which takes too long
  */
  private async _loadEarnings() {

    // let quarterlyResults: EarningsResult[] = [];
    // let annualResults: EarningsResult[] = [];
    // annualResults = await lastValueFrom(this._import10KService.load10KData$());
    // quarterlyResults = await lastValueFrom(this._import10KService.load10QData$());
    // this._settingsService.setEarningsData(annualResults, quarterlyResults);
    // this._import10KService.setQuarterlyResults(quarterlyResults);
    // this._import10KService.setAnnualResults(annualResults);
    // this._quarterlyResults = quarterlyResults
  }


  private async _updateChartData$() {
    // this._loadingMessage = 'Building chart...';
    // await lastValueFrom(timer(10));
    // const timelineItems: TimelineEvent[] = TimelineItemsBuilder.getTimelineItems(this._allEventConfigs, this._priceEntries);
    // this._timelineItemsService.setAllTimelineEvents(timelineItems);
    // this._searchService.setTimelineItems(timelineItems, this._ddEntries);
    // this._timelineItemsService.updateSignificanceValue(this._settingsService.significanceValue);
    // this._timelineItemsService.updateCategories(this._settingsService.categories);
    // const dataManager: ChartDataSetManager = new ChartDataSetManager(this._gmeDataService.allPriceEntries, this._timelineItemsService.allTimelineItems, this._settingsService.categories, this._settingsService.significanceValue);
    // this._dataManagerService.setDataManager(dataManager);
    // this._timelineItemsService.setQuarterlyFinancialResults(this._quarterlyResults);
    // this._loadingMessage = '';
    // this._allDataImported = true;
  }

  /**
 * if now is after (previousCheckTime + 24 hours), 
 *    then check for updates.
 * else, 
 *    use what is saved in local storage.
 */
  private _needsGMEUpdate(): boolean {
    // let needsUpdate: boolean = true;
    // const now = dayjs();
    // const timeLapsed: boolean = this._settingsService.gmeCheckTimeLapsed(now);
    // if (timeLapsed === false) {
    //   needsUpdate = false
    // }
    // const todayIsSaturday: boolean = dayjs().day() === 6;
    // const todayIsSunday: boolean = dayjs().day() === 0;
    // if (todayIsSaturday || todayIsSunday) {
    //   needsUpdate = false;
    // }
    // return needsUpdate;
    return false;
  }
}
