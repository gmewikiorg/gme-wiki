import { Component } from '@angular/core';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { BarController, BarElement, CategoryScale, Chart, ChartConfiguration, ChartOptions, Legend, LinearScale, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-stores-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './stores-chart.component.html',
  styleUrl: './stores-chart.component.scss'
})
export class StoresChartComponent {
  constructor(private _sizeService: ScreenService) {
    Chart.unregister(ChartDataLabels);
    Chart.register(ChartDataLabels, LinearScale, BarController, CategoryScale, BarElement, Tooltip, Legend)
    this.barChartData = this._setData();
    this.barChartOptions = this._setOptions();
  }

  public barChartData: ChartConfiguration<'bar'>['data'];
  public barChartOptions: ChartOptions<'bar'>;
  public barChartLegend = false;

  public get isMobile(): boolean { return this._sizeService.isMobile; }
  private _isPercentage: boolean = false;

  ngAfterViewInit(): void {
    this._sizeService.screenDimensions$.subscribe((change) => {
      this.barChartData = this._setData();
      this.barChartOptions = this._setOptions();

    });
  }


  private _dataLabels: string[] = [
    '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014',
    '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023',
  ];

  private _data_allStoreCounts: number[] = [
    4490, 4778, 5264, 6207, 6450, 6670, 6683, 6602, 6675, 6690,
    7117, 7535, 7276, 5830, 5509, 4816, 4573, 4413, 4169,
  ];

  private _data_usaTechBrands: number[] = [
    0, 0, 0, 0, 0, 0, 0, 0, 218, 484, 1036, 1522, 1377, 0, 0, 0, 0, 0, 0,
  ];
  private _data_usaVideoGameBrands: number[] = [
    3624, 3799, 4061, 4331, 4429, 4536, 4503, 4425, 4249, 4138, 4013, 3944, 3864, 3846, 3642, 3192, 3018, 2949, 2915
  ];

  private _data_international: number[] = [
    866, 979, 1203, 1876, 2021, 2134, 2180, 2177, 2208, 2068, 2068, 2069, 2035, 1984, 1867, 1624, 1555, 1464, 1254,
  ];


  private _setData(): ChartConfiguration<'bar'>['data'] {
    const width = this._sizeService.screenWidth;
    const isMobile = this.isMobile;
    // const isMobile = false;
    // this._isMobile = false;
    const isPercentage = this._isPercentage;

    let allStores = this._data_allStoreCounts;
    let labels = this._dataLabels;



    const barChartData: ChartConfiguration<'bar'>['data'] = {
      labels: labels,
      datasets: [
        {
          label: 'All international stores',
          data: this._data_international,
          datalabels: {
            color: 'rgba(143, 23, 149, 1.0)',
            listeners: {
              enter() {

              }
            },
            align: 'top',
            anchor: 'end',
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderRadius: 5,
            // display(context) {
            //   if (context.dataIndex === 0) {
            //     return false;
            //   }
            //   if (context.dataIndex === context.dataset.data.length - 1) {
            //     return true;
            //   }
            //   if (width < 800 && !isMobile) {

            //     return false;
            //   }
            //   return true;
            // },
            display: false,

            borderColor: function (context) {
              return 'rgba(0,0,255,0.1)';
            },
            borderWidth: 1,
            // formatter: function (value, context) {
            //   if (isPercentage) {
            //     return (value).toFixed(1) + ' %';
            //   } else {
            //     return (value / 1000000).toFixed(1) + ' M';
            //   }

            // },
            font: {
              weight: 'bold',
            },
            padding: 2,

          },
          backgroundColor: [
            'rgba(0, 0, 209, 0.2)',
          ],
          borderColor: [
            'rgba(0, 0, 209, 0.6)',
          ],
          borderRadius: 5,
          borderWidth: 0,
        },
        {
          label: 'USA video game brand stores',
          data: this._data_usaVideoGameBrands,
          datalabels: {
            color: 'rgba(111, 111, 149, 1.0)',
            listeners: {
              enter() {

              }
            },
            align: 'top',
            anchor: 'end',
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderRadius: 5,
            display: false,

            borderColor: function (context) {
              return 'rgba(0,0,255,0.1)';
            },
            borderWidth: 1,
            formatter: function (value, context) {
              if (isPercentage) {
                return (value).toFixed(1) + ' %';
              } else {
                return (value / 1000000).toFixed(1) + ' M';
              }

            },
            font: {
              weight: 'bold',
            },
            padding: 2,

          },
          backgroundColor: [
            'rgba(255, 0, 0, 0.5)',
          ],
          borderColor: [
            'rgba(222, 0, 0, 1.0)',
          ],
          borderRadius: 5,
          borderWidth: 0,
        },
        {
          label: 'USA technology brand stores',
          data: this._data_usaTechBrands,
          datalabels: {
            color: 'rgba(111, 111, 149, 1.0)',
            listeners: {
              enter() {

              }
            },
            align: 'top',
            anchor: 'end',
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderRadius: 5,
            display: false,
            borderColor: function (context) {
              return 'rgba(0,0,255,0.1)';
            },
            borderWidth: 1,
            formatter: function (value, context) {
              if (isPercentage) {
                return (value).toFixed(1) + ' %';
              } else {
                return (value / 1000000).toFixed(1) + ' M';
              }

            },
            font: {
              weight: 'bold',
            },
            padding: 2,

          },
          backgroundColor: [
            'rgba(255, 0, 0, 0.2)',
          ],
          borderColor: [
            'rgba(255, 0, 0, 1.0)',
          ],
          borderRadius: 5,
          borderWidth: 0,
        },
      ],
    };
    return barChartData;
  }


  private _setOptions(): ChartOptions<'bar'> {
    const isPercentage = this._isPercentage;
    let maxY = 100000000;
    if (isPercentage) {
      maxY = 100
    }
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          // max: maxY,
          stacked: true,
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
            // callback: (value: number)=>{
            //   return value;
            // }
            // callback(tickValue, index, ticks) {

            // },
            // callback: function (value: number) {
            //   return value >= 1000000 ? value / 1000000 + ' M' : value;
            // },
          },
        },

      },
      plugins: {
        datalabels: {

        },
      },

    }
  }
}
