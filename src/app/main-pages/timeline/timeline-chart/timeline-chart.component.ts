import { Component, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { BarController, CategoryScale, Chart, ChartConfiguration, ChartOptions, Decimation, Filler, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, TooltipItem } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataManagerService } from './timeline-chart-data-manager-service';
import { TimelineItemsService } from '../timeline-items/timeline-items.service';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { SettingsService } from '../../../shared/services/settings.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';
import { TimelineEvent } from '../timeline-items/timeline-item/timeline-event.class';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-timeline-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, RouterModule],
  templateUrl: './timeline-chart.component.html',
  styleUrl: './timeline-chart.component.scss'
})
export class TimelineChartComponent implements OnDestroy {
  @ViewChild(BaseChartDirective) public baseChart: BaseChartDirective | undefined;
  @HostListener('mousemove', ['$event']) onMousemove(event: MouseEvent) { }

  constructor(
    private _chartDataService: ChartDataManagerService,
    private _timelineItemService: TimelineItemsService,
    private _sizeService: ScreenService,
    private _settingsService: SettingsService,
    private _router: Router
  ) { 
    this._isDarkMode = this._sizeService.isDarkMode;
    Chart.unregister(ChartDataLabels);
    // if we do not unregister the ChartDataLabels then every point on the chart will have a label which looks terrible
    Chart.register(PointElement, Title, Legend, Filler, Decimation, CategoryScale, LineElement, Tooltip, LineController, LinearScale);
    this._updateChartContainerStyle();
    this._updateLabels();
    this.lineChartOptions = this._setLineChartOptions(this._isDarkMode);
    this.lineChartData.datasets = this._chartDataService.dataSets; 
  }

  public lineChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  public lineChartOptions: ChartOptions<'line'>;
  public lineChartLegend = false;

  public get isMobile(): boolean { return this._sizeService.isMobile; }
  public get isListView(): boolean { return this._settingsService.chartListIsVertical; }

  private _chartContainerNgStyle: any;
  public get chartContainerNgStyle(): any { return this._chartContainerNgStyle; }

  private _isDarkMode: boolean;

  private _subscriptions: Subscription[] = [];

  ngOnInit() {
    

  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

  private _updateLabels() {
    let labels: string[] = this._chartDataService.chartLabels;
    /** If there are too many data points to fit in the horizontal x-axis, not all of the labels will be included. */
    this.lineChartData.labels = labels;
  }

  ngAfterViewInit() {

    const darkModeSub = this._sizeService.isDarkMode$.subscribe({
      next: (isDarkMode)=>{
        this._isDarkMode = isDarkMode;
        this.lineChartOptions = this._setLineChartOptions(this._isDarkMode);
        this._chartDataService.updateDarkMode(isDarkMode);
      }
    })

    /**
     * This subscription is required to update the chart after datasets are modified.
     * For example, if the user changes a filter value such as significance value, 
     * this subscription will fire and the chart must be updated here.
     */
    const datasetSub = this._chartDataService.dataSets$.subscribe({
      next: (datasets) => {
        this._updateLabels();
        this.lineChartData.datasets = datasets;
        this.baseChart?.update();
      },
      error: () => { },
      complete: () => { }
    });
    const screenSizeSub = this._sizeService.screenDimensions$.subscribe({
      next: () => { this._updateChartContainerStyle(); }
    });
    const timelineSub = this._timelineItemService.itemSelected$.subscribe({
      next: (selected) => {
        if (selected.item) {
          if (selected.source === 'ITEMS') {
            this._openToolTip(selected.item);
          }
        }
      },
      error: () => { },
      complete: () => { }
    });
    this._subscriptions = [darkModeSub, datasetSub, screenSizeSub, timelineSub];
  }



  private _setLineChartOptions(isDarkMode: boolean): ChartOptions<'line'> {

    let scaleColor = 'rgba(128,128,128,0.2)';
    if(isDarkMode){
       scaleColor = 'rgba(255,255,255,0.1)';
    }
    
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      onHover: (event, array) => {
        if (array.length > 0) {
          if (!this._tooltipOpenedFromTimelineItems) {
            const timelineItem = this._chartDataService.lookupEventByIndex(array[0].datasetIndex, array[0].index);
            if (timelineItem) {
              // if(timelineItem.hasLocalArticle){
              //   this._timelineItemService.selectItem(timelineItem, 'CHART');
              // }
            } else {
            }
          } else {
            this._tooltipOpenedFromTimelineItems = false;
          }

        } else {
        }
        
      },
      onClick: (event, array) => {
        if (array.length > 0) {
          const timelineItem = this._chartDataService.lookupEventByIndex(array[0].datasetIndex, array[0].index);
          if (timelineItem) {
            this._timelineItemService.selectItem(timelineItem, 'CHART');
            // if(timelineItem.hasLocalArticle){
            //   this._router.navigate([timelineItem.localArticle?.url])
            // }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(0,0,0,0.01)'
          }
        },
        y: {
          grid: {
            color: scaleColor // Change the color of the lines along the Y axis
          }
        }
      },
      plugins: {
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
        legend: {
          display: true,
          labels: {
            color: 'rgb(0, 0, 0)',
            usePointStyle: true
          },
          position: 'left'
        }
      }
    };
  }

  private _labelContext(context: TooltipItem<"line">) {
    const event = this._chartDataService.lookupEventByIndex(context.datasetIndex, context.dataIndex)
    return '' + event?.title;
  }
  private _footerContext(context: TooltipItem<"line">[]) {
    const event = this._chartDataService.lookupEventByIndex(context[0].datasetIndex, context[0].dataIndex)
    if (event) {
      if (event.description.length > 120) {
        return event.description.substring(0, 120) + '...';
      } else {
        return event.description;
      }
    }
    return '';
  }
  private _titleContext(context: TooltipItem<"line">[]) {
    const event = this._chartDataService.lookupEventByIndex(context[0].datasetIndex, context[0].dataIndex)
    return '' + dayjs(event?.dateYYYYMMDD).format('MMMM D, YYYY') + " - GME share price: $" + Number(context[0].raw).toFixed(2);
  }

  public onClick(event: Event) {
  }

  private _tooltipOpenedFromTimelineItems: boolean = false;

  /** 
   * This is where some wizardry happens.  
   * In all honesty, it's not clear or well-designed. 
   * Reluctantly, information is obtained from the DOM to determine location of event circles,
   * then a mouse event is dispatched on the canvas element, which should trigger an onHover() event on the chart
   * 
   * One of the main issues is that the chart is not always in fixed shape or position, as it moves with the client window,
   * so the calculations must account for this.
   * 
   */
  private _openToolTip(item: TimelineEvent) {
    var mouseMoveEvent, meta, point;
    const itemIndex = this._chartDataService.lookupIndexByEvent(item);
    if (this.baseChart?.chart) {
      this.baseChart?.chart?.setActiveElements([{
        datasetIndex: itemIndex.datasetIndex,
        index: itemIndex.itemIndex,
      }]);
    }
    meta = this.baseChart?.chart?.getDatasetMeta(itemIndex.datasetIndex);
    if (meta) {
      point = meta.data[itemIndex.itemIndex];
    }
    if (point) {
      const containerEl = document.getElementById('chartContainer');
      const chartEl = document.getElementById('chartCanvas')
      if (containerEl && chartEl) {
        let clientY = 0;
        const gap = (containerEl.clientHeight - chartEl.clientHeight) / 2;
        if (this.isListView) {
          clientY = point.y + 80 + gap;
        } else {
          clientY = point.y + gap;
        }
        mouseMoveEvent = new MouseEvent('mousemove', {
          clientX: point.x,
          clientY: clientY,
        });
        this._tooltipOpenedFromTimelineItems = true;
        this.baseChart?.chart?.canvas.dispatchEvent(mouseMoveEvent);
      }
    }
  }

  private _updateChartContainerStyle() {
    if (this.isListView) {
      let width = this._sizeService.screenDimensions.width - 500;
      const maxHeight = this._sizeService.screenDimensions.height - 80;
      this._chartContainerNgStyle = {
        'max-width': width + 'px',
        'height': maxHeight + 'px',
      };
    } else {
      const gridBottomRowHeight = 180;
      const width = this._sizeService.screenDimensions.width;
      const height = this._sizeService.screenDimensions.height - gridBottomRowHeight;
      const roundedWidth = Math.floor(width / 20) * 20;
      const roundedHeight = Math.floor(height / 50) * 50;
      this._chartContainerNgStyle = {
        'max-width': roundedWidth + 'px',
        'height': roundedHeight + 'px',
      };
    }
  }

  private _tooltipBackgroundColor: string = 'rgba(0,0,0,0.8)';
  private _getTooltipBackgroundColor(context: TooltipItem<"line">) {
    const foundEvent = this._chartDataService.lookupEventByIndex(context.datasetIndex, context.dataIndex);
    const dataset = this._chartDataService.lookupDataset(context.datasetIndex);
    if (foundEvent) {
      this._tooltipBackgroundColor = this._chartDataService.getTypeColor(dataset.itemType);
    }
    return this._tooltipBackgroundColor;
  }

}
