import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BarController, BarElement, CategoryScale, Chart, ChartConfiguration, ChartOptions, Decimation, Filler, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, TooltipItem } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { ImportGmeDataService } from '../../../shared/services/import-gme-data.service';

@Component({
  selector: 'app-burp-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './burp-chart.component.html',
  styleUrl: './burp-chart.component.scss'
})
export class BurpChartComponent {

  constructor(private _gmeDataService: ImportGmeDataService) {
    Chart.unregister(ChartDataLabels, annotationPlugin, Tooltip);
    // if we do not unregister the ChartDataLabels then every point on the chart will have a label which looks terrible
    Chart.register(annotationPlugin, PointElement, Title, Legend, Filler, Decimation, CategoryScale, LineElement, Tooltip, LineController, LinearScale, BarController, BarElement);
    const gmeData = this._gmeDataService.tradingDayPriceEntries.filter(item => item.dateYYYYMMDD >= '2024-01-01' && item.dateYYYYMMDD <= '2024-07-30')
    .filter(item => item.volume > 0);

    this.lineChartData = {
      labels: gmeData.map(item => item.dateYYYYMMDD),
      datasets: [
        {
          type: 'bar',
          data: gmeData.map(item => item.volume),
          label: 'GME trading volume ',
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 89, 255, 1)',
          borderWidth: 0.0,
          yAxisID: 'yVolume',
        },
        {
          type: 'line',
          data: gmeData.map(item => item.high),
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
    }


  }

  public lineChartLegend = true;
}
