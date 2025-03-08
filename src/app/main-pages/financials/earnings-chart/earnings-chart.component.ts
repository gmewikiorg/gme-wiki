import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, ChartConfiguration, ChartDataset, ChartOptions, Legend, LinearScale, Tooltip, TooltipItem } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ScreenService } from '../../../shared/services/screen-size.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FinancialChartService } from '../choose-earnings-chart/earnings-chart.service';
import { EarningsResult } from '../../../shared/services/earnings-results/earnings-result.class';
import { Import10KDataService } from '../../../shared/services/earnings-results/import-10k-data.service';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../shared/services/loading.service';
import { EarningsChartOption } from '../choose-earnings-chart/earnings-chart-option.enum';
import { EarningsDatasetBuilder } from './earnings-datasets.class';
import { Subscription } from 'rxjs';

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
    this.barChartOptions = this._setOptions();
    this.barChartData = this._updateDatasets();

  }


  @Input() isFY23Earnings: boolean = false;
  @Input() componentConfig: { article: 'FY24', chart: EarningsChartOption, } | null = null;


  public barChartData: ChartConfiguration<'bar'>['data'];
  public barChartOptions: ChartOptions<'bar'>;
  public barChartLegend = false;
  public showCustomLegend: boolean = true;

  private _isLoaded: boolean = false;
  public get isLoaded(): boolean { return this._isLoaded; }

  private _chartPeriod: 'ANNUAL' | 'QUARTER' | 'QOVERQ' = 'ANNUAL';
  private _chartOption: EarningsChartOption = EarningsChartOption.REVENUE_VS_NET_INCOME;

  public get chartPeriod(): 'ANNUAL' | 'QUARTER' | 'QOVERQ' { return this._chartPeriod; }
  public get chartOption(): EarningsChartOption { return this._chartOption; }

  async ngOnInit() {
    // await this._loadingService.loadEarnings();
    this._setComponentConfig();
    this._updateChartDataAndOptions();
    this._isLoaded = true;
  }

  private _setComponentConfig() {
    if (this.isFY23Earnings) {
      this._chartService.setChartPeriod('ANNUAL');
      this._chartService.setChartOption(EarningsChartOption.REVENUE_VS_NET_INCOME);
    }
    if (this.componentConfig) {
      // E.G. in /FY24 component
      if (this.componentConfig.article === 'FY24') {
        this._chartPeriod = 'ANNUAL';
        this._chartOption = this.componentConfig.chart;
      }
    }
  }

  private _subscriptions: Subscription[] = [];
  ngOnDestroy(): void {
    this._subscriptions.forEach(s => s.unsubscribe())
    this.componentConfig = null;
    this.isFY23Earnings = false;
  }

  ngAfterViewInit(): void {

    /**
     * if there is a component config, then use the settings within this .ts component file, 
     * and therefore, do not update when the option or period changes
     * otherwise make use of the earnings chart service (for the /earnings page)
     */
    this._subscriptions = [
      this._chartService.chartOption$.subscribe((chartOption) => {
        if (!this.componentConfig) {
          this._chartOption = chartOption;
          this._updateChartDataAndOptions();
        }
      }),
      this._chartService.chartPeriod$.subscribe((chartPeriod) => {
        if (!this.componentConfig) {
          this._chartPeriod = chartPeriod;
          this._updateChartDataAndOptions();
        }
      }),
      this._screenService.screenDimensions$.subscribe((change) => { this._updateChartDataAndOptions(); }),
    ];

  }

  private _updateChartDataAndOptions() {
    this.barChartOptions = this._setOptions();
    this.barChartData = this._updateDatasets();
  }

  private _xAxisLabels: string[] = [];
  public get xAxisLabels(): string[] { return this._xAxisLabels; }

  private _updateDatasets(dataEntryCount = 20): ChartConfiguration<'bar'>['data'] {
    /**   Total of 19 items from FY05 to FY23 inclusive    */

    this.showCustomLegend = false;
    let results: EarningsResult[] = this._financeService.annualResults;

    if (this.isFY23Earnings) {
      dataEntryCount = 15;
    }else if (this.componentConfig) {
      if (this.componentConfig.article === 'FY24') {
        dataEntryCount = 15;

        if (this.componentConfig.chart === 'STORES_VS_REVENUE') {
          dataEntryCount = 10;
        }


      }
    } else{

    }
    
    if (this.chartPeriod === 'ANNUAL') {
      results = this._financeService.annualResults;
      if (this.isFY23Earnings) {
        results = results.filter(item => item.fiscalYear <= 2023);
      }else if (this.componentConfig) {
        if (this.componentConfig.article === 'FY24') {
          results = results.filter(item => item.fiscalYear <= 2024);
        }
      }else {
          /** This line is here until FY 2024 results are released.
       * This omits the false 2024 data / 2024 esimate data, while allowing /fy24 article to work 
        */
          results = results.filter(item => item.fiscalYear < 2024);
      }
      // this._xAxisLabels = results.map(r => r.reportingPeriod + ' ' + String(r.fiscalYear).substring(2)).reverse().slice(-dataEntryCount);
    } else if (this.chartPeriod === 'QUARTER') {
      results = this._financeService.quarterlyResults;
      // this._xAxisLabels = results.map(r => r.reportingPeriod + ' ' + String(r.fiscalYear).substring(2)).reverse().slice(-dataEntryCount);
    }


    if (this.chartOption === EarningsChartOption.REVENUE_VS_NET_INCOME) {
      this.showCustomLegend = true;
      // label = 'Revenue and Net Income ' + periodLabel;
    }

    if (this._screenService.isMobile) {
      dataEntryCount = EarningsDatasetBuilder.mobileItemCount;
    }




    this._xAxisLabels = results.map(r => r.reportingPeriod + ' ' + String(r.fiscalYear).substring(2)).reverse().slice(-dataEntryCount);
    const datasets = this._datasetBuilder.updateDatasets(results, this.chartOption, this.chartPeriod, dataEntryCount);
    const chartTitle = this._datasetBuilder.chartTitle(this.chartOption, this.chartPeriod);
    const labels = this._datasetBuilder.getSubsetArray(dataEntryCount, this._xAxisLabels);
    this._chartService.setChartTitle(chartTitle);

    return {
      labels: labels,
      datasets: datasets,
    };
  }


  private _setOptions(): ChartOptions<'bar'> {

    const tickScale: 1000 | 1000000 | 1000000000 = this._datasetBuilder.getTickScale(this.chartOption, this.chartPeriod);
    const tickLabel = tickScale === 1000000 ? 'million' : 'billion';
    const minY = this._datasetBuilder.getMinY(this.chartOption, this.chartPeriod);

    if (this.chartOption === EarningsChartOption.REVENUE_VS_STORES) {
      this.barChartLegend = true;
    }

    let chartOptions: ChartOptions<'bar'> = {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      scales: {
        y: {
          min: minY,
          grid: {
            color: function (context) {
              if (context.tick.value === 0) {
                return 'rgba(0,0,0,0.5)';
              }
              return 'rgba(0,0,0,0.05)';
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
          callbacks: {
            label: (context) => { return this._labelContext(context) },
            footer: (context) => { return this._footerContext(context) },
            title: (context) => { return this._titleContext(context) }
          },
        },
      },
    }
    if (this.chartOption === EarningsChartOption.REVENUE_VS_STORES) {
      chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        scales: {
          y: {
            min: minY,
            title: {
              display: true,
              text: "Revenue",
            },
            grid: {
              color: function (context) {
                if (context.tick.value === 0) {
                  return 'rgba(0,0,0,0.5)';
                }
                return 'rgba(0,0,0,0.05)';
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
            callbacks: {
              label: (context) => { return this._labelContext(context) },
              footer: (context) => { return this._footerContext(context) },
              title: (context) => { return this._titleContext(context) }
            },
          },
        },

      }
    }
    return chartOptions;
  }

  private _labelContext(context: TooltipItem<"bar">): string {
    const numValue = Number(context.raw);
    let label = '';
    if (this.chartOption === EarningsChartOption.REVENUE_VS_NET_INCOME) {
      if (context.datasetIndex === 0) {
        label = "Revenue:  $" + this.numberWithCommas(numValue);
      } else if (context.datasetIndex === 1) {
        label = "Net Income:  $" + this.numberWithCommas(numValue);
      }
    } else if (this.chartOption === EarningsChartOption.REVENUE_VS_COST) {
      if (context.datasetIndex === 0) {
        label = "Revenue:  $" + this.numberWithCommas(numValue);
      } else if (context.datasetIndex === 1) {
        label = "Cost of Sales:  $" + this.numberWithCommas(numValue);
      }
    } else if (this.chartOption === EarningsChartOption.REVENUE_VS_GROSS_PROFIT) {
      if (context.datasetIndex === 0) {
        label = "Revenue:  $" + this.numberWithCommas(numValue);
      } else if (context.datasetIndex === 1) {
        label = "Gross Profit:  $" + this.numberWithCommas(numValue);
      }
    } else if (this.chartOption === EarningsChartOption.REVENUE_VS_STORES) {
      if (context.datasetIndex === 0) {
        label = "Revenue:  $" + this.numberWithCommas(numValue);
      } else if (context.datasetIndex === 1) {
        label = "Stores:  " + this.numberWithCommas(numValue);
      }
    } else if (this.chartOption === EarningsChartOption.INTEREST_INCOME) {
      label = "Interest Income:  $" + this.numberWithCommas(numValue);
    } else if (this.chartOption === EarningsChartOption.STOCKHOLDERS_EQUITY) {
      label = "Stockholders' Equity:  $" + this.numberWithCommas(numValue);
    } else if (this.chartOption === EarningsChartOption.OPERATING_INCOME) {
      label = "Operating Income:  $" + this.numberWithCommas(numValue);
    } else if (this.chartOption === EarningsChartOption.GROSS_PROFIT_VS_SGA) {
      if (context.datasetIndex === 0) {
        label = "Gross Profit:  $" + this.numberWithCommas(numValue);
      } else if (context.datasetIndex === 1) {
        label = "SG&A Expense:  $" + this.numberWithCommas(numValue);
      }
    } else if (this.chartOption === EarningsChartOption.OPERATIONS_VS_SGA) {
      if (context.datasetIndex === 0) {
        label = "Operating Income:  $" + this.numberWithCommas(numValue);
      } else if (context.datasetIndex === 1) {
        label = "SG&A Expense:  $" + this.numberWithCommas(numValue);
      }
    }
    return label;
  }
  private _footerContext(context: TooltipItem<"bar">[]): string {
    const item = context[0];
    return '';
  }
  private _titleContext(context: TooltipItem<"bar">[]): string {
    return this._xAxisLabels[context[0].dataIndex];
  }

  numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
