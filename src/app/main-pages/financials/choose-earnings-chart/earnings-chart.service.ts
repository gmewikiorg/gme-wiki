import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EarningsChartOption } from './earnings-chart-option.enum';

@Injectable({
  providedIn: 'root'
})
export class FinancialChartService {

  constructor() { }


  private _chartPeriod$: BehaviorSubject<'ANNUAL' | 'QUARTER' | 'QOVERQ'> = new BehaviorSubject<'ANNUAL' | 'QUARTER' | 'QOVERQ'>('ANNUAL');
  private _chartOption$: BehaviorSubject<EarningsChartOption> = new BehaviorSubject<EarningsChartOption>(EarningsChartOption.REVENUE_VS_NET_INCOME);

  public get chartPeriod(): 'ANNUAL' | 'QUARTER' | 'QOVERQ' { return this._chartPeriod$.getValue(); }
  public get chartOption(): EarningsChartOption { return this._chartOption$.getValue(); }

  public get chartPeriod$(): Observable<'ANNUAL' | 'QUARTER' | 'QOVERQ'> { return this._chartPeriod$.asObservable(); }
  public get chartOption$(): Observable<EarningsChartOption> { return this._chartOption$.asObservable(); }

  private _chartTitle: string = 'Revenue and Net Income by fiscal year';
  public get chartTitle(): string { return this._chartTitle; }

  public setChartTitle(title: string){
    this._chartTitle = title;
  }

  public setChartOption(option: EarningsChartOption) {
    this._chartOption$.next(option);
  }

  public setChartPeriod(option: 'ANNUAL' | 'QUARTER' | 'QOVERQ') {
    this._chartPeriod$.next(option);
  }

}
