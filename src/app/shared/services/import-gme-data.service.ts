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
  private _priceEntries: GmePriceEntry[] = [];
  public get allPriceEntries(): GmePriceEntry[] { return this._priceEntries; }

  public get lastClosePrice(): number {
    if (this.allPriceEntries.length > 0) {
      return this.allPriceEntries[this.allPriceEntries.length - 1].close;
    } else {
      return -1;
    }
  }

  public setGmePriceEntries(entries: GmePriceEntry[]) { this._priceEntries = entries; }



  public async loadGMEPriceEntries$() {
    const csvEntries = await this._loadGMECSVdata$()
    const sheetEntries = await lastValueFrom(this._loadGoogleSheetData$());
    const allEntries = this._mergeEntries(csvEntries, sheetEntries);
    this.setGmePriceEntries(allEntries);
    return allEntries;
  }


  /**
   * Most of the GME historic trading data is stored in the assets/data/gme-data-post-2020.csv file
   */
  private async _loadGMECSVdata$() {
    const subject$ = new Subject<GmePriceEntry[]>();
    const gmeDatafileName = 'assets/data/gme-data-post-2020.csv';

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
    /**
     * Since there are commas , in the title field of the .csv document,
     * we cannot use commas , as a delimiter, so we must use some other character.
     * 
     * in this case we are using the following curly brace character:  }
     */
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
        volume: this._convertToNumber(cells[2]),
        open: this._convertToNumber(cells[3]),
        high: this._convertToNumber(cells[4]),
        low: this._convertToNumber(cells[5]),
      }
      priceEntries.push(priceEntry);
    }
    return priceEntries;
  }


  private _loadGoogleSheetData$() {
    const gmeSubject$ = new Subject<GmePriceEntry[]>();
    /**
     *  Google Sheet needs to be publish as tsv (tab-separated values) and not csv.
     *  TSV output is far more simple to parse. 
     *  
     */
    /**
     * Data source:  https://www.nasdaq.com/market-activity/stocks/gme/historical
     */
    const gmeDataOverviewTsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQixUOsD8VuEXI06nXbOqMGsDbQiofVAYlbL9_-fh6xo21SSt84x2e0iqDBqWmj_e--CXKpKtiPbjOq/pub?gid=1551713069&single=true&output=tsv';
    const priceEntries: GmePriceEntry[] = [];
    this._httpClient.get(gmeDataOverviewTsvUrl, { responseType: 'text' }).subscribe({
      next: (response) => {
        let lines = response.split('\n');
        lines = lines.slice(1);
        lines.forEach(line => {
          let tabSplitLine = line.split('\t');
          const priceEntry: GmePriceEntry = {
            dateYYYYMMDD: this._convertToDate(tabSplitLine[0]),
            close: this._convertToNumber(tabSplitLine[1]),
            volume: this._convertToNumber(tabSplitLine[2]),
            open: this._convertToNumber(tabSplitLine[3]),
            high: this._convertToNumber(tabSplitLine[4]),
            low: this._convertToNumber(tabSplitLine[5]),
          }
          priceEntries.push(priceEntry);
        });
        // this._priceEntries = priceEntries;
        // this._sortData();
        // this._fillGaps();
        gmeSubject$.next(priceEntries);
        gmeSubject$.complete();
      },
    })
    return gmeSubject$.asObservable();
  }

  // public loadGmeData$(): Observable<GmePriceEntry[]> {
  // const subject$ = new BehaviorSubject<GmePriceEntry[]>([]);
  // const csvEntries = this._loadCSVdata$()
  // return this._loadCSVdata$();
  // const sheetEntries = await lastValueFrom(this._loadGoogleSheetData$());
  // const allEntries = this._mergeEntries(csvEntries, sheetEntries);


  // forkJoin([this._loadCSVdata$(), this._loadGoogleSheetData$()]).subscribe({
  //   next: (bothArrays) => {
  //     const mergedValue = this._mergeEntries(bothArrays[0], bothArrays[1]);
  //     subject$.next(mergedValue);
  //   },
  //   error: () => { },
  //   complete: () => { subject$.complete(); },
  // })
  // return subject$.asObservable();
  // }

  private _mergeEntries(csvEntries: GmePriceEntry[], sheetEntries: GmePriceEntry[]): GmePriceEntry[] {
    const allEntries: GmePriceEntry[] = Object.assign([], csvEntries);
    sheetEntries.forEach(sheetEntry => {
      const csvDates = allEntries.map(item => item.dateYYYYMMDD);
      if (!csvDates.includes(sheetEntry.dateYYYYMMDD)) {
        allEntries.push(sheetEntry);
      }
    });
    this._priceEntries = allEntries;
    this._sortData();
    this._fillGaps();
    return this._priceEntries;
  }

  /** The data comes in with date descending, needs to be reverse to ascending */
  private _sortData() {
    this._priceEntries = this._priceEntries.sort((item1, item2) => {
      if (item1.dateYYYYMMDD > item2.dateYYYYMMDD) {
        return 1;
      } else if (item1.dateYYYYMMDD < item2.dateYYYYMMDD) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  /** Not every day has a trading price (e.g. Saturdays, Sundays, holidays) 
   *  so an entry needs to be created for those dates in order to maintain 1 entry per date */
  private _fillGaps() {
    const startDate: dayjs.Dayjs = dayjs(this._priceEntries[0].dateYYYYMMDD);
    const endDate: dayjs.Dayjs = dayjs(this._priceEntries[this._priceEntries.length - 1].dateYYYYMMDD);
    const newEntries: GmePriceEntry[] = [];
    let currentDateYYYYMMDD: string = dayjs(startDate).format('YYYY-MM-DD');
    let currentIndex: number = 0;
    while (currentDateYYYYMMDD < endDate.format('YYYY-MM-DD')) {
      const hasEntry = this._priceEntries[currentIndex].dateYYYYMMDD === currentDateYYYYMMDD;
      if (hasEntry) {
        newEntries.push(this._priceEntries[currentIndex]);
        currentIndex++;
      } else {
        const prevEntry = this._priceEntries[currentIndex - 1]
        newEntries.push({
          dateYYYYMMDD: currentDateYYYYMMDD,
          close: prevEntry.close,
          volume: prevEntry.volume,
          open: prevEntry.open,
          high: prevEntry.high,
          low: prevEntry.low,
        });
      }
      currentDateYYYYMMDD = dayjs(currentDateYYYYMMDD).add(1, 'days').format('YYYY-MM-DD');
    }
    newEntries.push(this._priceEntries[this._priceEntries.length - 1]);
    this._priceEntries = newEntries;
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
