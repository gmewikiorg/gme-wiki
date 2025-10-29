import { Component } from '@angular/core';
import { ImportGmeDataService } from '../../../shared/services/import-gme-data.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BarController, BarElement, CategoryScale, Chart, ChartConfiguration, ChartOptions, Decimation, Filler, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, TooltipItem } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';
import dayjs from 'dayjs';


@Component({
  selector: 'app-sneeze-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './sneeze-chart.component.html',
  styleUrl: './sneeze-chart.component.scss'
})
export class SneezeChartComponent {


  constructor(private _gmeDataService: ImportGmeDataService) {
    Chart.unregister(ChartDataLabels, annotationPlugin, Tooltip);
    // if we do not unregister the ChartDataLabels then every point on the chart will have a label which looks terrible
    Chart.register(annotationPlugin, PointElement, Title, Legend, Filler, Decimation, CategoryScale, LineElement, Tooltip, LineController, LinearScale, BarController, BarElement);

    const startDate = '2020-09-01';
    const endDate = '2021-04-30';

    const gmeData = this._gmeDataService.tradingDayPriceEntries.filter(item => item.dateYYYYMMDD >= startDate && item.dateYYYYMMDD <= endDate)
      .filter(item => item.volume > 0);

    this.lineChartData = {
      labels: gmeData.map(item => item.dateYYYYMMDD),
      datasets: [
        {
          type: 'bar',
          data: gmeData.map(item => item.volume),
          label: 'GME trading volume ',
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 89, 255, 0.8)',
          borderWidth: 0.0,
          yAxisID: 'yVolume',
        },
        {
          type: 'line',
          data: gmeData.map(item => item.close),
          label: 'GME price $ ',
          fill: true,
          tension: 0.5,
          borderColor: 'green',
          backgroundColor: 'rgba(0,220,0,0.2)',
          borderWidth: 0.5,
          pointRadius: 0,
          pointHitRadius: 0,
          pointHoverRadius: 0,
          pointHoverBorderColor: '',
          yAxisID: 'yPrice',
        }
      ],
    }
  }

  public lineChartData: any = { labels: [], datasets: [] };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,

    scales: {
      yVolume: {
        // min: 0,
        position: 'left',
      },
      yPrice: {
        // min: 10,
        position: 'right',
        grid: {
          drawOnChartArea: false // keep grids from overlapping
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (context) => { return this._tooltipDate(context) },
          label: (context) => { return this._tooltipVolume(context) },
          footer: (context) => { return this._tooltipClose(context) },
        },
      },

    },

  }

  public lineChartLegend = true;

  private _tooltipDate(context: TooltipItem<"line">[]) {
    const data = context[0];
    return dayjs(data.label).format('MMM DD, YYYY')
  }

  private _tooltipVolume(context: TooltipItem<"line">) {
    const date = context.label;
    const gmePriceEntry = this._gmeDataService.allPriceEntries.find(item => item.dateYYYYMMDD === date);
    if (gmePriceEntry) {
      const gmePrice = 'GME trading volume: ' + (gmePriceEntry?.volume).toLocaleString()
      return gmePrice;
    }
    return '';
  }

  private _tooltipClose(context: TooltipItem<"line">[]) {
    const date = context[0].label;
    const gmePriceEntry = this._gmeDataService.allPriceEntries.find(item => item.dateYYYYMMDD === date);
    const gmePrice = 'GME close price: $' + (gmePriceEntry?.close)?.toFixed(2)
    return gmePrice;
  }

}
