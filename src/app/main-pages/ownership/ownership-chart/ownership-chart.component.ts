import { AfterViewInit, Component, OnInit, } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions, TooltipItem, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { OwnershipData } from '../ownership-data/ownership-data.class';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CommonModule } from '@angular/common';
import { ImportGmeDataService } from '../../../shared/services/import-gme-data.service';
import { ColorPicker } from '../../../shared/color-picker.class';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-ownership-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, RouterModule],
  templateUrl: './ownership-chart.component.html',
  styleUrl: './ownership-chart.component.scss'
})
export class OwnershipChartComponent implements OnInit, AfterViewInit {
  constructor(
    private _gmeService: ImportGmeDataService,
    private _screenService: ScreenService,
    private _router: Router
  ) {
    Chart.unregister(ChartDataLabels);
    Chart.register(PieController, ArcElement, Tooltip, Legend, ChartDataLabels);
    this._ownershipData = new OwnershipData();
    this.pieChartOptions = this._setPieChartOptions();
    this.pieChartData = this.ownershipData.chartData;
  }

  public pieChartData: ChartConfiguration<'pie'>['data'];
  public pieChartOptions: ChartOptions<'pie'>;
  public pieChartLegend = false;

  public get tso(): number { return this.ownershipData.tso; }
  public get isDarkMode(): boolean { return this._screenService.isDarkMode; }
  public get isMobile(): boolean { return this._screenService.isMobile; }

  private _ownershipData: OwnershipData;
  public get ownershipData(): OwnershipData { return this._ownershipData; }

  public onClickShowHide() {
    if (this._showHideButton === 'Hide Labels') {
      this._showHideButton = 'Show Labels'
    } else if (this._showHideButton === 'Show Labels') {
      this._showHideButton = 'Hide Labels'
    }
    this.pieChartOptions = this._setPieChartOptions();
  }
  private _showHideButton: string = 'Hide Labels'
  public get showHideButton(): string { return this._showHideButton; }


  ngAfterViewInit(): void {
  }

  ngOnInit() {
    this._screenService.isDarkMode$.subscribe(() => {
      this.pieChartOptions = this._setPieChartOptions();
    })
  }

  private _setPieChartOptions(): ChartOptions<'pie'> {
    const ownershipData = this.ownershipData;
    const isDarkMode: boolean = this.isDarkMode;
    const showDataLabels: boolean = this.showHideButton === 'Hide Labels';
    const options: ChartOptions<'pie'> = {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      onClick: (event, elements, chart) => {
        if (!elements.length) return;
        const { datasetIndex, index } = elements[0];
        const label = chart.data.labels?.[index];
        const value = chart.data.datasets[datasetIndex].data[index];
        if (label === 'DRS' || label === 'Held by registered holders with Computershare') {
          this._router.navigate(['/drs']);
        } else if (label === 'DSPP') {
          this._router.navigate(['/drs-vs-dspp']);
        } else if (label === 'Ryan Cohen') {
          this._router.navigate(['/ryan-cohen']);
        } else if (label === 'Keith Gill *') {
          this._router.navigate(['/keith-gill']);
        }
      },
      onHover: (event, elements, chart) => {
        const canvas = event.native?.target as HTMLCanvasElement;
        if (!elements.length) {
          canvas.style.cursor = 'default';
          return;
        }
        const { datasetIndex, index } = elements[0];
        const label = chart.data.labels?.[index] as string;
        const value = chart.data.datasets[datasetIndex].data[index];
        if (label) {
          const isClickable = ['DRS', 'Held by registered holders with Computershare', 'DSPP', 'Ryan Cohen', 'Keith Gill *'].includes(label);
          canvas.style.cursor = isClickable ? 'pointer' : 'default';
        }
      },
      plugins: {
        datalabels: {
          color: function (context) {
            if (!isDarkMode) {
              return 'black';
            } else {
              return 'white';
            }
          },
          display(context) {
            // Display datalabels on pie chart elements?
            if (showDataLabels) {
              const value = context.dataset.data[context.dataIndex];
              if (value !== 0) {
                // if the value is not zero
                if (context.dataIndex !== 8) {
                  // and if dataIndex is not 8 (state street, due to position on chart it is cluttered)
                  return true;
                }
              }
            }
            return false;
          },
          backgroundColor: function (context) {
            if (!isDarkMode) {
              const color = ColorPicker.setAlpha('rgb(255,255,255)', 0.5);
              return color;
            } else {
              const color = ColorPicker.setAlpha('rgb(0,0,0)', 0.5);
              return color;
            }
          },
          borderRadius: 5,
          borderColor: function (context) {
            return '';
          },
          align: 'center',
          borderWidth: 1,
          formatter: function (value, context) {
            const label = ownershipData.getLabel(value);
            if (context.datasetIndex === 0) {
              if (context.dataIndex === 0) {
                return 'Held by registered holders';
              } else if (context.dataIndex === 1) {
                return 'Held by Cede & Co';
              }
            } else {
              return label;
              // return label + ': ' + (value / 1000000).toFixed(1) + " M";
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


  private _labelContext(context: TooltipItem<"pie">) {
    return "  " + context.label;
  }

  private _titleContext(context: TooltipItem<"pie">[]) {
    const item = context[0];
    const percent = Math.round((item.parsed / this.tso) * 100);
    return percent + "%, " + String(Math.round(item.parsed / 1000000)) + " million shares";
  }

  private _footerContext(context: TooltipItem<"pie">[]) {
    const hasGMEData = false;
    if (hasGMEData) {
      const lastClosePrice = this._gmeService.lastClosePrice;
      // const  marketValue = context[0].parsed * lastClosePrice / 1000000000;
      // const date = dayjs(this._gmeService.allPriceEntries[this._gmeService.allPriceEntries.length-1].dateYYYYMMDD).format('MMMM D, YYYY')
      // return '$' + (marketValue).toFixed(1) + " billion -- market value as of " + date;
      return '';
    } else {
      return '';
    }
  }

}
