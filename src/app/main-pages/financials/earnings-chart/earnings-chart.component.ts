import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, ChartConfiguration, ChartDataset, ChartOptions, Legend, LinearScale, Tooltip, TooltipItem } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ScreenService } from '../../../shared/services/screen-size.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { EarningsResult } from '../earnings-results/earnings-result.class';
import { EarningsDataService } from '../earnings-results/earnings-data.service';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../shared/services/loading.service';
import { EarningsDatasetBuilder } from './earnings-datasets.class';
import { Subscription } from 'rxjs';
import { setEarningsChartLegend } from './earnings-chart-set-legend';
import { FinancialChartService } from './choose-earnings-chart/earnings-chart.service';
import { EarningsChartPropertySelection } from './choose-earnings-chart/earnings-chart-property-selection.enum';
import { EarningsChartConfig } from './earnings-chart-config.interface';
import { defaultEarningsChartConfig } from './choose-earnings-chart/default-earnings-chart-config';
import { setChartOptions } from './earnings-chart-options';
import { SELECTION_TO_METRICS } from './choose-earnings-chart/earnings-metric-configs';
import { ChartExportComponent } from '../../../shared/components/export-chart/chart-export.component';

@Component({
  selector: 'app-earnings-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './earnings-chart.component.html',
  styleUrl: './earnings-chart.component.scss'
})
export class EarningsChartComponent implements OnInit, OnDestroy {

  private _datasetBuilder: EarningsDatasetBuilder;
  constructor(private _screenService: ScreenService, private _chartService: FinancialChartService, private _financeService: EarningsDataService, private _loadingService: LoadingService) {
    Chart.unregister(ChartDataLabels);
    Chart.register(ChartDataLabels, LinearScale, BarController, CategoryScale, BarElement, Tooltip, Legend);
    this._datasetBuilder = new EarningsDatasetBuilder(this._screenService);
    this.barChartOptions = this._setChartOptions();
    this.barChartData = this._updateDatasets();
    this._chartConfig = this._chartService.chartConfig;
  }

  @Input() componentConfig: EarningsChartConfig | null = null;

  private _isLoaded: boolean = false;
  private _chartConfig: EarningsChartConfig = defaultEarningsChartConfig

  public barChartData: ChartConfiguration<'bar'>['data'];
  public barChartOptions: ChartOptions<'bar'>;
  public barChartLegend = false;
  public showCustomLegend: boolean = true;
  public customLegendItems: { title: string; color: string }[] = [];

  public get isLoaded(): boolean { return this._isLoaded; }
  public get isDarkMode(): boolean { return this._screenService.isDarkMode; }
  public get chartPeriod(): 'ANNUAL' | 'QUARTER' { return this._chartConfig.period; }
  public get chartSelectedProperty(): EarningsChartPropertySelection { return this._chartConfig.selectedProperty; }
  public get chartStartYear(): number { return this._chartConfig.startYear; }
  public get chartEndYear(): number { return this._chartConfig.endYear; }

  async ngOnInit() {
    this._updateChartDataAndOptions();
    this._subscriptions = [
      this._chartService.chartConfig$.subscribe((config) => {
        /**
         * if there is a component config, then use the provided component config.  (e.g. ATMs page, FY23 page, FY24 page,)
         * otherwise use the config provided by the chartService
         */
        if (!this.componentConfig) {
          this._chartConfig = config;
        } else {
          this._chartConfig = this.componentConfig;
        }
        this._updateChartDataAndOptions();
      }),
      this._screenService.screenDimensions$.subscribe((change) => { this._updateChartDataAndOptions(); }),
      this._screenService.isDarkMode$.subscribe((change) => { this._updateChartDataAndOptions(); })
    ];
    this._isLoaded = true;
  }

  private _subscriptions: Subscription[] = [];
  ngOnDestroy(): void { this._subscriptions.forEach(s => s.unsubscribe()); }
  ngAfterViewInit(): void { }

  private _updateChartDataAndOptions() {
    this.barChartData = this._updateDatasets();
    this.barChartOptions = this._setChartOptions();
  }

  private _xAxisLabels: string[] = [];
  public get xAxisLabels(): string[] { return this._xAxisLabels; }

  private _updateDatasets(dataEntryCount = 99): ChartConfiguration<'bar'>['data'] {
    this.showCustomLegend = false;
    let results: EarningsResult[] = [];

    if (this.chartPeriod === 'ANNUAL') {
      results = this._financeService.annualResults.filter(r => r.fiscalYear >= this.chartStartYear && r.fiscalYear <= this.chartEndYear)
      dataEntryCount = results.length;
    } else if (this.chartPeriod === 'QUARTER') {
      results = this._financeService.quarterlyResults.filter(r => r.fiscalYear >= this.chartStartYear && r.fiscalYear <= this.chartEndYear)
      dataEntryCount = results.length;
    }
    if (this._screenService.isMobile) {
      const metrics = SELECTION_TO_METRICS[this.chartSelectedProperty] ?? [];
      const propertyCount = metrics.length;
      if (propertyCount > 1) {
        let chartStartYear = Math.floor(this.chartStartYear + ((this.chartEndYear - this.chartStartYear) / 2));
        if (this.chartPeriod === 'ANNUAL') {
          results = this._financeService.annualResults.filter(r => r.fiscalYear >= chartStartYear && r.fiscalYear <= this.chartEndYear)
          dataEntryCount = results.length;
        } else if (this.chartPeriod === 'QUARTER') {
          results = this._financeService.quarterlyResults.filter(r => r.fiscalYear >= chartStartYear && r.fiscalYear <= this.chartEndYear)
          dataEntryCount = results.length;
        }
      }
    }
    const chartLegendSettings = setEarningsChartLegend(this.chartSelectedProperty, this.chartPeriod);
    this.customLegendItems = chartLegendSettings.customLegendItems;
    this.showCustomLegend = chartLegendSettings.showCustomLegend;

    this.barChartLegend = false;
    if (this.chartSelectedProperty === EarningsChartPropertySelection.REVENUE_TYPE
      || this.chartSelectedProperty === EarningsChartPropertySelection.REVENUE_TYPE_PERCENTAGE
      || this.chartSelectedProperty === EarningsChartPropertySelection.REVENUE_TYPE_PERCENTAGE_COLLECTIBLES) {
      this.barChartLegend = true;
    }

    this._xAxisLabels = results.map(r => r.reportingPeriod + ' ' + String(r.fiscalYear).substring(2)).reverse().slice(-dataEntryCount);
    const datasets = this._datasetBuilder.updateDatasets(results, this.chartSelectedProperty, this.chartPeriod, dataEntryCount);
    const labels = this._datasetBuilder.getSubsetArray(dataEntryCount, this._xAxisLabels);
    return {
      labels: labels,
      datasets: datasets,
    };
  }

  private _setChartOptions(): ChartOptions<'bar'> {
    return setChartOptions(this._datasetBuilder, this.chartSelectedProperty, this.chartPeriod, this.xAxisLabels, this.isDarkMode);
  }

}
