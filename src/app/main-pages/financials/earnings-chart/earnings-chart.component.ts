import { Component, ViewChild } from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, ChartConfiguration, ChartOptions, Legend, LinearScale, Tooltip, TooltipItem } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ScreenService } from '../../../shared/services/screen-size.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-earnings-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './earnings-chart.component.html',
  styleUrl: './earnings-chart.component.scss'
})
export class EarningsChartComponent {
  constructor(private _sizeService: ScreenService) {

    // Chart.unregister(ChartDataLabels);
    // Chart.register(PieController, ArcElement, Tooltip, Legend);
    // this._ownershipData = new OwnershipData();
    // this.pieChartOptions = this._setPieChartOptions();
    // this.pieChartData = this.ownershipData.chartData;
    Chart.unregister(ChartDataLabels);
    Chart.register(ChartDataLabels, LinearScale, BarController, CategoryScale, BarElement, Tooltip, Legend)
    this.barChartData = this._setData();
    this.barChartOptions = this._setOptions();

  }

  public barChartData: ChartConfiguration<'bar'>['data'];
  public barChartOptions: ChartOptions<'bar'>;
  public barChartLegend = false;

  ngOnInit(): void {


  }

  ngAfterViewInit(): void {
    this._sizeService.screenDimensions$.subscribe((change) => {
      this.barChartData = this._setData();
      this.barChartOptions = this._setOptions();
    });
  }

  private _xAxisLabels: string[] = [
    'FY 05', 'FY 06', 'FY 07', 'FY 08', 'FY 09', 'FY 10',
    'FY 11', 'FY 12', 'FY 13', 'FY 14', 'FY 15', 'FY 16',
    'FY 17', 'FY 18', 'FY 19', 'FY 20', 'FY 21', 'FY 22',
    'FY 23',
  ];
  private _revenueItemsColors: string[] = [
    'rgba(3, 90, 252, 0.9)', 'rgba(3, 90, 252, 0.9)', 'rgba(3, 90, 252, 0.9)', 'rgba(3, 90, 252, 0.9)', 'rgba(3, 90, 252, 0.9)', 'rgba(3, 90, 252, 0.9)',
    'rgba(3, 90, 252, 0.9)', 'rgba(3, 90, 252, 0.9)', 'rgba(3, 90, 252, 0.9)', 'rgba(3, 90, 252, 0.9)', 'rgba(3, 90, 252, 0.9)', 'rgba(3, 90, 252, 0.9)',
    'rgba(3, 90, 252, 0.9)', 'rgba(3, 90, 252, 0.9)', 'rgba(3, 90, 252, 0.9)', 'rgba(3, 90, 252, 0.9)', 'rgba(3, 90, 252, 0.9)', 'rgba(3, 90, 252, 0.9)',
    'rgba(3, 90, 252, 0.9)',
  ];
  private _revenueItemsData: number[] = [
    3091783000, 5318900000, 7094000000, 8805900000, 9078000000, 9473700000,
    9550500000, 8886700000, 9039500000, 9296000000, 9363800000, 8607900000,
    9224600000, 8285300000, 6466000000, 5089800000, 6010700000, 5927200000,
    5272800000,
  ];
  private _earningsItemData: number[] = [
    100784000, 158300000, 288300000, 398300000, 377300000, 408000000,
    339900000, -269700000, 354200000, 393100000, 402800000, 353200000,
    34700000, -673000000, -470900000, -215300000, -381300000, -313100000,
    6700000,
  ];
  private _earningsItemsColors: string[] = [
    'rgba(0, 145, 10, 0.9)', 'rgba(0, 145, 10, 0.9)', 'rgba(0, 145, 10, 0.9)', 'rgba(0, 145, 10, 0.9)', 'rgba(0, 145, 10, 0.9)', 'rgba(0, 145, 10, 0.9)',
    'rgba(0, 145, 10, 0.9)', 'rgba(227, 0, 0, 0.9)', 'rgba(0, 145, 10, 0.9)', 'rgba(0, 145, 10, 0.9)', 'rgba(0, 145, 10, 0.9)', 'rgba(0, 145, 10, 0.9)',
    'rgba(0, 145, 10, 0.9)', 'rgba(227, 0, 0, 0.9)', 'rgba(227, 0, 0, 0.9)', 'rgba(227, 0, 0, 0.9)', 'rgba(227, 0, 0, 0.9)', 'rgba(227, 0, 0, 0.9)',
    'rgba(0, 145, 10, 0.9)',
  ];

  public get revenueItemsColors(): string[] { return this._revenueItemsColors; }
  public get xAxisLabels(): string[] { return this._xAxisLabels; }
  public get earningsItemsData(): number[] { return this._earningsItemData; }
  public get revenueItemsData(): number[] { return this._revenueItemsData; }
  public get earningsItemsColors(): string[] { return this._earningsItemsColors; }


  private _setData(dataEntryCount = 19): ChartConfiguration<'bar'>['data'] {
    /**
     * 
     * Total of 19 items from FY05 to FY23 inclusive
     * 
     */
    const width = this._sizeService.screenWidth;
    console.log("WIDTH", width)
    return {
      labels: this._getSubsetArray(width, dataEntryCount, this.xAxisLabels),
      datasets: [
        {
          label: 'Revenue (in $ billions)',
          datalabels: {
            color: 'rgba(0,0,200,0.9)',
            listeners: {
              enter() {

              }
            },

            display(context) {
              if (context.dataIndex === context.dataset.data.length - 1) {
                return true;
              }
              // if (width < 800) {

              //   return false;
              // }
              return true;
            },
            align: 'top',
            anchor: 'end',
            backgroundColor: 'white',
            borderRadius: 5,


            borderColor: function (context) {
              return 'rgba(0,0,255,0.1)';
            },
            borderWidth: 1,
            formatter: function (value, context) {
              return '$' + (value / 1000000000).toFixed(1);
            },
            font: {
              weight: 'bold',
            },
            padding: 2,

          },
          backgroundColor: this._getSubsetArray(width, dataEntryCount, this.revenueItemsColors),
          data: this._getSubsetArray(width, dataEntryCount, this.revenueItemsData),
        },
        {
          label: 'Net Earnings (in $ millions)',
          datalabels: {
            // color: '#000',
            listeners: {
              enter: function (context: any, event) {
              },
            },
            display(context) {
              if (context.dataIndex === context.dataset.data.length - 1) {
                return true;
              }
              // if (width < 800) {

              //   return false;
              // }
              return true;
            },
            // align: 'top',
            align(context) {
              const value = Number(context.dataset.data[context.dataIndex]);
              if (value > 0) {
                return 'top';
              } else if (value < 0) {
                return 'bottom';
              }
              return 'top';
            },
            anchor(context) {
              const value = Number(context.dataset.data[context.dataIndex]);
              if (value > 0) {
                return 'end';
              } else if (value < 0) {
                return 'start';
              }
              return 'end';
            },
            backgroundColor: 'rgba(255,255,255,0.7)',
            borderRadius: 5,
            borderColor: function (context) {
              return 'rgba(0,0,255,0.1)';
            },
            borderWidth: 1,
            formatter: function (value, context) {
              return '$' + (value / 1000000).toFixed(0);
            },
            // font: {
            //   weight: 'bold',
            //   size: 12,
            // },
            font: function (context) {
              const value = Number(context.dataset.data[context.dataIndex]);
              let fontSize = 12;
              if (context.dataIndex === 18) {
                return {
                  weight: 'bold',
                  size: 16,
                };
              } else {
                fontSize = 12;
                // if (width < 1400 && width > 800) {
                //   fontSize = 10;
                // }
                // if (width < 800) {
                //   fontSize = 8;
                // }
              }
              return {
                weight: 'bold',
                size: fontSize,
              };
            },
            color: function (context) {
              const value = Number(context.dataset.data[context.dataIndex]);
              if (value > 0) {
                return 'green';
              } else if (value < 0) {
                return 'red';
              } else {
                return 'black';
              }

            },
            padding: 2,

          },
          backgroundColor: this._getSubsetArray(width, dataEntryCount, this.earningsItemsColors),
          data: this._getSubsetArray(width, dataEntryCount, this.earningsItemsData),
        },
        // {
        //   label: 'Net Loss (in $ millions)',
        //   datalabels: {},
        //   data: [],
        //   backgroundColor: [
        //     'rgba(255, 0, 0, 0.9)',
        //   ],
        // },
      ]
    };
  }

  private _getSubsetArray(screenWidth: number, dataEntryCount: number, sourceArray: any[]): any[] {
    if (dataEntryCount <= sourceArray.length) {
      let itemCount = dataEntryCount;
      if (screenWidth < 800) {
        const difference = 800 - screenWidth;
        itemCount = dataEntryCount - (Math.floor(difference / 30));
      }
      if(screenWidth < 480){
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


  private _setOptions(): ChartOptions<'bar'> {
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      scales: {
        y: {
          min: -1000000000,
          grid: {
            color: function (context) {
              if (context.tick.value === 0) {
                return 'rgba(0,0,0,0.5)';
              }
              return 'rgba(0,0,0,0.05)';
            },
          },
          ticks: {
            backdropColor: 'purple',
            // Include a dollar sign in the ticks
            callback: function (value, index, ticks) {
              const numVal = Number(value);
              if (numVal >= 0) {
                if (numVal === 0) {
                  return '$0'
                } else {
                  return '$' + (numVal / 1000000000) + ' billion';
                }

              } else {
                return '$' + (numVal / 1000000000) + ' billion';
              }
            }
          }
        },

      },

      layout: {

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
          // backgroundColor: (context) => {
          //   if (context.tooltipItems.length > 0) {
          //     this._getTooltipBackgroundColor(context.tooltipItems[0])
          //   }
          //   return this._tooltipBackgroundColor;
          // },
          // borderColor: 'black',
          // borderWidth: 1,
          // // displayColors: false,
          // bodyFont: {
          //   size: 16,
          //   weight: 'bold',
          // },
          // titleFont: {
          //   weight: 'normal',
          // },
          // footerFont: {
          //   weight: 'normal',
          // },

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
    if (context.datasetIndex === 0) {
      // revenue
      return "Top line (revenue):  $" + this.numberWithCommas(Number(context.raw));
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
    // const percent = Math.round((item.parsed/this.tso)*100);
    // return percent + "%, " + String(Math.round(item.parsed/1000000)) + " million shares";
    // return 'Bottom line / Net income';
    return '';
  }
  private _titleContext(context: TooltipItem<"bar">[]): string {
    return this.xAxisLabels[context[0].dataIndex];
    // return "Revenue:  $"+ this.numberWithCommas(Number(context[0].raw));
  }

  numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
