
import { Injectable } from '@angular/core';
import { EarningsResult } from './earnings-result.class';
import { EarningsResultInterface } from './earnings-result.interface';
import { filings_10k_raw } from './10k_filings';
import { filings_10q_raw } from './10q_filings';

@Injectable({
  providedIn: 'root'
})
export class Import10KDataService {

  constructor() { }

  private _quarterlyResults: EarningsResult[] = [];
  private _annualResults: EarningsResult[] = [];

  public get quarterlyResults(): EarningsResult[] { return this._quarterlyResults; }
  public get annualResults(): EarningsResult[] { return this._annualResults; }

  public setQuarterlyResults(results: EarningsResult[]) { this._quarterlyResults = results; }
  public setAnnualResults(results: EarningsResult[]) { this._annualResults = results; }

  public load10KData(): EarningsResult[] {
    const results: EarningsResultInterface[] = filings_10k_raw;
    const annualResults = results.map(resultInterface => new EarningsResult(resultInterface));
    this._annualResults = annualResults;
    return annualResults;
  }

  public load10QData(): EarningsResult[] {
    const results: EarningsResultInterface[] = filings_10q_raw;
    const quarterlyResults = results.map(resultInterface => new EarningsResult(resultInterface));
    this._quarterlyResults = quarterlyResults;
    return quarterlyResults;
  }

}
