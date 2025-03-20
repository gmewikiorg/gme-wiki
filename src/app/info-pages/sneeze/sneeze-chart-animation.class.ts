import { Subscription, timer } from "rxjs";
import { TimelineChartDataManagerService } from "../../main-pages/timeline/timeline-chart/timeline-chart-data-manager-service";
import dayjs from "dayjs";
import { TimelineControlsService } from "../../main-pages/timeline/timeline-controls/timeline-controls.service";
import { TimelineEvent } from "../../main-pages/timeline/timeline-items/timeline-item/timeline-event.class";



export class SneezeChartAnimation {
    constructor(private _chartDataService: TimelineChartDataManagerService, private _controlsService: TimelineControlsService) {
        this._timelineEvents = this._chartDataService.lookupEventsByViewType('SNEEZE');
        this._eventDates = this._timelineEvents.map(item => item.dateYYYYMMDD);
    }

    private _animationSub: Subscription | null = null;
    private _pauseSub: Subscription | null = null;
    private _timelineEvents: TimelineEvent[];

    public get sneezeChartStopDateYYYYMMDD(): string { return '2021-04-30'; }
    public get sneezeChartStartDateYYYYMMDD(): string { return '2019-01-01'; }
    private _sneezeCurrentEndYYYYMMDD: string = '2019-07-01';
    public get sneezeCurrentEndYYYYMMDD(): string { return this._sneezeCurrentEndYYYYMMDD; }

    public stop() {
        this._animationSub?.unsubscribe();
        this._pauseSub?.unsubscribe();
        this._chartDataService.animationComplete();
        this._resetAnimationSettings();
    }


    private _msPerTick = 20;
    private _daysPerTick = 5;
    private _pauseDurationMs = 2000;
    private _eventDates: string[];

    private _resetAnimationSettings(){
        this._msPerTick = 20;
        this._daysPerTick = 5;
        this._pauseDurationMs = 2000;
    }

    public animateSneezeChart() {
        this._resetAnimationSettings();
        this._controlsService.removeAnnotation();
        this._sneezeCurrentEndYYYYMMDD = '2019-07-01';
        this._chartDataService.updatePeriod('SNEEZE', this.sneezeChartStartDateYYYYMMDD, this._sneezeCurrentEndYYYYMMDD);
        this.performAnimationCycle();
    }

    public pause(date: string) {
        this._animationSub?.unsubscribe();
        this._pauseSub?.unsubscribe();
        let event = this._timelineEvents.find(e => e.dateYYYYMMDD === date);
        this._controlsService.setTimelineAnnotation(event);

        this._pauseSub = timer(this._pauseDurationMs).subscribe(() => {
            this.continue();
        })
    }
    public continue() {
        this.performAnimationCycle()
    }

    public performAnimationCycle() {
        this._animationSub = timer(0, this._msPerTick).subscribe(() => {
            const originalDate = this._sneezeCurrentEndYYYYMMDD;
            this._sneezeCurrentEndYYYYMMDD = dayjs(this._sneezeCurrentEndYYYYMMDD).add(this._daysPerTick, 'days').format('YYYY-MM-DD');
            const datesIncremented = [this._sneezeCurrentEndYYYYMMDD];

            if (this._daysPerTick > 1) {
                // const originalDate = datesIncremented[0];
                let endDateYYYYMMDD = originalDate;
                while (endDateYYYYMMDD < this._sneezeCurrentEndYYYYMMDD) {
                    endDateYYYYMMDD = dayjs(endDateYYYYMMDD).add(1, 'days').format('YYYY-MM-DD');
                    datesIncremented.push(endDateYYYYMMDD)
                }
            }else{
                // datesIncremented.push(this._sneezeCurrentEndYYYYMMDD);
            }
            if(this._sneezeCurrentEndYYYYMMDD >= '2020-11-01'){
                // before RC's letter
                this._pauseDurationMs = 5000;

            }
            if(this._sneezeCurrentEndYYYYMMDD > '2020-11-16'){
                // before RC's letter
                this._pauseDurationMs = 5000;

            }
            
            if(this._sneezeCurrentEndYYYYMMDD >= '2020-12-01'){
                // slow it down as we approach the sneeze
                this._daysPerTick = 1;
                this._pauseDurationMs = 2000;
                this._msPerTick = 150;
            }
            if(this._sneezeCurrentEndYYYYMMDD > '2021-01-08'){
                this._msPerTick = 600;
            }
            if(this._sneezeCurrentEndYYYYMMDD >= '2021-01-27'){
                this._msPerTick = 100;
                this._pauseDurationMs = 5000;
            }
            if(this._sneezeCurrentEndYYYYMMDD > '2021-02-18'){
                this._pauseDurationMs = 2000;
            }
            datesIncremented.forEach(date => {
                if (this._eventDates.includes(date)) {
                    this.pause(date);
                }
            });
            if (this._sneezeCurrentEndYYYYMMDD > this.sneezeChartStopDateYYYYMMDD) {
                this._sneezeCurrentEndYYYYMMDD = this.sneezeChartStopDateYYYYMMDD;
                this.stop();
            }
            this._chartDataService.updatePeriod('SNEEZE', this.sneezeChartStartDateYYYYMMDD, this._sneezeCurrentEndYYYYMMDD);
        });
    }
}
