import { Component, HostListener, Input, OnDestroy, ViewChild } from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, ChartConfiguration, ChartOptions, Decimation, Filler, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, TooltipItem } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TimelineChartDataManagerService } from './timeline-chart-data-manager-service';
import { ScreenService } from '../../../shared/services/screen-size.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';
import { TimelineEventOLD } from '../timeline-items/timeline-item/timeline-event.class';
import { CommonModule } from '@angular/common';
import { Subscription, timer } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { TimelineControlsService } from '../timeline-controls/timeline-controls.service';
import annotationPlugin from 'chartjs-plugin-annotation';
import { getAnnotationConfig } from '../timeline-controls/chart-options/annotations-historic';
import { TimelineEventViewType } from '../timeline-items/timeline-item/timeline-event-url.interface';
import { timelineEventConfigs } from './timeline-events';
// import { TimelineEventNEW } from './timeline-event.class';
import { setTimelineChartOptions } from './timeline-chart-options';


@Component({
  selector: 'app-timeline-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, RouterModule],
  templateUrl: './timeline-chart.component.html',
  styleUrl: './timeline-chart.component.scss'
})
export class TimelineChartComponent implements OnDestroy {
  // @ViewChild(BaseChartDirective) public baseChart: BaseChartDirective | undefined;
  @HostListener('mousemove', ['$event']) onMousemove(event: MouseEvent) {
    if (this.isSneezeComponent) {
      return;
    }
  }


  @Input() isSneezeComponent: boolean = false;
  @Input() isBurpComponent: boolean = false;

  constructor(
    private _chartDataService: TimelineChartDataManagerService,
    private _screenService: ScreenService,
    private _controlsService: TimelineControlsService,
    private _router: Router
  ) {
    this._isDarkMode = this._screenService.isDarkMode;
    this._isMobile = this._screenService.isMobile;
    Chart.unregister(ChartDataLabels, annotationPlugin, Tooltip);
    // if we do not unregister the ChartDataLabels then every point on the chart will have a label which looks terrible
    Chart.register(annotationPlugin, PointElement, Title, Legend, Filler, Decimation, CategoryScale, LineElement, Tooltip, LineController, LinearScale, BarController, BarElement);
    this.lineChartOptions = this._setTimelineChartOptions();
    this.lineChartData.datasets = this._chartDataService.dataSets;
    this.lineChartData.labels = this._chartDataService.chartLabels;
  }

  public lineChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  public lineChartOptions: ChartOptions<'line'>;
  public lineChartLegend = false;

  private _isDarkMode: boolean;
  private _isMobile: boolean;
  private _timePeriod: TimelineEventViewType = 'CURRENT';
  private _subscriptions: Subscription[] = [];

  // private _timelineEvents: TimelineEventNEW[] = [];


  // private _getTimelineEvents() {
  //   const timelineEvents: TimelineEventNEW[] = timelineEventItems.map(item => new TimelineEventNEW(item));
  // }

  ngOnInit() {
    // this._getTimelineEvents();
    if (this.isSneezeComponent) {
    } else {
      this._controlsService.period$.subscribe((period: TimelineEventViewType) => {
        this._timePeriod = period;
        this._chartDataService.updatePeriod(period, this._controlsService.startDateYYYYMMDD, this._controlsService.endDateYYYYMMDD);
      })
      this._controlsService.metric$.subscribe(() => {
        this._chartDataService.updateMetric(this._controlsService.metric)
      })
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe());
    Chart.unregister();
  }

  ngAfterViewInit() {
    const darkModeSub = this._screenService.isDarkMode$.subscribe({
      next: (isDarkMode) => {
        this._isDarkMode = isDarkMode;
        this.lineChartOptions = this._setTimelineChartOptions();
        this._chartDataService.updateDarkMode(isDarkMode);
      }
    })

    const changedToMobileSub = this._screenService.changedScreenFromToMobile$.subscribe({
      next: () => {
        this._chartDataService.updateIsMobile(this._screenService.isMobile);
      }
    })


    /**
     * This subscription is required to update the chart after datasets are modified.
     * For example, if the user changes a filter value such as significance value, 
     * this subscription will fire and the chart must be updated here.
     */
    const datasetSub = this._chartDataService.dataSets$.subscribe({
      next: (datasets) => {
        this.lineChartData.labels = this._chartDataService.chartLabels;
        this.lineChartData.datasets = datasets;
        this.lineChartOptions = this._setTimelineChartOptions();
      },
      error: () => { },
      complete: () => { }
    });

    this._subscriptions = [darkModeSub, datasetSub, changedToMobileSub];
  }

  private _setTimelineChartOptions(): ChartOptions<'line'> {
    this.lineChartOptions = setTimelineChartOptions(
      this._isDarkMode,
      this._isMobile,
      this._timePeriod,
      this._chartDataService,
      this._controlsService,
      this._cursorNgStyle,
      this._screenService,
      this._router,
      this._tooltipBackgroundColor);
    return this.lineChartOptions;
  }



  private _cursorNgStyle = { cursor: 'default', }
  public get cursorNgStyle(): any { return this._cursorNgStyle; }

  private _tooltipBackgroundColor: string = 'rgba(0,0,0,0.8)';

}


