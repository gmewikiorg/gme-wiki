import { Component } from '@angular/core';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { Chart, ChartConfiguration, ChartOptions, TooltipItem, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CommonModule } from '@angular/common';
import { ColorPicker } from '../../../shared/color-picker.class';
import { AssetsCompisitionData } from './assets-composition-data.class';
import { ChartExportComponent } from '../../../shared/components/export-chart/chart-export.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-assets-composition',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, ChartExportComponent, RouterModule],
  templateUrl: './assets-composition.component.html',
  styleUrl: './assets-composition.component.scss'
})
export class AssetsCompositionComponent {

  constructor(
    private _screenService: ScreenService,
    private _router: Router
  ) {
    Chart.unregister(ChartDataLabels);
    Chart.register(PieController, ArcElement, Tooltip, Legend, ChartDataLabels);
    // this._assetData = this._setAssetData();
    // this.pieChartOptions = this._setPieChartOptions();
    // this.pieChartData = this.ownershipData.chartData;

    this.pieChartData = this._setPieChartData();
    this.pieChartOptions = this._setPieChartOptions();
  }

  private _assetData: AssetsCompisitionData = new AssetsCompisitionData();

  public get isMobile(): boolean { return this._screenService.isMobile; }
  public get isDarkMode(): boolean { return this._screenService.isDarkMode; }
  public get isBrowser(): boolean { return this._screenService.isBrowser; }

  public get totalAssets(): string {
    return this._assetData.totalAssets;
  }

  public get totalLiabilities(): string {
    return this._assetData.totalLiabilities;
  }

  private _setPieChartData(): ChartConfiguration<'pie'>['data'] {
    const assetData = this._assetData;
    const pieChartData: ChartConfiguration<'pie'>['data'] = {
      labels: assetData.labels,
      datasets: assetData.datasets,
    }
    return pieChartData;
  }

  private _setPieChartOptions(): ChartOptions<'pie'> {
    const assetData = this._assetData;
    const options: ChartOptions<'pie'> = {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      layout: {
        padding: {
          left: 20,
          right: 20,
        }
      },
      plugins: {
        datalabels: {
          color: function (context) {
            // if (!isDarkMode) {
            //   return 'black';
            // } else {
            //   return 'white';
            // }
            return 'black';
          },
          display(context) {
            // Display datalabels on pie chart elements?
            const value = context.dataset.data[context.dataIndex];
            if (value !== 0) {
              // if the value is not zero
              return true;
            }
            // }
            return false;
          },
          backgroundColor: function (context) {
            // if (!isDarkMode) {
            //   const color = ColorPicker.setAlpha('rgb(255,255,255)', 0.5);
            //   return color;
            // } else {
            //   const color = ColorPicker.setAlpha('rgb(0,0,0)', 0.5);
            //   return color;
            // }
            const color = ColorPicker.setAlpha('rgb(255,255,255)', 0.5);
            return color;
          },
          borderRadius: 5,
          borderColor: function (context) {
            return '';
          },
          align: 'center',
          borderWidth: 1,
          formatter: function (value, context) {
            const layer = context.datasetIndex;
            const index = context.dataIndex;
            const item = assetData.getitem(layer, index);
            const label = assetData.getLabel(layer, index);
            if (item?.isHidden) {
              return '';
            }
            return label;
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
          filter: (tooltipItem) => {
            const layer = tooltipItem.datasetIndex;
            const index = tooltipItem.dataIndex;
            const item = assetData.getitem(layer, index);
            if (item?.isHidden) {
              return false;
            }
            return true;
          },
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
            // footer: (context) => { return this._footerContext(context) },
            title: (context) => { return this._titleContext(context) }
          },
        },
      },
      onClick: (event, elements, chart) => {
        if (!elements.length) return;
        if (!this.isMobile) {
          const { datasetIndex, index } = elements[0];
          const label = this._assetData.getLabel(datasetIndex, index);
          if (label === 'eBay Stock') {
            this._router.navigate(['/ebay']);
          } else if (label === 'Long-term debt') {
            this._router.navigate(['/convertible-notes']);
          }
        }

      },
      onHover: (event, elements, chart) => {
        const canvas = event.native?.target as HTMLCanvasElement;
        if (!elements.length) {
          canvas.style.cursor = 'default';
          return;
        }
        const { datasetIndex, index } = elements[0];
        const label = this._assetData.getLabel(datasetIndex, index);
        if (label) {
          const isClickable = ['eBay Stock', 'Long-term debt'].includes(label);
          canvas.style.cursor = isClickable ? 'pointer' : 'default';
        }
      },
    }
    return options;
  }
  private _labelContext(context: TooltipItem<"pie">) {
    const layer = context.datasetIndex;
    const index = context.dataIndex;
    const item = this._assetData.getitem(layer, index);
    if (item?.isHidden) {
      return '';
    }
    const millions = Number(context.raw) / 1_000_000;
    return " " + `$${millions.toLocaleString("en-US", {
      maximumFractionDigits: 0,
    })} million`;
  }
  private _titleContext(context: TooltipItem<"pie">[]) {
    if (context.length > 0) {
      const layer = context[0].datasetIndex;
      const index = context[0].dataIndex;
      const label = this._assetData.getLabel(layer, index);
      const item = this._assetData.getitem(layer, index);
      if (item?.isHidden) {
        return '';
      }
      return label;
    }
    return;
  }

  public pieChartData: ChartConfiguration<'pie'>['data'];
  public pieChartOptions: ChartOptions<'pie'>;
  public pieChartLegend = false;







}
