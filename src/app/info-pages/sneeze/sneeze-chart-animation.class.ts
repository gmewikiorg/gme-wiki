import { Subscription, timer } from "rxjs";
import { TimelinePeriodType } from "../../main-pages/timeline/timeline-controls/timeline-period-type";
import { TimelineChartDataManagerService } from "../../main-pages/timeline/timeline-chart/timeline-chart-data-manager-service";
import dayjs from "dayjs";
import { TimelineControlsService } from "../../main-pages/timeline/timeline-controls/timeline-controls.service";

// private get _sneezeChartStopDateYYYYMMDD(): string { return '2021-04-30'; }


export class SneezeChartAnimation {
    constructor(private _chartDataService: TimelineChartDataManagerService, private _controlsService: TimelineControlsService) {

    }

    private _animationSub: Subscription | null = null;

    public get _sneezeChartStopDateYYYYMMDD(): string { return '2021-04-30'; }
    public get _sneezeChartStartDateYYYYMMDD(): string { return '2019-01-01'; }
    public get _sneezeCurrentEndYYYYMMDD(): string { return '2019-07-01'; }

    public stop(){
        this._animationSub?.unsubscribe();
    }

    public animateSneezeChart() {
        this._controlsService.removeAnnotation();
        let timePeriod: TimelinePeriodType = 'SNEEZE';
        this._chartDataService.updatePeriod('SNEEZE', this._sneezeChartStartDateYYYYMMDD, this._sneezeCurrentEndYYYYMMDD);
        let pause = false;
        let sneezeEndYYYYMMDD: string = this._sneezeCurrentEndYYYYMMDD;
        this._animationSub = timer(0, 20).subscribe(() => {
            if (pause === false) {
                sneezeEndYYYYMMDD = dayjs(sneezeEndYYYYMMDD).add(1, 'days').format('YYYY-MM-DD');
            }
            if (sneezeEndYYYYMMDD === '2021-01-27') {
                pause = true;
            }
            if (sneezeEndYYYYMMDD > this._sneezeChartStopDateYYYYMMDD) {
                sneezeEndYYYYMMDD = this._sneezeChartStopDateYYYYMMDD;
                this._animationSub?.unsubscribe();
                this._chartDataService.animationComplete();
            }
            this._chartDataService.updatePeriod('SNEEZE', this._sneezeChartStartDateYYYYMMDD, sneezeEndYYYYMMDD);
            if (pause === true) {
                // sneezeEndYYYYMMDD = dayjs(sneezeEndYYYYMMDD).add(1, 'days').format('YYYY-MM-DD');
                timer(2000).subscribe(() => {
                    pause = false;
                })
            }

        })
    }
}
