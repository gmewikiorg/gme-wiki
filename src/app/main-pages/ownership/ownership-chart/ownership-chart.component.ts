import { AfterViewInit, Component, OnInit, } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions, TooltipItem, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { OwnershipData } from '../ownership-data.class';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CommonModule } from '@angular/common';
import { ImportGmeDataService } from '../../../shared/services/import-gme-data.service';


@Component({
  selector: 'app-ownership-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule,],
  templateUrl: './ownership-chart.component.html',
  styleUrl: './ownership-chart.component.scss'
})
export class OwnershipChartComponent implements OnInit, AfterViewInit{
  constructor(
    private _gmeService: ImportGmeDataService,
    // private _loadingService: LoadingService, 
  ){ 
    Chart.unregister(ChartDataLabels);
    Chart.register(PieController, ArcElement, Tooltip, Legend);
    this._ownershipData = new OwnershipData();
    this.pieChartOptions = this._setPieChartOptions();
    this.pieChartData = this.ownershipData.chartData;
  }



  public pieChartData: ChartConfiguration<'pie'>['data'];
  public pieChartOptions: ChartOptions<'pie'>;
  public pieChartLegend = true;

  public get tso(): number { return this.ownershipData.tso; } // updated 2024-06-11

  private _ownershipData: OwnershipData;
  public get ownershipData(): OwnershipData { return this._ownershipData; }


  ngAfterViewInit(): void {
  }

  ngOnInit() {
  }

  private _setPieChartOptions(): ChartOptions<'pie'>{
    const ownershipData = this.ownershipData;
    // const options: ChartOptions<'pie'> = {
    //   animation: true,
    // }
    const options: ChartOptions<'pie'> = {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        datalabels: {
          color: 'rgba(255,255,255,0.9)',
          display(context) {
            /**
             * datasetIndex, dataIndex:
             * 0, 0 - held by registered holders at Computershare
             * 0, 1 - held by Cede & Co
             * 1, 2 - DRS
             * 1, 3 - DSPP
             * 1, 4 - RC
             * 1, 5 - RK
             * 1, 6 - Vanguard
             * 1, 7 - Blackrock
             * 1, 8 - State Street
             * 1, 9 - other inst
             * 1, 10 - remainder
             * 
             */
            const value = context.dataset.data[context.dataIndex];
            if(value === 0){
              return false;
            }
            // if(context.datasetIndex === 0){
            //   return false;
            // }
            return false;
          },
          // align: 'top',
          // anchor: 'end',
          backgroundColor: 'rgba(0,0,0,0.3)',
          borderRadius: 5,


          borderColor: function (context) {
            return 'rgba(0,0,255,0.1)';
          },
          borderWidth: 1,
          formatter: function (value, context) {
            const dataValue = context.dataset.label
            const label = ownershipData.getLabel(value);
            if(context.datasetIndex === 0){
              if(context.dataIndex === 0){
                return 'Held by registered holders';
              }else if(context.dataIndex === 1){
                return 'Held by Cede & Co';
              }
            }else{
              return label;
              // return label + ': ' + (value/1000000).toFixed(1) + " M";
            }
            return '';
           
          },
          font: {
            weight: 'bold',
            size: 12,
          },
          padding: 4,

        },
        legend: {
          onClick: (event, array) => {
          },
          position: 'bottom',
        },
        tooltip: {
          // backgroundColor: (context) => {
          //   if (context.tooltipItems.length > 0) {
          //     this._getTooltipBackgroundColor(context.tooltipItems[0])
          //   }
          //   return this._tooltipBackgroundColor;
          // },
          borderColor: 'black',
          borderWidth: 1,
          // displayColors: false,
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
            label: (context) => { return this._labelContext(context) },
            footer: (context) => { return this._footerContext(context) },
            title: (context) => { return this._titleContext(context) }
          },
        },
      },
      
    }
    return options;
  }


  private _labelContext(context: TooltipItem<"pie">){
    return "  " + context.label;
  }

  private _titleContext(context: TooltipItem<"pie">[]){
    const item = context[0];
    const percent = Math.round((item.parsed/this.tso)*100);
    return percent + "%, " + String(Math.round(item.parsed/1000000)) + " million shares";
  }

  private _footerContext(context: TooltipItem<"pie">[]){
    const hasGMEData = false;
    if(hasGMEData){
      const lastClosePrice = this._gmeService.lastClosePrice;
      // const  marketValue = context[0].parsed * lastClosePrice / 1000000000;
      // const date = dayjs(this._gmeService.allPriceEntries[this._gmeService.allPriceEntries.length-1].dateYYYYMMDD).format('MMMM D, YYYY')
      // return '$' + (marketValue).toFixed(1) + " billion -- market value as of " + date;
      return '';
    }else{
      return '';
    }   
  }

}
