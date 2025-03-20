import { Component, HostListener, Input, OnDestroy, ViewChild } from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, ChartConfiguration, ChartOptions, Decimation, Filler, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, TooltipItem } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TimelineChartDataManagerService } from './timeline-chart-data-manager-service';
import { ScreenService } from '../../../shared/services/screen-size.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';
import { TimelineEvent } from '../timeline-items/timeline-item/timeline-event.class';
import { CommonModule } from '@angular/common';
import { Subscription, timer } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { TimelineControlsService } from '../timeline-controls/timeline-controls.service';
import annotationPlugin from 'chartjs-plugin-annotation';
import { getAnnotationConfig } from '../timeline-controls/chart-options/annotations-historic';
import { SneezeChartAnimation } from '../../../info-pages/sneeze/sneeze-chart-animation.class';
import { TimelineEventViewType } from '../timeline-items/timeline-item/timeline-event-url.interface';


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
    private _sizeService: ScreenService,
    private _controlsService: TimelineControlsService,
    private _router: Router
  ) {
    this._isDarkMode = this._sizeService.isDarkMode;
    Chart.unregister(ChartDataLabels, annotationPlugin, Tooltip);
    // if we do not unregister the ChartDataLabels then every point on the chart will have a label which looks terrible
    Chart.register(annotationPlugin, PointElement, Title, Legend, Filler, Decimation, CategoryScale, LineElement, Tooltip, LineController, LinearScale, BarController, BarElement);
    this.lineChartOptions = this._setLineChartOptions(this._isDarkMode);
    this.lineChartData.datasets = this._chartDataService.dataSets;
    this.lineChartData.labels = this._chartDataService.chartLabels;
    this._sneezeAnimator = new SneezeChartAnimation(this._chartDataService, this._controlsService);
  }

  public lineChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  public lineChartOptions: ChartOptions<'line'>;
  public lineChartLegend = false;

  private _isDarkMode: boolean;
  private _timePeriod: TimelineEventViewType = 'CURRENT';
  private _subscriptions: Subscription[] = [];

  ngOnInit() {
    if (this.isSneezeComponent) {
      this._setSneezePeriod();
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
    this._sneezeAnimator.stop();
    Chart.unregister();
  }

  ngAfterViewInit() {
    const darkModeSub = this._sizeService.isDarkMode$.subscribe({
      next: (isDarkMode) => {
        this._isDarkMode = isDarkMode;
        this.lineChartOptions = this._setLineChartOptions(this._isDarkMode);
        this._chartDataService.updateDarkMode(isDarkMode);
      }
    })

    const receiveAnimationSignalSub = this._chartDataService.sneezeAnimation$.subscribe((animate: boolean) => {
      if (animate === true) {
        this._animateSneezeChart();
      }
    })

    const changedToMobileSub = this._sizeService.changedScreenFromToMobile$.subscribe({
      next: () => {
        this._chartDataService.updateIsMobile(this._sizeService.isMobile);
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
        this.lineChartOptions = this._setLineChartOptions(this._isDarkMode);
        // console.log("DATASETS UPDATE", this.lineChartData.datasets)
        // this.baseChart?.update();
      },
      error: () => { },
      complete: () => { }
    });

    this._subscriptions = [darkModeSub, datasetSub, changedToMobileSub, receiveAnimationSignalSub];
  }




  private _sneezeAnimator: SneezeChartAnimation;

  private _setSneezePeriod() {
    this._timePeriod = 'SNEEZE';
    let sneezeStartYYYYMMDD = this._sneezeAnimator.sneezeChartStartDateYYYYMMDD;
    let sneezeCurrentEndYYYYMMDD = this._sneezeAnimator.sneezeChartStopDateYYYYMMDD;
    this._chartDataService.updatePeriod('SNEEZE', sneezeStartYYYYMMDD, sneezeCurrentEndYYYYMMDD);
  }

  private _animateSneezeChart() {
    this._sneezeAnimator.animateSneezeChart();
  }

  private _cursorNgStyle = { cursor: 'default', }
  public get cursorNgStyle(): any { return this._cursorNgStyle; }

  private _setLineChartOptions(isDarkMode: boolean): ChartOptions<'line'> {
    let scaleColor = 'rgba(128,128,128,0.2)';
    if (isDarkMode) { scaleColor = 'rgba(255,255,255,0.15)'; }
    // const img = new Image();
    // img.src = 'assets/icons/bluesky-logo.png';

    const period = this._timePeriod;
    let annotation: any = {}
    let maxTicksLimit = 9;
    if (period === 'CURRENT') {
      maxTicksLimit = 9;

    } else if (period === 'HISTORIC') {
      maxTicksLimit = 23;
      annotation = getAnnotationConfig(this._isDarkMode);
    } else if (period === '2_YEARS') {
    }


    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      onHover: (event, array) => {
        this._cursorNgStyle = { cursor: 'default' }
        if (array.length > 0) {
          const timelineItem = this._chartDataService.lookupEventByIndex(array[0].datasetIndex, array[0].index);
          if (timelineItem) {
            this._controlsService.setTimelineAnnotation(timelineItem);
            if (timelineItem.hasLocalArticle || timelineItem.hasUrls) {
              this._cursorNgStyle = { cursor: 'pointer' }
            }
          }

        }
      },
      onClick: (event, array) => {
        if (array.length > 0) {
          const timelineItem = this._chartDataService.lookupEventByIndex(array[0].datasetIndex, array[0].index);
          if (timelineItem) {
            if (timelineItem.hasLocalArticle && !this._sizeService.isMobile) {
              this._router.navigate([timelineItem.localArticle!.url]);
            } else if (timelineItem.hasUrls) {
              window.open(timelineItem.urls[0].url, '_blank');
            }
          }
        }
      },
      layout: {
        padding: 0,

      },
      scales: {
        x: {
          grid: {
            color: scaleColor,
          },
          ticks: {
            // autoSkip: period === 'HISTORIC' ? false : true,
            autoSkip: false,
            // autoSkip: () => { if (period === 'HISTORIC') { return false; } return true; },
            maxTicksLimit: maxTicksLimit,
          }
        },
        y: {
          grid: {
            color: scaleColor // Change the color of the lines along the Y axis
          },
          min: 0,
        }
      },
      plugins: {
        annotation: annotation,
        tooltip: {
          backgroundColor: (context) => {
            if (context.tooltipItems.length > 0) {
              this._getTooltipBackgroundColor(context.tooltipItems[0])
            }
            return this._tooltipBackgroundColor;
          },

          borderColor: 'black',
          borderWidth: 1,
          displayColors: false,
          bodyFont: {
            size: 16,
            weight: 'bold',
          },
          titleFont: {
            weight: 'normal',
          },
          footerFont: {
            weight: 'normal',
          },
          callbacks: {
            title: (context) => { return this._titleContext(context) },
            label: (context) => { return this._labelContext(context) },
            // footer: (context) => { return this._footerContext(context) },
          },
        },

      },
    };
  }


  private _labelContext(context: TooltipItem<"line">) {
    const event = this._chartDataService.lookupEventByIndex(context.datasetIndex, context.dataIndex)
    let label = '';

    if (this._sizeService.isMobile) {
      if (event?.hasShortTitle) {
        label += event.shortTitle;
      }
    } else {
      if (event?.hasLocalArticle) {
        label += '📰';
      }
      label += event?.title
    }


    return label;
  }
  // private _footerContext(context: TooltipItem<"line">[]) {
  //   return '';
  // }
  private _titleContext(context: TooltipItem<"line">[]) {
    const event = this._chartDataService.lookupEventByIndex(context[0].datasetIndex, context[0].dataIndex)
    let title = '' + dayjs(event?.dateYYYYMMDD).format('MMMM D, YYYY') + " - GME share price: $" + Number(context[0].raw).toFixed(2)

    if (this._sizeService.isMobile) {
      title = '' + dayjs(event?.dateYYYYMMDD).format('MMMM D, YYYY')
    }

    return title;
  }



  private _tooltipBackgroundColor: string = 'rgba(0,0,0,0.8)';
  private _getTooltipBackgroundColor(context: TooltipItem<"line">) {
    const foundEvent = this._chartDataService.lookupEventByIndex(context.datasetIndex, context.dataIndex);
    const dataset = this._chartDataService.lookupDataset(context.datasetIndex);
    if (foundEvent) {
      this._tooltipBackgroundColor = TimelineEvent.getTypeColor(foundEvent.mainType, 0.8);
    }
    return this._tooltipBackgroundColor;
  }

}


