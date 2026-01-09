import { Component } from '@angular/core';
import { ScreenService } from '../../../../shared/services/screen-size.service';
import { BarController, BarElement, CategoryScale, Chart, ChartConfiguration, ChartOptions, Legend, LinearScale, Tooltip, TooltipItem } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { EarningsResult } from '../../../../main-pages/financials/earnings-results/earnings-result.class';
import { EarningsDataService } from '../../../../main-pages/financials/earnings-results/earnings-data.service';


@Component({
  selector: 'app-stores-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './stores-chart.component.html',
  styleUrl: './stores-chart.component.scss'
})
export class StoresChartComponent {
  constructor(private _sizeService: ScreenService, private _earningsService: EarningsDataService) {
    Chart.unregister(ChartDataLabels);
    Chart.register(ChartDataLabels, LinearScale, BarController, CategoryScale, BarElement, Tooltip, Legend)
    this.barChartData = this._setData();
    this.barChartOptions = this._setOptions();
  }

  public barChartData: ChartConfiguration<'bar'>['data'];
  public barChartOptions: ChartOptions<'bar'>;
  public barChartLegend = true;

  public get isMobile(): boolean { return this._sizeService.isMobile; }

  ngAfterViewInit(): void {
    this._sizeService.screenDimensions$.subscribe((change) => {
      this.barChartData = this._setData();
      this.barChartOptions = this._setOptions();
    });
  }


  private get _fyResults(): EarningsResult[] {
    if (this._earningsService) {
      const fyResults: EarningsResult[] = this._earningsService.annualResults;
      return fyResults.filter(r => r.fiscalYear >= 2005).reverse();
    }
    return [];
  }

  private get _dataLabels(): string[] {
    return this._fyResults.map(r => String(r.fiscalYear));
  }

  private get _data_allStoreCounts(): number[] {
    return this._fyResults.map(r => r.storeCount);
  }

  private _yearToCountTechBrands: Record<number, number> = {
    2013: 218, 2014: 484, 2015: 1036, 2016: 1522, 2017: 1377,
  };

  private _yearToCountInternational: Record<number, number> = {
    2005: 866, 2006: 979, 2007: 1203, 2008: 1876, 2009: 2021,
    2010: 2134, 2011: 2180, 2012: 2177, 2013: 2208, 2014: 2068,
    2015: 2068, 2016: 2069, 2017: 2035, 2018: 1984, 2019: 1867,
    2020: 1624, 2021: 1555, 2022: 1464, 2023: 1254, 2024: 878,
  };

  private _getTechBrandCountForYear(year: number, defaultValue = 0): number {
    return this._yearToCountTechBrands[year] ?? defaultValue;
  }

  private _getInternationalCountForYear(year: number, defaultValue = 0): number {
    return this._yearToCountInternational[year] ?? defaultValue;
  }

  private get _data_usaVideoGameBrands(): number[] {
    return this._fyResults.map(result => {
      const year = result.fiscalYear;
      const yearTotal = result.storeCount;
      return yearTotal - (this._getTechBrandCountForYear(year) + this._getInternationalCountForYear(year));
    })
  }

  private _setData(): ChartConfiguration<'bar'>['data'] {
    const width = this._sizeService.screenWidth;
    const isMobile = this.isMobile;

    let allStores = this._data_allStoreCounts;
    let labels = this._dataLabels;

    const years = this._fyResults.map(r => r.fiscalYear);
    const internationalCounts = years.map(year => this._getInternationalCountForYear(year));
    const techBrandsCounts = years.map(year => this._getTechBrandCountForYear(year));

    const barChartData: ChartConfiguration<'bar'>['data'] = {
      labels: labels,
      datasets: [
        {
          label: 'All international stores',
          data: internationalCounts,
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
            display: false,
            borderColor: function (context) {
              return 'rgba(0,0,255,0.1)';
            },
            borderWidth: 1,
            font: {
              weight: 'bold',
            },
            padding: 2,
          },
          backgroundColor: [
            'rgba(0, 102, 255, 0.5)',
          ],
          borderColor: [
            'rgba(255, 255, 255, 0.8)',
          ],
          borderRadius: 5,
          borderWidth: 1,
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
            font: {
              weight: 'bold',
            },
            padding: 2,
          },
          backgroundColor: [
            'rgba(255, 0, 0, 0.8)',
          ],
          borderColor: [
            'rgba(255, 255, 255, 0.8)',
          ],
          borderRadius: 5,
          borderWidth: 1,
        },
        {
          label: 'USA technology brand stores',
          data: techBrandsCounts,
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
            font: {
              weight: 'bold',
            },
            padding: 2,

          },
          backgroundColor: [
            'rgba(255, 115, 0, 0.7)',
          ],
          borderColor: [
            'rgba(255, 255, 255, 0.8)',
          ],
          borderRadius: 5,
          borderWidth: 1,
        },
      ],
    };
    return barChartData;
  }


  private _setOptions(): ChartOptions<'bar'> {
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
            // maxTicksLimit: 6,
          },
        },

      },
      plugins: {
        datalabels: {

        },
        tooltip: {
          callbacks: {
            label: (context) => { return this._labelContext(context) },
            footer: (context) => { return this._footerContext(context) },
            title: (context) => { return this._titleContext(context) }
          },
        }
      },

    }
  }

  private _labelContext(context: TooltipItem<"bar">) {
    const storeTypeValue = String(context.formattedValue);
    const typeLabel = context.dataset.label;
    return (" " + storeTypeValue + " " + typeLabel);
  }

  private _titleContext(context: any[]) {
    const year = Number(context[0].label);
    const totalStores = this._fyResults.find(r => r.fiscalYear === year)?.storeCount;
    const totalStoresFormatted = new Intl.NumberFormat("en-US").format(Number(totalStores))
    return 'FY ' + context[0].label + ": total of " + totalStoresFormatted + " stores";
  }

  private _footerContext(context: TooltipItem<"bar">[]) {
    return;
  }

}
