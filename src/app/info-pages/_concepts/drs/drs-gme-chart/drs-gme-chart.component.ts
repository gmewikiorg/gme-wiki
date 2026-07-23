import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, ChartConfiguration, ChartOptions, Legend, LinearScale, Tooltip, TooltipItem } from 'chart.js';
import { ScreenService } from '../../../../shared/services/screen-size.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { EarningsDataService } from '../../../../main-pages/financials/earnings-results/earnings-data.service';
import { EarningsResult } from '../../../../main-pages/financials/earnings-results/earnings-result.class';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-drs-gme-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './drs-gme-chart.component.html',
  styleUrl: './drs-gme-chart.component.scss'
})
export class DrsGmeChartComponent implements AfterViewInit {
  constructor(private _sizeService: ScreenService, private _earningsService: EarningsDataService, @Inject(PLATFORM_ID) private platformId: Object,) {
    this._isBrowser = isPlatformBrowser(this.platformId);
    Chart.unregister(ChartDataLabels);
    Chart.register(ChartDataLabels, LinearScale, BarController, CategoryScale, BarElement, Tooltip, Legend);
    this.barChartData = this._setData();
    this.barChartOptions = this._setOptions();
  }

  public barChartData: ChartConfiguration<'bar'>['data'];
  public barChartOptions: ChartOptions<'bar'>;
  public barChartLegend = false;

  public get isMobile(): boolean { return this._sizeService.isMobile; }
  private _isPercentage: boolean = false;

    private _isBrowser: boolean = false;
  public get isBrowser(): boolean { return this._isBrowser; }

  ngAfterViewInit(): void {
    this._sizeService.screenDimensions$.subscribe((change) => {
      this.barChartData = this._setData();
      this.barChartOptions = this._setOptions();
    });
  }

  public onClickDRSNumber() {
    this._isPercentage = false;
    this.barChartData = this._setData();
    this.barChartOptions = this._setOptions();
  }
  public onClickDRSPercent() {
    this._isPercentage = true;
    this.barChartData = this._setData();
    this.barChartOptions = this._setOptions();
  }


  // private _dataLabelsAnnual: string[] = [
  //   'FY20', 'FY21', 'FY22', 'FY23', 'FY24'
  // ]
  // private _data_drsRegisteredAnnual: number[] = [
  //   0, 35600000, 76000000, 75300000, 69500000
  // ]
  // private _data_tsoAnnual: number[] = [
  //   0, (76339248 * 4), 304675439, 305873200, 447083981
  // ]


  /** Iterates through quarterly results, starting at Q2 2021 towards most recent current quarter, providing a label for each */
  private get _relevenatDRSQuarters(): EarningsResult[] {
    if (this._earningsService) {
      const quarterlyResults: EarningsResult[] = this._earningsService.quarterlyResults;
      let firstRelevantDRSQuarterIndex = quarterlyResults.findIndex(item => item.reportingPeriod === 'Q2' && item.fiscalYear === 2021);
      if (firstRelevantDRSQuarterIndex > -1) {
        const relevantQuarters = quarterlyResults.filter(q => quarterlyResults.indexOf(q) <= firstRelevantDRSQuarterIndex)
        return relevantQuarters.reverse();
      }
    }
    return [];
  }

  private get _dataLabelsQuarterly(): string[] {
    const labels: string[] = this._relevenatDRSQuarters.map(q => {
      return q.reportingPeriod + " " + String(q.fiscalYear).substring(2)
    })
    return labels;
  }

  private get _data_drsRegisteredQuarterly(): number[] {
    const registeredCounts: number[] = this._relevenatDRSQuarters.map(q => {
      if (q.fiscalYear < 2022 || (q.reportingPeriod === 'Q1' && q.fiscalYear === 2022)) {
        return q.drs * 4;
      }
      return q.drs;
    })
    return registeredCounts;
  }

  private get _data_tsoQuarterly(): number[] {
    const registeredCounts: number[] = this._relevenatDRSQuarters.map(q => {
      if (q.fiscalYear < 2022 || (q.reportingPeriod === 'Q1' && q.fiscalYear === 2022)) {
        return q.weightedAverageSharesOutstanding * 4;
      }
      if (q.fiscalYear === 2024 && q.reportingPeriod === 'Q1') {
        // special case where weightaverage shares outstanding value does not closely match tso due to timing of ATM
        return 351217517;
      }
      return q.weightedAverageSharesOutstanding;
    })
    return registeredCounts;
  }

  private get _data_drsPercentQuarterly(): number[] {
    const tso: number[] = this._data_drsRegisteredQuarterly.map(drsRegistered => {
      const index = this._data_drsRegisteredQuarterly.indexOf(drsRegistered);
      return (drsRegistered / this._data_tsoQuarterly[index]) * 100;
    })
    return tso;
  }

  private _setData(): ChartConfiguration<'bar'>['data'] {
    const isPercentage = this._isPercentage;
    const isMobile = this.isMobile;
    let registered = this._data_drsRegisteredQuarterly;
    let labels = this._dataLabelsQuarterly;
    if (isPercentage) {
      labels = this._dataLabelsQuarterly;
      registered = this._data_drsPercentQuarterly;
    }
    const barChartData: ChartConfiguration<'bar'>['data'] = {
      labels: labels,
      datasets: [
        {
          label: 'Registered shares of GME',
          data: registered,
          datalabels: {
            color: 'rgba(143, 23, 149, 1.0)',
            listeners: {
              enter() {

              }
            },
            align() {
              return 'top';
            },

            anchor: 'end',
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderRadius: 5,
            display(context) {
              if (context.dataIndex === context.dataset.data.length - 1) {
                return true;
              }
              return false;
            },

            borderColor: function (context) {
              return 'rgba(0,0,255,0.1)';
            },
            borderWidth: 1,
            
            formatter: function (value, context) {
              if (isPercentage) {
                if (isMobile) {
                  return (value).toFixed(1) + '%    ';
                }
                return (value).toFixed(1) + '%';
              } else {
                if (isMobile) {
                  return (value / 1000000).toFixed(0) + 'M    ';
                }
                return (value / 1000000).toFixed(1) + 'M';
              }

            },
            font: {
              weight: 'bold',
            },
            padding: 0,

          },
          backgroundColor: [
            'rgb(205, 134, 209)',
          ],
          borderColor: [
            'rgba(255, 255, 255, 1.0)',
          ],
          borderRadius: 5,
          borderWidth: 1,
        },
      ],
    };
    return barChartData;
  }


  private _setOptions(): ChartOptions<'bar'> {
    const isPercentage = this._isPercentage;
    let maxY = 80000000;
    if (isPercentage) {
      // Use 30 as the max, since th
      maxY = 30;
    }
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      scales: {
        y: {
          max: maxY,
          grid: {
            color: function (context) {
              if (context.tick.value === 0) {
                return 'rgba(0,0,0,0.5)';
              }
              return 'rgba(0,0,0,0.05)';
            },
          },
          ticks: {
            maxTicksLimit: 6,
            callback(tickValue, index, ticks) {
              if (isPercentage) {
                return Number(tickValue) + "%";
              }
              return (Number(tickValue) / 1000000) + "M";
            },
          },
        },

      },
      layout: {
        padding: {
          right: 30,
        }
      },
      plugins: {
        datalabels: {

        },
        tooltip: {
          callbacks: {
            label: (context) => { return this._labelContext(context) },
            footer: (context) => { return this._footerContext(context) },
            title: (context) => { return this._titleContext(context) }
          },
        }
      },

    }
  }

  private _labelContext(context: TooltipItem<"bar">) {
    if (this._isPercentage) {
      return Number(context.raw).toFixed(1) + "% of total";
    } else {
      return (Number(context.raw) / (1000000)).toFixed(1) + "M shares";
    }

  }

  private _titleContext(context: any[]) {
    const label = context[0].label;
    const fiscalQuarter = label.substring(0, 2);
    const year = '20' + label.substring(3);
    return fiscalQuarter + ' ' + year;
  }

  private _footerContext(context: TooltipItem<"bar">[]) {
    return '';
  }

}
