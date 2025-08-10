import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, forkJoin, lastValueFrom, map, of } from 'rxjs';
import { GmePriceEntry } from './gme-price-entry.interface';
import dayjs from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class ImportGmeDataService {

  constructor(private _httpClient: HttpClient) { }
  private _priceEntriesFilled: GmePriceEntry[] = [];
  private _tradingDayPriceEntries: GmePriceEntry[] = [];
  public get allPriceEntries(): GmePriceEntry[] { return this._priceEntriesFilled; }
  public get tradingDayPriceEntries(): GmePriceEntry[] { return this._tradingDayPriceEntries; }

  public get lastClosePrice(): number {
    if (this.allPriceEntries.length > 0) {
      return this.allPriceEntries[this.allPriceEntries.length - 1].close;
    } else {
      return -1;
    }
  }

  public setGmePriceEntries(entries: GmePriceEntry[]) { this._priceEntriesFilled = entries; }



  public async loadGMEPriceEntries$() {

    const start = dayjs();
    const csvEntriesCurrent = await this._loadGMECSVdataCurrentEra$()
    // const csvEntriesHistoric = await this._loadGMECSVdataHistoricEra$()
    // const sheetEntries = await lastValueFrom(this._loadGoogleSheetData$());
    const allEntries = this._mergeEntries(csvEntriesCurrent, []);
    this.setGmePriceEntries(allEntries);
    // return allEntries;
    const end = dayjs();
    // console.log(end.diff(start), " total diff")
    return allEntries;
  }


  //   /**
  //    * Data source:  https://www.nasdaq.com/market-activity/stocks/gme/historical
  //    */



  /**
   * Most of the GME historic trading data is stored in the assets/data/gme-data-post-2020.csv file
   */
  private async _loadGMECSVdataCurrentEra$() {
    const subject$ = new Subject<GmePriceEntry[]>();
    const gmeDatafileName = 'assets/data/gme-data.csv';

    return await lastValueFrom(this._httpClient.get(gmeDatafileName, { responseType: 'text' },)
      .pipe(
        map(data => this._parseCSV(data)),
        // catchError(error => of([]))
      ))
  }


  /** Convert CSV table into an array of objects */
  private _parseCSV(data: any): GmePriceEntry[] {
    // console.log(data);
    const rows = data.split('\n');
    const headers = rows[0].split(';');
    const rowCount = rows.length - 1;
    const priceEntries: GmePriceEntry[] = [];
    const delimiterChar: string = ',';
    for (let rowIndex = 1; rowIndex < rowCount; rowIndex++) {

      const splitRow: string[] = rows[rowIndex].split(delimiterChar);
      const cells: string[] = [];
      splitRow.forEach(cell => {
        cell = cell.trim();
        cell = cell.replaceAll("\n", "");
        let newCell: string = "";
        for (let charIndex = 0; charIndex < cell.length; charIndex++) {
          const charValue = cell[charIndex];
          if (charValue !== "\"") {
            newCell += charValue;
          }
        }
        cells.push(newCell);
      });
      const priceEntry: GmePriceEntry = {
        dateYYYYMMDD: this._convertToDate(cells[0]),
        close: this._convertToNumber(cells[1]),
        volume: Number(cells[2]),
        open: this._convertToNumber(cells[3]),
        high: this._convertToNumber(cells[4]),
        low: this._convertToNumber(cells[5]),
        tso: Number(cells[6]),
        trailingSales: Number(cells[7]),
        equity: Number(cells[8]),
        trailingEarnings: Number(cells[9]),
        ftds: Number(cells[10]),
      }
      priceEntries.push(priceEntry);
    }
    return priceEntries;
  }


  private _mergeEntries(csvEntries: GmePriceEntry[], sheetEntries: GmePriceEntry[]): GmePriceEntry[] {
    const allEntries: GmePriceEntry[] = Object.assign([], csvEntries);
    sheetEntries.forEach(sheetEntry => {
      const csvDates = allEntries.map(item => item.dateYYYYMMDD);
      if (!csvDates.includes(sheetEntry.dateYYYYMMDD)) {
        allEntries.push(sheetEntry);
      }
    });

    const sortedEntries = this._sortData(allEntries);
    this._priceEntriesFilled = this._fillGaps(sortedEntries, false);
    this._tradingDayPriceEntries = this._fillGaps(sortedEntries, true);

    return this._priceEntriesFilled;
  }

  /** The data comes in with date descending, needs to be reverse to ascending */
  private _sortData(priceEntries: GmePriceEntry[]): GmePriceEntry[] {
    priceEntries = priceEntries.sort((item1, item2) => {
      if (item1.dateYYYYMMDD > item2.dateYYYYMMDD) {
        return 1;
      } else if (item1.dateYYYYMMDD < item2.dateYYYYMMDD) {
        return -1;
      } else {
        return 0;
      }
    });
    return priceEntries;
  }

  /** Not every day has a trading price (e.g. Saturdays, Sundays, holidays) 
   *  so an entry needs to be created for those dates in order to maintain 1 entry per date */
  /**
   * 
   * @param isForTradingDays 
   */
  private _fillGaps(priceEntries: GmePriceEntry[], isForTradingDays: boolean): GmePriceEntry[] {
    const startDate: dayjs.Dayjs = dayjs(priceEntries[0].dateYYYYMMDD);
    const endDate: dayjs.Dayjs = dayjs(priceEntries[priceEntries.length - 1].dateYYYYMMDD);
    const newEntries: GmePriceEntry[] = [];
    let currentDateYYYYMMDD: string = dayjs(startDate).format('YYYY-MM-DD');
    let currentIndex: number = 0;
    while (currentDateYYYYMMDD < endDate.format('YYYY-MM-DD')) {
      const hasEntry = priceEntries[currentIndex].dateYYYYMMDD === currentDateYYYYMMDD;
      if (hasEntry) {
        newEntries.push(priceEntries[currentIndex]);
        currentIndex++;
      } else {
        const prevEntry = priceEntries[currentIndex - 1];
        let volume = prevEntry.volume;
        let prevClose = prevEntry.close;
        let open = prevEntry.open;
        let high = prevEntry.high;
        let low = prevEntry.low;
        let ftds = prevEntry.ftds;
        if (isForTradingDays) {
          // in this case, we are adding a new entry for a date where there is no entry, e.g. a weekend.
          // in this case, there is no trading volume, no ftds, etc.
          volume = 0;
          ftds = 0;
          open = prevClose;
          high = prevClose;
          low = prevClose;
        }
        newEntries.push({
          dateYYYYMMDD: currentDateYYYYMMDD,
          close: prevClose,
          volume: volume,
          open: open,
          high: high,
          low: low,
          tso: prevEntry.tso,
          trailingSales: prevEntry.trailingSales,
          equity: prevEntry.equity,
          trailingEarnings: prevEntry.trailingEarnings,
          ftds: ftds,
        });
      }
      currentDateYYYYMMDD = dayjs(currentDateYYYYMMDD).add(1, 'days').format('YYYY-MM-DD');
    }
    newEntries.push(priceEntries[priceEntries.length - 1]);
    return Object.assign([], newEntries);
  }

  private _convertToNumber(value: string): number {
    const num = Number(value.substring(1));
    return num;
  }

  /** date comes in formatted as as MM/DD/YYYY */
  private _convertToDate(value: string): string {
    const month = value.substring(0, 2);
    const day = value.substring(3, 5);
    const year = value.substring(6, 10);
    const dateYYYYMMDD: string = String(year) + '-' + String(month) + '-' + String(day);
    const date: dayjs.Dayjs = dayjs(dateYYYYMMDD);
    return dateYYYYMMDD;
  }

}
