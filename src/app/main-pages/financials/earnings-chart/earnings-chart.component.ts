import { Component } from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, ChartConfiguration, ChartDataset, ChartOptions, Legend, LinearScale, Tooltip, TooltipItem } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ScreenService } from '../../../shared/services/screen-size.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FinancialChartService } from '../choose-chart/financial-chart.service';
import { EarningsResult } from '../earnings-results/earnings-result.class';
import { Import10KDataService } from '../../../shared/services/import-10k-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-earnings-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './earnings-chart.component.html',
  styleUrl: './earnings-chart.component.scss'
})
export class EarningsChartComponent {
  constructor(private _sizeService: ScreenService, private _chartService: FinancialChartService, private _financeService: Import10KDataService) {
    Chart.unregister(ChartDataLabels);
    Chart.register(ChartDataLabels, LinearScale, BarController, CategoryScale, BarElement, Tooltip, Legend)
    this.barChartData = this._updateDatasets();
    this.barChartOptions = this._setOptions();
  }

  public barChartData: ChartConfiguration<'bar'>['data'];
  public barChartOptions: ChartOptions<'bar'>;
  public barChartLegend = false;
  public showCustomLegend: boolean = true;

  public get chartPeriod(): 'ANNUAL' | 'QUARTER' | 'QOVERQ' { return this._chartService.chartPeriod; }
  public get chartOption(): 'REVENUE' | 'PROFIT' | 'OPERATIONS' | 'SGA' | 'INTEREST' | 'EQUITY' { return this._chartService.chartOption; }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this._sizeService.screenDimensions$.subscribe((change) => { this._updateChartDataAndOptions(); });
    this._chartService.chartOption$.subscribe(() => { this._updateChartDataAndOptions(); })
    this._chartService.chartPeriod$.subscribe(() => { this._updateChartDataAndOptions(); })
  }

  private _updateChartDataAndOptions() {
    this.barChartOptions = this._setOptions();
    this.barChartData = this._updateDatasets();
  }


  /** Builds a single dataset.  e.g. all Revenue numbers, or all Interest income numbers, etc. */
  private _buildDataset(label: string, dataEntryCount: number, dataItems: number[]): ChartDataset<"bar", (any)[]> {
    const datasetColors = this._getDatasetColors(dataEntryCount, dataItems);
    const dataLabelColors = datasetColors.map(color => this._setNewAlpha(color, 0.9));
    let tickScale = this._tickScale;
    if(label === 'Net income'){
      tickScale = 1000000;
    }
    return {
      label: label,
      datalabels: {
        color: function (context) {
          return dataLabelColors[context.dataIndex]
        },
        listeners: {
          enter() {

          }
        },
        display(context) {
          if (context.dataIndex === context.dataset.data.length - 1) {
            return true;
          }
          return true;
        },
        align: function (context) {
          let value = Number(context.dataset.data[context.dataIndex]);
          if(value > 0){
            return 'top';
          }else{
            return 'bottom';
          }
          return 'bottom';
        },
        anchor: function (context) {
          let value = Number(context.dataset.data[context.dataIndex]);
          if(value > 0){
            return 'end';
          }else{
            return 'start';
          }
          return 'start';
        },
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: function (context) {
          return 'rgba(0,0,255,0.1)';
        },
        borderWidth: 1,
        formatter: function (value, context) {
          if (tickScale === 1000000000) {
            return '$' + (value / tickScale).toFixed(1) + " B";
          } else {
            return '$' + (value / tickScale).toFixed(0) + " M";
          }
        },
        font: {
          weight: 'bold',
        },
        padding: 2,
      },
      backgroundColor: this._getSubsetArray(dataEntryCount, datasetColors),
      data: this._getSubsetArray(dataEntryCount, dataItems),
      borderRadius: 5,
    }
  }

  private _getDatasetColors(dataEntryCount: number, dataItems: number[]): string[] {
    let colors: string[] = [];
    const indexNegativeNumber = dataItems.findIndex(item => item < 0);
    if (indexNegativeNumber === -1) {
      // in this case there are no negative numbers
      // blue : rgb   3, 90, 252
      colors = dataItems.map(item => ('rgba(3, 90, 252,' + String(this._getAlpha(dataItems.indexOf(item), dataItems.length)) + ')'));
    } else {
      // in this case there are negative and positive numbers
      colors = dataItems.map(item => {
        // green: rgb   0, 145, 10
        // red:   rgb   227, 0, 0
        if (item >= 0) {
          return ('rgba(0, 145, 11,' + String(this._getAlpha(dataItems.indexOf(item), dataItems.length)) + ')');
        } else {
          return ('rgba(227, 0, 0,' + String(this._getAlpha(dataItems.indexOf(item), dataItems.length)) + ')');
        }
      });
    }
    return colors.slice(-dataEntryCount);
  }

  /** 
   * Gets an alpha value for rgba based on items position in array
   *  older items are more transparent (lower alpha), e.g. 2005.
   *  newer items are more opaque (higher alpha), e.g. 2023
   */
  private _getAlpha(index: number, totalCount: number) {
    if (totalCount <= 1) {
      return 1.0;
    }
    const minAlpha = 0.3;
    const maxAlpha = 1.0;
    const t = index / (totalCount - 1);
    return minAlpha + (maxAlpha - minAlpha) * t;
  }


  private _xAxisLabels: string[] = [];
  public get xAxisLabels(): string[] { return this._xAxisLabels; }

  private _updateDatasets(dataEntryCount = 19): ChartConfiguration<'bar'>['data'] {
    /**   Total of 19 items from FY05 to FY23 inclusive    */

    this.showCustomLegend = false;
    let results: EarningsResult[] = this._financeService.annualResults;

    let label: string = '';
    let periodLabel: string = '';

    if (this.chartPeriod === 'ANNUAL') {
      results = this._financeService.annualResults;
      periodLabel = 'by fiscal year';
    } else {
      if (this.chartPeriod === 'QUARTER') {
        results = this._financeService.quarterlyResults;
        periodLabel = 'by fiscal quarter';
      } else if (this.chartPeriod === 'QOVERQ') {
        const quarterOrder = {'Q1': 1, 'Q2': 2, 'Q3': 3, 'Q4': 4, 'FY': 5};
        results = Object.assign(this._financeService.quarterlyResults, []).filter(r => r.fiscalYear >= 2020).sort((r1, r2)=>{
          const quarterDiff = quarterOrder[r1.reportingPeriod] - quarterOrder[r2.reportingPeriod];
          if (quarterDiff !== 0) return quarterDiff;
          return r1.fiscalYear - r2.fiscalYear;
        })
        results = results.reverse();        
        periodLabel = 'quarter over quarter';
      }
    }
    this._xAxisLabels = results.map(r => r.reportingPeriod + ' ' + String(r.fiscalYear).substring(2)).reverse().slice(-dataEntryCount);

    let dataItems: number[] = results.map(r => r.revenue).reverse();
    const netIncomeDataItems: number[] = results.map(r => r.netEarnings).reverse();
    if (this.chartOption === 'REVENUE') {
      dataItems = results.map(r => r.revenue).reverse();
      this.showCustomLegend = true;
      label = 'Revenue and Net Income ' + periodLabel;
    } else if (this.chartOption === 'PROFIT') {
      dataItems = results.map(r => r.grossProfit).reverse();
      label = 'Gross Profit ' + periodLabel;
    } else if (this.chartOption === 'OPERATIONS') {
      dataItems = results.map(r => r.operatingGainLoss).reverse();
      label = 'Operating gains / losses ' + periodLabel;
    } else if (this.chartOption === 'SGA') {
      dataItems = results.map(r => r.sga).reverse();
      label = 'Selling, General, and Administrative Expenses (SG&A) ' + periodLabel;
    } else if (this.chartOption === 'INTEREST') {
      dataItems = results.map(r => r.interestIncome).reverse();
      label = 'Interest Income / Expense ' + periodLabel;
    } else if (this.chartOption === 'EQUITY') {
      dataItems = results.map(r => r.stockholdersEquity).reverse();
      label = "Stockholders' Equity " + periodLabel;
    }
    const dataset = this._buildDataset(label, dataEntryCount, dataItems);
    const netIncomeDataset = this._buildDataset('Net income', dataEntryCount, netIncomeDataItems);
    let datasets = [dataset];
    if (this.chartOption === 'REVENUE') {
      datasets = [dataset, netIncomeDataset];
    }
    this._chartService.setChartTitle(label);
    return {
      labels: this._getSubsetArray(dataEntryCount, this._xAxisLabels),
      datasets: datasets,
    };
  }

  private _tickScale = 1000000000;
  private _tickLabel = 'billion';
  private _setOptions(): ChartOptions<'bar'> {
    let minY = 0;
    if (this.chartOption === 'REVENUE') {
      minY = -1000000000;
      if (this.chartPeriod !== 'ANNUAL') {
        minY = -175000000;
      }
    } else if (this.chartOption === 'OPERATIONS') {
      minY = -800000000;
      this._tickScale = 1000000;
      this._tickLabel = 'million';
      if (this.chartPeriod !== 'ANNUAL') {
        minY = -175000000;
      }
    } else if (this.chartOption === 'INTEREST') {
      minY = -80000000;
      this._tickScale = 1000000;
      this._tickLabel = 'million';
      if (this.chartPeriod !== 'ANNUAL') {
        minY = -30000000;
      }
    } else if (this.chartOption === 'SGA') {
      if (this.chartPeriod !== 'ANNUAL') {
        this._tickScale = 1000000;
        this._tickLabel = 'million';
      }else{
        this._tickScale = 1000000000;
        this._tickLabel = 'billion';
      }
    } else if (this.chartOption === 'PROFIT') {
      if (this.chartPeriod !== 'ANNUAL') {
        this._tickScale = 1000000;
        this._tickLabel = 'million';
      }
    } else if(this.chartOption === 'EQUITY'){
      this._tickScale = 1000000000;
      this._tickLabel = 'billion';
    }
    const tickScale = this._tickScale;
    const tickLabel = this._tickLabel;
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


  private _getSubsetArray(dataEntryCount: number, sourceArray: any[]): any[] {
    const screenWidth = this._sizeService.screenWidth;
    if (dataEntryCount <= sourceArray.length) {
      let itemCount = dataEntryCount;
      if (screenWidth < 800) {
        const difference = 800 - screenWidth;
        itemCount = dataEntryCount - (Math.floor(difference / 30));
      }
      if (screenWidth < 480) {
        itemCount = 5;
      }
      const startIndex = sourceArray.length - itemCount;
      const endIndex = sourceArray.length;
      const subsetArray = sourceArray.slice(startIndex);
      return subsetArray;
    } else {
      return sourceArray;
    }
    return [];
  }

  private _labelContext(context: TooltipItem<"bar">): string {
    if (context.datasetIndex === 0) {
      let numValue = Number(context.raw);
      if (this.chartOption === 'REVENUE') {
        return "Top line (revenue):  $" + this.numberWithCommas(numValue);
      } else if (this.chartOption === 'EQUITY') {
        return "Stockholders' equity:  $" + this.numberWithCommas(numValue);
      } else if (this.chartOption === 'INTEREST') {
        if (numValue > 0) {
          return "Interest income:  $" + this.numberWithCommas(numValue);
        } else {
          return "Interest expense:  $" + this.numberWithCommas(numValue);
        }
      } else if (this.chartOption === 'OPERATIONS') {
        if (numValue > 0) {
          return "Operating earnings:  $" + this.numberWithCommas(numValue);
        } else {
          return "Operating losses:  $" + this.numberWithCommas(numValue);
        }
      } else if (this.chartOption === 'PROFIT') {
        return "Gross profit:  $" + this.numberWithCommas(numValue);
      } else if (this.chartOption === 'SGA') {
        return "SG&A:  $" + this.numberWithCommas(numValue);
      }

    } else if (context.datasetIndex === 1) {
      // net earnings
      const value = Number(context.raw);
      if (value >= 0) {
        return "Bottom line (net earnings):  $" + this.numberWithCommas(value);
      } else {
        return "Bottom line (net loss):  $" + this.numberWithCommas(value);
      }
    }
    return '';

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

  private _setNewAlpha(rgbaString: string, newAlpha: number): string {
    // This regex will match both rgb(...) and rgba(...).
    // Capturing groups:
    //   1 => red
    //   2 => green
    //   3 => blue
    //   4 => alpha (if present)
    const regex = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/;

    const match = rgbaString.trim().match(regex);
    if (!match) {
      throw new Error('Invalid RGBA or RGB color string.');
    }

    // Destructure the captured groups.
    // "existingAlpha" may be undefined if it's just "rgb(...)".
    const [, r, g, b, existingAlpha] = match;

    // Return a proper "rgba(...)" string with the updated alpha.
    return `rgba(${r}, ${g}, ${b}, ${newAlpha})`;
  }
}
