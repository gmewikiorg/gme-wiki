import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, ChartConfiguration, ChartDataset, ChartOptions, Legend, LinearScale, Tooltip, TooltipItem } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ScreenService } from '../../../shared/services/screen-size.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { EarningsResult } from '../earnings-results/earnings-result.class';
import { Import10KDataService } from '../earnings-results/import-10k-data.service';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../shared/services/loading.service';
import { EarningsDatasetBuilder } from './earnings-datasets.class';
import { Subscription } from 'rxjs';
import { earningsChartLabelContext } from './earnings-chart-label-context';
import { setEarningsChartLegend } from './earnings-chart-set-legend';
import { FinancialChartService } from './choose-earnings-chart/earnings-chart.service';
import { EarningsChartPropertySelection } from './choose-earnings-chart/earnings-chart-property-selection.enum';
import { EarningsChartConfig } from './choose-earnings-chart/earnings-chart-config.interface';
import { defaultEarningsChartConfig } from './choose-earnings-chart/default-earnings-chart-config';

@Component({
  selector: 'app-earnings-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './earnings-chart.component.html',
  styleUrl: './earnings-chart.component.scss'
})
export class EarningsChartComponent implements OnInit, OnDestroy {

  private _datasetBuilder: EarningsDatasetBuilder;
  constructor(private _screenService: ScreenService, private _chartService: FinancialChartService, private _financeService: Import10KDataService, private _loadingService: LoadingService) {
    Chart.unregister(ChartDataLabels);
    Chart.register(ChartDataLabels, LinearScale, BarController, CategoryScale, BarElement, Tooltip, Legend);
    this._datasetBuilder = new EarningsDatasetBuilder(this._screenService);
    this.barChartOptions = this._setChartOptions();
    this.barChartData = this._updateDatasets();
    this._chartConfig = this._chartService.chartConfig;
  }

  @Input() componentConfig: EarningsChartConfig | null = null;

  private _isLoaded: boolean = false;
  private _chartConfig: EarningsChartConfig = defaultEarningsChartConfig

  public barChartData: ChartConfiguration<'bar'>['data'];
  public barChartOptions: ChartOptions<'bar'>;
  public barChartLegend = false;
  public showCustomLegend: boolean = true;
  public customLegendItems: { title: string; color: string }[] = [];

  public get isLoaded(): boolean { return this._isLoaded; }
  public get isDarkMode(): boolean { return this._screenService.isDarkMode; }
  public get chartPeriod(): 'ANNUAL' | 'QUARTER' { return this._chartConfig.period; }
  public get chartSelectedProperty(): EarningsChartPropertySelection { return this._chartConfig.selectedProperty; }
  public get chartStartYear(): number { return this._chartConfig.startYear; }
  public get chartEndYear(): number { return this._chartConfig.endYear; }

  async ngOnInit() {
    this._updateChartDataAndOptions();
    this._subscriptions = [
      this._chartService.chartConfig$.subscribe((config) => {
        /**
         * if there is a component config, then use the provided component config.  (e.g. ATMs page, FY23 page, FY24 page,)
         * otherwise use the config provided by the chartService
         */
        if (!this.componentConfig) {
          this._chartConfig = config;
        } else {
          this._chartConfig = this.componentConfig;
        }
        this._updateChartDataAndOptions();
      }),
      this._screenService.screenDimensions$.subscribe((change) => { this._updateChartDataAndOptions(); }),
      this._screenService.isDarkMode$.subscribe((change) => { this._updateChartDataAndOptions(); })
    ];
    this._isLoaded = true;

  }

  private _subscriptions: Subscription[] = [];
  ngOnDestroy(): void { this._subscriptions.forEach(s => s.unsubscribe()); }
  ngAfterViewInit(): void { }

  private _updateChartDataAndOptions() {
    this.barChartOptions = this._setChartOptions();
    this.barChartData = this._updateDatasets();
  }

  private _xAxisLabels: string[] = [];
  public get xAxisLabels(): string[] { return this._xAxisLabels; }

  private _updateDatasets(dataEntryCount = 99): ChartConfiguration<'bar'>['data'] {

    this.showCustomLegend = false;
    let results: EarningsResult[] = [];

    if (this.chartPeriod === 'ANNUAL') {
      results = this._financeService.annualResults.filter(r => r.fiscalYear >= this.chartStartYear && r.fiscalYear <= this.chartEndYear)
      dataEntryCount = results.length;
    } else if (this.chartPeriod === 'QUARTER') {
      results = this._financeService.quarterlyResults.filter(r => r.fiscalYear >= this.chartStartYear && r.fiscalYear <= this.chartEndYear)
      dataEntryCount = results.length;
    }

    const chartLegendSettings = setEarningsChartLegend(this.chartSelectedProperty, this.chartPeriod);
    this.customLegendItems = chartLegendSettings.customLegendItems;
    this.showCustomLegend = chartLegendSettings.showCustomLegend;
    if (this._screenService.isMobile) {
      // dataEntryCount = EarningsDatasetBuilder.mobileItemCount;
    } else {
      // dataEntryCount = this._screenService.screenWidth
    }
    this._xAxisLabels = results.map(r => r.reportingPeriod + ' ' + String(r.fiscalYear).substring(2)).reverse().slice(-dataEntryCount);
    const datasets = this._datasetBuilder.updateDatasets(results, this.chartSelectedProperty, this.chartPeriod, dataEntryCount);
    const labels = this._datasetBuilder.getSubsetArray(dataEntryCount, this._xAxisLabels);
    return {
      labels: labels,
      datasets: datasets,
    };
  }


  private _setChartOptions(): ChartOptions<'bar'> {

    const tickScale: 1 | 100 | 1000 | 1000000 | 1000000000 = this._datasetBuilder.getTickScale(this.chartSelectedProperty, this.chartPeriod);
    let tickLabel = tickScale === 1000000 ? 'million' : 'billion';
    if (tickScale === 1) {
      tickLabel = '';
    }
    const minY = this._datasetBuilder.getMinY(this.chartSelectedProperty, this.chartPeriod);
    let maxY = undefined;

    if (this.chartSelectedProperty === EarningsChartPropertySelection.STOCKHOLDERS_EQUITY) {
      maxY = 6000000000
    }
    const isRevenueTypePercent = this.chartSelectedProperty === EarningsChartPropertySelection.REVENUE_TYPE_PERCENTAGE;
    const isNetProfitMarginPercent = this.chartSelectedProperty === EarningsChartPropertySelection.NET_PROFIT_MARGIN;

    const tooltipCallbacks = {
      label: (context: TooltipItem<"bar">) => { return this._labelContext(context) },
      footer: (context: TooltipItem<"bar">[]) => { return this._footerContext(context) },
      title: (context: TooltipItem<"bar">[]) => { return this._titleContext(context) }
    };

    let color = 'rgba(0,0,0,0.1)';
    const darkMode = this.isDarkMode;
    if (darkMode) {
      color = 'rgba(255,255,255,0.15)';
    }

    let chartOptions: ChartOptions<'bar'> = {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      scales: {
        y: {
          min: minY,
          max: maxY,
          grid: {
            color: function (context) {
              // if (context.tick.value === 0) {
              //   if(darkMode){
              //     return 'rgba(255,255,255,0.2)';
              //   }else{
              //     return 'rgba(0,0,0,0.2)';
              //   }
              // }
              return color;
            },
          },
          ticks: {
            backdropColor: 'black',
            // Include a dollar sign in the ticks
            callback: function (value, index, ticks) {
              if (isRevenueTypePercent || isNetProfitMarginPercent) {
                return Number(value) + "%";
              } else {
                const numVal = Number(value);
                if (tickScale === 1) {
                  // e.g. in case of EPS, BVPS
                  if (numVal >= 0) {
                    if (numVal === 0) {
                      return '$0'
                    } else {
                      return '$' + (numVal / 100) + '.00 ';
                    }
                  } else {
                    return '$' + (numVal / 100) + '.00 ';
                  }
                } else {
                  if (numVal >= 0) {
                    if (numVal === 0) {
                      return '$0'
                    } else {
                      return '$' + (numVal / tickScale) + ' ' + tickLabel;
                    }
                  } else {
                    return '$' + (numVal / tickScale) + ' ' + tickLabel;
                  }
                }

              }

            }
          }
        },
        x: {
          grid: {
            color: function (context) {
              return color;
            },
          }
        }
      },
      layout: {
        padding: {
          right: 10
        }
      },
      plugins: {
        datalabels: {
        },
        legend: {
          onClick: (event, array) => {
          },
          position: 'top',
          labels: {
            padding: 20,
            boxWidth: 12,
            boxHeight: 12,
          },
          display: false,
        },
        tooltip: {
          callbacks: tooltipCallbacks
        },
      },
    }
    if (this.chartSelectedProperty === EarningsChartPropertySelection.REVENUE_VS_STORES) {
      chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        scales: {
          x: {
            grid: {
              color: function (context) {
                return color;
              },
            }
          },
          y: {
            min: minY,
            title: {
              display: true,
              text: "Revenue",
            },
            grid: {
              color: function (context) {
                // if (context.tick.value === 0) {
                //   if(darkMode){
                //     return 'rgba(255,255,255,0.2)';
                //   }else{
                //     return 'rgba(0,0,0,0.2)';
                //   }
                // }
                return color;
              },
            },
            ticks: {
              backdropColor: 'black',
              // Include a dollar sign in the ticks
              callback: function (value, index, ticks) {
                const numVal = Number(value);
                if (numVal >= 0) {
                  if (numVal === 0) {
                    return '$0'
                  } else {
                    return '$' + (numVal / tickScale) + ' ' + tickLabel;
                  }
                } else {
                  return '$' + (numVal / tickScale) + ' ' + tickLabel;
                }
              }
            }
          },
          y2: {
            min: minY,
            type: "linear",
            position: "right",
            beginAtZero: true,
            grid: {
              drawOnChartArea: false, // Prevents overlapping grid lines
            },
            title: {
              display: true,
              text: "Store count",
            },
          }
        },
        layout: {
          padding: {
            right: 10
          }
        },
        plugins: {
          datalabels: {
          },
          legend: {
            onClick: (event, array) => {
            },
            position: 'top',
            labels: {
              padding: 20,
              boxWidth: 12,
              boxHeight: 12,
            },
            display: false,
          },
          tooltip: {
            callbacks: tooltipCallbacks
          },
        },

      }
    }
    return chartOptions;
  }

  private _labelContext(context: TooltipItem<"bar">): string {
    return earningsChartLabelContext(context, this.chartSelectedProperty);
  }
  private _footerContext(context: TooltipItem<"bar">[]): string {
    const item = context[0];
    return '';
  }
  private _titleContext(context: TooltipItem<"bar">[]): string {
    return this._xAxisLabels[context[0].dataIndex];
  }


}
