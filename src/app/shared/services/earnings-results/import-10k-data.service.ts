import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EarningsResult } from './earnings-result.class';
import { EarningsResultInterface } from './earnings-result.interface';
import { filings_10k_raw } from './10k_filings';
import { filings_10q_raw } from './10q_filings';

@Injectable({
  providedIn: 'root'
})
export class Import10KDataService {

  constructor(private _httpClient: HttpClient) { }

  private _quarterlyResults: EarningsResult[] = [];
  private _annualResults: EarningsResult[] = [];

  public get quarterlyResults(): EarningsResult[] { return this._quarterlyResults; }
  public get annualResults(): EarningsResult[] { return this._annualResults; }

  public setQuarterlyResults(results: EarningsResult[]) { this._quarterlyResults = results; }
  public setAnnualResults(results: EarningsResult[]) { this._annualResults = results; }

  public load10KData(): EarningsResult[] {
    const raw10k = filings_10k_raw;
    const results: EarningsResultInterface[] = raw10k.map(raw => {
      return {
        fiscalYear: raw.fiscalYear,
        filingDateYYYYMMDD: raw.filingDate,
        reportDateYYYYMMDD: raw.reportDate,
        revenue: raw.revenue,
        costOfSales: raw.costOfSales,
        grossProfit: raw.grossProfit,
        sga: raw.sga,
        operatingIncome: raw.operatingIncome,
        interestIncome: raw.interestIncome,
        ebit: raw.ebit,
        netEarnings: raw.netEarnings,
        netEPS: raw.netEPS,
        weightedAverageSharesOutstanding: raw.weightedAvgSharesOutstanding,
        totalAssets: raw.totalAssets,
        totalDebt: raw.totalDebt,
        totalLiabilities: raw.totalLiabilities,
        stockholdersEquity: raw.stockholdersEquity,
        drs: raw.drs,
        url: raw.url,
        reportingPeriod: 'FY'
      }
    });
    const annualResults = results.map(resultInterface => new EarningsResult(resultInterface));
    this._annualResults = annualResults;
    return annualResults;
  }

  public load10QData(): EarningsResult[] {
    const raw10q = filings_10q_raw;
    const results: EarningsResultInterface[] = raw10q.map(raw => {
      return {
        fiscalYear: raw.fiscalYear,
        filingDateYYYYMMDD: raw.filingDate,
        reportDateYYYYMMDD: raw.reportDate,
        revenue: raw.revenue,
        costOfSales: raw.costOfSales,
        grossProfit: raw.grossProfit,
        sga: raw.sga,
        operatingIncome: raw.operatingIncome,
        interestIncome: raw.interestIncome,
        ebit: raw.ebit,
        netEarnings: raw.netEarnings,
        netEPS: raw.netEPS,
        weightedAverageSharesOutstanding: raw.weightedAvgSharesOutstanding,
        totalAssets: raw.totalAssets,
        totalDebt: raw.totalDebt,
        totalLiabilities: raw.totalLiabilities,
        stockholdersEquity: raw.stockholdersEquity,
        drs: raw.drs,
        url: raw.url,
        reportingPeriod: this._getReportingPeriod(raw.quarter),
      }
    });
    const quarterlyResults = results.map(resultInterface => new EarningsResult(resultInterface));
    this._quarterlyResults = quarterlyResults;
    return quarterlyResults;
  }



  // public async load10QData$() {
  //   return this._loadData('10Q');
  // }
  // private async _loadData(fileType: '10K' | '10Q') {
  //   let filePath = 'assets/data/10k_filings-2024-06-11.csv';
  //   if (fileType === '10Q') {
  //     filePath = 'assets/data/10q_filings-2024-09-10.csv';
  //   }
  //   return await lastValueFrom(this._httpClient.get(filePath, { responseType: 'text' },).pipe(
  //     map(data => this._parseCSV(data, fileType)),
  //   )
  //   );
  // }


  // /** Convert CSV table into an array of objects */
  // private _parseCSV(data: any, fileType: '10K' | '10Q') {
  //   // console.log(data);
  //   const rows = data.split('\n');
  //   const headers = rows[0].split(';');
  //   const rowCount = rows.length - 1;
  //   const results: EarningsResult[] = [];


  //   const delimiterChar: string = ',';
  //   for (let rowIndex = 1; rowIndex < rowCount; rowIndex++) {

  //     const splitRow: string[] = rows[rowIndex].split(delimiterChar);
  //     const rowCells: string[] = [];
  //     splitRow.forEach(cell => {
  //       cell = cell.trim();
  //       cell = cell.replaceAll("\n", "");
  //       let newCell: string = "";
  //       for (let charIndex = 0; charIndex < cell.length; charIndex++) {
  //         const charValue = cell[charIndex];
  //         if (charValue !== "\"") {
  //           newCell += charValue;
  //         }
  //       }
  //       rowCells.push(newCell);
  //     });

  //     let reportingPeriod: 'FY' | 'Q1' | 'Q2' | 'Q3' | 'Q4' = 'FY';
  //     if (fileType === '10Q') {
  //       reportingPeriod = this._getReportingPeriod(rowCells[1]);
  //     }

  //     const FyEarningsResult: EarningsResultInterface = {
  //       fiscalYear: Number(rowCells[0]),
  //       //quarter column
  //       filingDateYYYYMMDD: rowCells[2],
  //       reportDateYYYYMMDD: rowCells[3],
  //       revenue: Number(rowCells[4]),
  //       costOfSales: Number(rowCells[5]),
  //       grossProfit: Number(rowCells[6]),
  //       sga: Number(rowCells[7]),
  //       depreciationAmortization: Number(rowCells[8]),
  //       amortizationGoodWill: Number(rowCells[9]),
  //       goodwillImpairments: Number(rowCells[10]),
  //       assetImpairments: Number(rowCells[11]),
  //       gainOnSale: Number(rowCells[12]),
  //       mergerExpenses: Number(rowCells[13]),
  //       operatingIncome: Number(rowCells[14]),
  //       otherLoss: Number(rowCells[15]),
  //       interestIncome: Number(rowCells[16]),
  //       debtExtinguishment: Number(rowCells[17]),
  //       mergerInterestExpense: Number(rowCells[18]),
  //       ebit: Number(rowCells[19]),
  //       incomeTaxExpense: Number(rowCells[20]),
  //       netEarnings: Number(rowCells[21]),
  //       netEPS: Number(rowCells[22]),
  //       weightedAverageSharesOutstanding: Number(rowCells[23]),
  //       totalAssets: Number(rowCells[24]),
  //       totalDebt: Number(rowCells[25]),
  //       totalLiabilities: Number(rowCells[26]),
  //       stockholdersEquity: Number(rowCells[27]),
  //       drs: Number(rowCells[28]),
  //       url: rowCells[29],
  //       reportingPeriod: reportingPeriod,
  //     }
  //     const fYResult: EarningsResult = new EarningsResult(FyEarningsResult);
  //     results.push(fYResult);
  //   }
  //   return results;
  //   // this._priceEntries = entries;
  // }

  // public loadQuarterlyResults$(): Observable<EarningsResult[]> {
  //   const subject$ = new Subject<EarningsResult[]>();
  //   const earningsDataGoogleSheetTsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT7n4mmCwtjREaCkJVUkHe_ujHBod7vGtEB5iI_kbYToT5dU9cQSq-d3XO2PuFEZ64GCuU70jVayE0R/pub?gid=452534316&single=true&output=tsv';

  //   /**
  //    * This variable indexLimitForFiscalYears is based on the data in the Google spreadsheet.
  //    * 
  //    * row 1 is the header / label row, so it is skipped (sliced actually, so it is removed entirely)
  //    * rows 2 to 24 (row index 0 to 22) contain all the FISCAL YEAR data.
  //    * rows 25 to 48 (row index 23 to 46) contain all the QUARTERLY data.
  //   */
  //   const indexLimitForFiscalYears = 48;

  //   this._httpClient.get(earningsDataGoogleSheetTsvUrl, { responseType: 'text' }).subscribe({
  //     next: (response) => {
  //       const results: EarningsResult[] = [];
  //       let lines = response.split('\n');
  //       lines = lines.slice(24);  // remove the first 24 rows;
  //       lines.forEach(line => {
  //         const index = lines.indexOf(line);
  //         if (index <= indexLimitForFiscalYears) {
  //           let tabSplitLine = line.split('\t');
  //           const earningsResult: EarningsResultInterface = {
  //             fiscalYear: Number(tabSplitLine[0]),
  //             //quarter column
  //             filingDateYYYYMMDD: tabSplitLine[2],
  //             reportDateYYYYMMDD: tabSplitLine[3],
  //             revenue: Number(tabSplitLine[4]),
  //             costOfSales: Number(tabSplitLine[5]),
  //             grossProfit: Number(tabSplitLine[6]),
  //             sga: Number(tabSplitLine[7]),
  //             depreciationAmortization: Number(tabSplitLine[8]),
  //             amortizationGoodWill: Number(tabSplitLine[9]),
  //             goodwillImpairments: Number(tabSplitLine[10]),
  //             assetImpairments: Number(tabSplitLine[11]),
  //             gainOnSale: Number(tabSplitLine[12]),
  //             mergerExpenses: Number(tabSplitLine[13]),
  //             operatingIncome: Number(tabSplitLine[14]),
  //             otherLoss: Number(tabSplitLine[15]),
  //             interestIncome: Number(tabSplitLine[16]),
  //             debtExtinguishment: Number(tabSplitLine[17]),
  //             mergerInterestExpense: Number(tabSplitLine[18]),
  //             ebit: Number(tabSplitLine[19]),
  //             incomeTaxExpense: Number(tabSplitLine[20]),
  //             netEarnings: Number(tabSplitLine[21]),
  //             netEPS: Number(tabSplitLine[22]),
  //             weightedAverageSharesOutstanding: Number(tabSplitLine[23]),
  //             totalAssets: Number(tabSplitLine[24]),
  //             totalDebt: Number(tabSplitLine[25]),
  //             totalLiabilities: Number(tabSplitLine[26]),
  //             stockholdersEquity: Number(tabSplitLine[27]),
  //             drs: Number(tabSplitLine[28]),
  //             url: tabSplitLine[29],
  //             reportingPeriod: this._getReportingPeriod(tabSplitLine[1]),
  //           }
  //           const quarterlyResult: EarningsResult = new EarningsResult(earningsResult);
  //           results.push(quarterlyResult);
  //         }
  //       });
  //       this._quarterlyResults = results;
  //       subject$.next(this._quarterlyResults);
  //       subject$.complete();
  //     },
  //   });
  //   return subject$.asObservable();
  // }

  private _getReportingPeriod(cellValue: string): 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'FY' {
    if (cellValue === 'Q4') {
      return 'Q4';
    } else if (cellValue === 'Q3') {
      return 'Q3';
    } else if (cellValue === 'Q2') {
      return 'Q2';
    } else if (cellValue === 'Q1') {
      return 'Q1';
    } else if (cellValue === 'FY') {
      return 'FY';
    }
    return 'FY';
  }

}
