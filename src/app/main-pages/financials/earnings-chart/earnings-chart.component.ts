import { Component } from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, ChartConfiguration, ChartDataset, ChartOptions, Legend, LinearScale, Tooltip, TooltipItem } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ScreenService } from '../../../shared/services/screen-size.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FinancialChartService } from '../choose-earnings-chart/earnings-chart.service';
import { EarningsResult } from '../earnings-results/earnings-result.class';
import { Import10KDataService } from '../../../shared/services/import-10k-data.service';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../shared/services/loading.service';
import { EarningsChartOption } from '../choose-earnings-chart/earnings-chart-option.enum';
import { EarningsDatasetBuilder } from './earnings-datasets.class';

@Component({
  selector: 'app-earnings-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './earnings-chart.component.html',
  styleUrl: './earnings-chart.component.scss'
})
export class EarningsChartComponent {

  private _datasetBuilder: EarningsDatasetBuilder;
  constructor(private _sizeService: ScreenService, private _chartService: FinancialChartService, private _financeService: Import10KDataService, private _loadingService: LoadingService) {
    Chart.unregister(ChartDataLabels);
    Chart.register(ChartDataLabels, LinearScale, BarController, CategoryScale, BarElement, Tooltip, Legend);
    this._datasetBuilder = new EarningsDatasetBuilder(this._sizeService);
    this.barChartOptions = this._setOptions();
    this.barChartData = this._updateDatasets();

  }

  public barChartData: ChartConfiguration<'bar'>['data'];
  public barChartOptions: ChartOptions<'bar'>;
  public barChartLegend = false;
  public showCustomLegend: boolean = true;

  private _isLoaded: boolean = false;
  public get isLoaded(): boolean { return this._isLoaded; }

  public get chartPeriod(): 'ANNUAL' | 'QUARTER' | 'QOVERQ' { return this._chartService.chartPeriod; }
  public get chartOption(): EarningsChartOption { return this._chartService.chartOption; }

  async ngOnInit() {
    await this._loadingService.loadEarnings();
    this._updateChartDataAndOptions();
    this._isLoaded = true;
  }

  ngAfterViewInit(): void {
    this._chartService.chartOption$.subscribe(() => { this._updateChartDataAndOptions(); })
    this._chartService.chartPeriod$.subscribe(() => { this._updateChartDataAndOptions(); })
    this._sizeService.screenDimensions$.subscribe((change) => { this._updateChartDataAndOptions(); });
  }

  private _updateChartDataAndOptions() {
    this.barChartOptions = this._setOptions();
    this.barChartData = this._updateDatasets();
  }

  private _xAxisLabels: string[] = [];
  public get xAxisLabels(): string[] { return this._xAxisLabels; }

  private _updateDatasets(dataEntryCount = 19): ChartConfiguration<'bar'>['data'] {
    /**   Total of 19 items from FY05 to FY23 inclusive    */
    this.showCustomLegend = false;
    let results: EarningsResult[] = this._financeService.annualResults;
    if (this.chartPeriod === 'ANNUAL') {
      results = this._financeService.annualResults;
    } else if (this.chartPeriod === 'QUARTER') {
      results = this._financeService.quarterlyResults;
    }
    this._xAxisLabels = results.map(r => r.reportingPeriod + ' ' + String(r.fiscalYear).substring(2)).reverse().slice(-dataEntryCount);

    if (this.chartOption === EarningsChartOption.REVENUE_VS_NET_INCOME) {
      this.showCustomLegend = true;
      // label = 'Revenue and Net Income ' + periodLabel;
    }

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

    const tickScale: 1000000 | 1000000000 = this._datasetBuilder.getTickScale(this.chartOption, this.chartPeriod);
    const tickLabel = tickScale === 1000000 ? 'million' : 'billion';
    const minY = this._datasetBuilder.getMinY(this.chartOption, this.chartPeriod);
    return {
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
