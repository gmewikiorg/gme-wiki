import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EarningsChartPropertySelection } from './earnings-chart-property-selection.enum';
import { EarningsChartConfig } from './earnings-chart-config.interface';
import { defaultEarningsChartConfig } from './default-earnings-chart-config';

@Injectable({
  providedIn: 'root'
})
export class FinancialChartService {

  constructor() { }

  private _earningsChartConfig: EarningsChartConfig = defaultEarningsChartConfig;

  private _chartConfig$: BehaviorSubject<EarningsChartConfig> = new BehaviorSubject<EarningsChartConfig>(this._earningsChartConfig);
  public get chartConfig$(): Observable<EarningsChartConfig> { return this._chartConfig$.asObservable(); }
  public get chartConfig(): EarningsChartConfig { return this._chartConfig$.getValue(); }

  /** startFy, endFy, both strings must be in the format of 'FY 2025' */
  public setChartTimeFrame(startFy: string, endFy: string) {
    this._earningsChartConfig.startYear = Number(startFy.slice(3));
    this._earningsChartConfig.endYear = Number(endFy.slice(3));
    this._chartConfig$.next(this._earningsChartConfig);
  }

  public setChartPeriod(period: 'ANNUAL' | 'QUARTER') {
    this._earningsChartConfig.period = period;
    this._chartConfig$.next(this._earningsChartConfig);
  }

  public setChartPropertySelection(selection: EarningsChartPropertySelection) {
    this._earningsChartConfig.selectedProperty = selection;
    this._chartConfig$.next(this._earningsChartConfig);
  }

}
