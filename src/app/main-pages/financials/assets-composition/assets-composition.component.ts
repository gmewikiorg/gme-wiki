import { Component } from '@angular/core';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { Chart, ChartConfiguration, ChartOptions, TooltipItem, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CommonModule } from '@angular/common';
import { ColorPicker } from '../../../shared/color-picker.class';
import { AssetsCompisitionData } from './assets-composition-data.class';
import { ChartExportComponent } from '../../../shared/components/export-chart/chart-export.component';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, ChartExportComponent],
  templateUrl: './assets-composition.component.html',
  styleUrl: './assets-composition.component.scss'
})
export class AssetsCompositionComponent {

  constructor(
    private _screenService: ScreenService,
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
            const item = context.dataIndex;
            const label = assetData.getLabel(layer, item);
            if (label === 'HIDDEN') {
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
            const item = tooltipItem.dataIndex;
            const label = this._assetData.getLabel(layer, item);
            if (label === 'HIDDEN') {
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
    }
    return options;
  }
  private _labelContext(context: TooltipItem<"pie">) {
    const layer = context.datasetIndex;
    const item = context.dataIndex;
    const label = this._assetData.getLabel(layer, item);
    if (label === 'HIDDEN') {
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
      const item = context[0].dataIndex;
      const label = this._assetData.getLabel(layer, item);
      if (label === 'HIDDEN') {
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
