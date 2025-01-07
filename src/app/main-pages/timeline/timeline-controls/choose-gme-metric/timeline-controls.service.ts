import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimelineControlsService {

  constructor() { }


  private _period$: BehaviorSubject<'2_YEARS' | '5_YEARS' | 'CURRENT' | 'HISTORIC' | 'CUSTOM'> = new BehaviorSubject<'2_YEARS' | '5_YEARS' | 'CURRENT' | 'HISTORIC' | 'CUSTOM'>('CURRENT');
  private _metric$: BehaviorSubject<'PRICE' | 'VOLUME' | 'PtoB' | 'PtoS'> = new BehaviorSubject<'PRICE' | 'VOLUME' | 'PtoB' | 'PtoS'>('PRICE');

  public get period(): '2_YEARS' | '5_YEARS' | 'CURRENT' | 'HISTORIC' | 'CUSTOM' { return this._period$.getValue(); }
  public get metric(): 'PRICE' | 'VOLUME' | 'PtoB' | 'PtoS' { return this._metric$.getValue(); }

  public get period$(): Observable<'2_YEARS' | '5_YEARS' | 'CURRENT' | 'HISTORIC' | 'CUSTOM'> { return this._period$.asObservable(); }
  public get metric$(): Observable<'PRICE' | 'VOLUME' | 'PtoB' | 'PtoS'> { return this._metric$.asObservable(); }

  // private _viewStartDateYYYYMMDD: string = '2020-06-01'
  // private _viewEndDateYYYYMMDD: string = dayjs().format('YYYY-MM-DD');

  /** No data available for GME prior to 2002-02-13 */
  private _minStartDateYYYYMMDD: string = '2002-02-13'

  private _startDateYYYYMMDD: string = '2020-06-01';
  private _endDateYYYYMMDD: string = dayjs().format('YYYY-MM-DD');

  public get startDateYYYYMMDD(): string { return this._startDateYYYYMMDD; }
  public get endDateYYYYMMDD(): string { return this._endDateYYYYMMDD; }


  public setMetric(metric: 'PRICE' | 'VOLUME' | 'PtoB' | 'PtoS') {
    this._metric$.next(metric);
  }

  public setPeriod(period: '2_YEARS' | '5_YEARS' | 'CURRENT' | 'HISTORIC' | 'CUSTOM') {
    if (period === '2_YEARS') {
      this._startDateYYYYMMDD = dayjs().add(-2, 'years').format('YYYY-MM-DD');
    } else if (period === '5_YEARS') {
      this._startDateYYYYMMDD = dayjs().add(-5, 'years').format('YYYY-MM-DD');
    } else if (period === 'CURRENT') {
      /** The Current GME era, starting some time in 2020 */
      this._startDateYYYYMMDD = '2020-06-01';
    } else if (period === 'HISTORIC') {
      this._startDateYYYYMMDD = this._minStartDateYYYYMMDD;
    } else if (period === 'CUSTOM') {

    }





    this._period$.next(period);
  }


}
