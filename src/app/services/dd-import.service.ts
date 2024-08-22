import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DdEntry } from './dd-entry.interface';

@Injectable({
  providedIn: 'root'
})
export class DdImportService {

  constructor(private _httpClient: HttpClient) { }


  private _fileName = 'assets/data/dd-library.csv';
  // public get priceEntriesAfterCutoff(): GmePriceEntry[] { return this._priceEntries.filter(item => item.date.format('YYYY-MM-DD') > '2020-07-01'); }

  public loadDDItems$(): Observable<DdEntry[]> {
    const subject$ = new Subject<DdEntry[]>();
    this._httpClient.get(this._fileName, { responseType: 'text' },).subscribe(
      (data) => {
        const returnValue = this._parseCSV(data);

        subject$.next(returnValue);
        subject$.complete();
      },
      (error) => {
        console.log("error:", error)
      },
      () => {
        subject$.complete();
      }
    );
    return subject$.asObservable();
  }


  /** Convert CSV table into an array of objects */
  private _parseCSV(data: any) {
    // console.log(data);
    const rows = data.split('\n');
    const headers = rows[0].split(';');
    const rowCount = rows.length - 1;
    const ddEntries: DdEntry[] = [];
    /**
     * Since there are commas , in the title field of the .csv document,
     * we cannot use commas , as a delimiter, so we must use some other character.
     * 
     * in this case we are using the following curly brace character:  }
     */
    const delimiterChar: string = '}';
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
      const ddEntry: DdEntry = {
        link: cells[0],
        date: cells[1],
        author: cells[2],
        title: cells[3],
        ipfslink: cells[4],
        archive_is_link: cells[5],
        wayback_machine: cells[6],
      }
      ddEntries.push(ddEntry);
    }
    return ddEntries;
    // this._priceEntries = entries;
  }




}
