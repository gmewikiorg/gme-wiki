import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimelineEvent } from '../timeline-items/timeline-item/timeline-event.class';
import { TimelinePeriodType } from './timeline-period-type';

@Injectable({
  providedIn: 'root'
})
export class TimelineControlsService {

  constructor() { }


  private _period$: BehaviorSubject<TimelinePeriodType> = new BehaviorSubject<TimelinePeriodType>('CURRENT');
  private _metric$: BehaviorSubject<'PRICE' | 'VOLUME' | 'EQUITY' | 'PTOB' | 'PTOS' | 'PTOE' > = new BehaviorSubject<'PRICE' | 'VOLUME' | 'EQUITY' | 'PTOB' | 'PTOS' | 'PTOE' >('PRICE');

  public get period(): TimelinePeriodType { return this._period$.getValue(); }
  public get metric(): 'PRICE' | 'VOLUME' | 'EQUITY' | 'PTOB' | 'PTOS' | 'PTOE' { return this._metric$.getValue(); }

  public get period$(): Observable<TimelinePeriodType> { return this._period$.asObservable(); }
  public get metric$(): Observable<'PRICE' | 'VOLUME' | 'EQUITY' | 'PTOB' | 'PTOS' | 'PTOE' > { return this._metric$.asObservable(); }

  /** No data available for GME prior to 2002-02-13 */
  private _minStartDateYYYYMMDD: string = '2002-02-13'

  private _startDateYYYYMMDD: string = '2020-07-01';
  private _endDateYYYYMMDD: string = dayjs().format('YYYY-MM-DD');

  public get startDateYYYYMMDD(): string { return this._startDateYYYYMMDD; }
  public get endDateYYYYMMDD(): string { return this._endDateYYYYMMDD; }


  public setTimeframe(startDateYYYYMMDD: string, endDateYYYYMMDD: string){
    this._startDateYYYYMMDD = startDateYYYYMMDD;
    this._endDateYYYYMMDD = endDateYYYYMMDD;
  }


  public setMetric(metric: 'PRICE' | 'VOLUME' | 'EQUITY' | 'PTOB' | 'PTOS' | 'PTOE' ) {
    this._timelineItemAnnotation$.next(null);
    this._metric$.next(metric);
  }

  public setPeriod(period: TimelinePeriodType) {
    this._timelineItemAnnotation$.next(null);
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


  
  private _timelineItemAnnotation$: BehaviorSubject<TimelineEvent | null> = new BehaviorSubject<TimelineEvent | null>(null);
  public get timelineItemAnnotation$(): Observable<TimelineEvent | null> { return this._timelineItemAnnotation$.asObservable(); }

  public onHoverTimelineItem(timelineItem: TimelineEvent | null){
    this._timelineItemAnnotation$.next(timelineItem);
  }

  public removeAnnotation(){
    this._timelineItemAnnotation$.next(null);
  }


}
