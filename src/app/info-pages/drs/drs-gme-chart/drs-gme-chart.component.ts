import { AfterViewInit, Component } from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, ChartConfiguration, ChartOptions, Legend, LinearScale, Tooltip } from 'chart.js';
import { ScreenService } from '../../../shared/services/screen-size.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-drs-gme-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './drs-gme-chart.component.html',
  styleUrl: './drs-gme-chart.component.scss'
})
export class DrsGmeChartComponent implements AfterViewInit {


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

  public onClickDRSNumber(){
    this._isPercentage = false;
    this.barChartData = this._setData();
    this.barChartOptions = this._setOptions();
  }
  public onClickDRSPercent(){
    this._isPercentage = true;
    this.barChartData = this._setData();
    this.barChartOptions = this._setOptions();
  }


  private _dataLabelsAnnual: string[] = [
    'FY20', 'FY21', 'FY22', 'FY23',
  ]

  private _data_drsRegisteredAnnual: number[] = [
    0, 35600000, 76000000, 75300000,
  ]
  private _data_tsoAnnual: number[] = [
    0, (76339248 * 4), 304675439, 305873200,
  ]

  private _dataLabelsQuarterly: string[] = [
    'Q2 21',
    'Q3 21',
    'Q4 21',
    'Q1 22',
    'Q2 22',
    'Q3 22',
    'Q4 22',
    'Q1 23',
    'Q2 23',
    'Q3 23',
    'Q4 23',
    'Q1 24',
    'Q2 24',
    'Q3 24',
  ];

  private _data_drsRegisteredQuarterly: number[] = [
    0,          // Q2 21
    20800000,   // Q3 21
    35600000,   // Q4 21
    50800000,   // Q1 22
    71300000,   // Q2 22
    71800000,   // Q3 22
    76000000,   // Q4 22
    76600000,   // Q1 23
    75400000,   // Q2 23
    75400000,   // Q3 23
    75300000,   // Q4 23
    74600000,    // Q1 24
    72800000,    // Q2 24
    71000000,   //Q3 24
  ];

  private _data_tsoQuarterly: number[] = [
    0,              // Q2 21
    (76350781 * 4),   // Q3 21
    (76339248 * 4),   // Q4 21
    (76129034 * 4),   // Q1 22
    304529721,      // Q2 22
    304578070,      // Q3 22
    304675439,      // Q4 22
    304751243,      // Q1 23
    305241294,      // Q2 23
    305514315,      // Q3 23
    305873200,      // Q4 23
    351217517,       // Q1 24
    426509592,       // Q2 24
    446800365,      // Q3 24
  ];

  private _data_drsPercentQuarterly: number[] = this._data_drsRegisteredQuarterly.map(drsRegistered => {
    const index = this._data_drsRegisteredQuarterly.indexOf(drsRegistered);
    if (index === 0) {
      return 0
    }
    return (drsRegistered / this._data_tsoQuarterly[index]) * 100;
  });

  private _data_drsPercentAnnual: number[] = this._data_drsRegisteredAnnual.map(drsRegistered => {
    const index = this._data_drsRegisteredAnnual.indexOf(drsRegistered);
    if (index === 0) {
      return 0
    }
    return (drsRegistered / this._data_tsoAnnual[index]) * 100;
  });



  private _setData(): ChartConfiguration<'bar'>['data'] {
    const width = this._sizeService.screenWidth;
    const isMobile = this.isMobile;
    // const isMobile = false;
    // this._isMobile = false;
    const isPercentage = this._isPercentage;

    let registered = this._data_drsRegisteredQuarterly;
    let labels = this._dataLabelsQuarterly;
    if(isMobile){
      labels = this._dataLabelsAnnual;
      registered = this._data_drsRegisteredAnnual;
    }
    if(isPercentage){
      if(isMobile){
        labels = this._dataLabelsAnnual;
        registered = this._data_drsPercentAnnual;
      }else{
        labels = this._dataLabelsQuarterly;
        registered = this._data_drsPercentQuarterly;
      }
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
            align: 'top',
            anchor: 'end',
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderRadius: 5,
            display(context) {
              if(context.dataIndex === 0){
                return false;
              }
              if (context.dataIndex === context.dataset.data.length - 1) {
                return true;
              }
              if (width < 800 && !isMobile) {

                return false;
              }
              return true;
            },

            borderColor: function (context) {
              return 'rgba(0,0,255,0.1)';
            },
            borderWidth: 1,
            formatter: function (value, context) {
              if(isPercentage){
                return (value).toFixed(1) + ' %';
              }else{
                return (value / 1000000).toFixed(1) + ' M';
              }
              
            },
            font: {
              weight: 'bold',
            },
            padding: 2,

          },
          backgroundColor: [
            'rgba(205, 134, 209, 0.4)',
          ],
          borderColor: [
            'rgba(143, 23, 149, 1.0)',
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
    let maxY = 100000000;
    if(isPercentage){
      maxY = 100
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
            // callback: (value: number)=>{
            //   return value;
            // }
            callback(tickValue, index, ticks) {
              if(isPercentage){
                return Number(tickValue) + " %";
              }
              return (Number(tickValue) / 1000000) + " M";
            },
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
