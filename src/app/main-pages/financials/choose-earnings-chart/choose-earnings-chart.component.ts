import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartSimple, faX } from '@fortawesome/free-solid-svg-icons';
import { EarningsChartComponent } from '../earnings-chart/earnings-chart.component';
import { FinancialChartService } from './earnings-chart.service';
import { EarningsChartSelection } from './earnings-chart-selection.enum';
import { Subscription, timer } from 'rxjs';


@Component({
  selector: 'app-choose-earnings-chart',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, EarningsChartComponent],
  templateUrl: './choose-earnings-chart.component.html',
  styleUrl: './choose-earnings-chart.component.scss'
})
export class ChooseEarningsChartComponent implements OnInit, OnDestroy {
  public EarningsChartOption = EarningsChartSelection;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private _financialsService: FinancialChartService) {
    this._isBrowser = isPlatformBrowser(this.platformId);
  }
  public get faChartSimple() { return faChartSimple; }
  public get faX() { return faX; }

  private _showMoreChartOptions: boolean = false;
  public get showMoreChartOptions(): boolean { return this._showMoreChartOptions; }
  private _isBrowser: boolean = false;
  private _isLoading: boolean = false;
  public get isBrowser(): boolean { return this._isBrowser; }

  private _chartTitle: string = 'Revenue and Net Income by fiscal year';
  public get chartTitle(): string { return this._chartTitle; }
  public get isLoading(): boolean { return this._isLoading; }

  private _subscription: Subscription | null = null;

  ngOnInit() {
    this._chartTitle = this._financialsService.chartTitle;
    timer(0).subscribe(() => {
      this._isLoading = false;
      this._subscription = this._financialsService.chartTitle$.subscribe((title) => {
        this._chartTitle = title;
      })
    })


  }

  ngOnDestroy() {
    this._subscription?.unsubscribe();
  }

  onClickMoreCharts() {
    this._showMoreChartOptions = !this._showMoreChartOptions;
  }

  public get chartPeriod(): 'ANNUAL' | 'QUARTER' | 'QOVERQ' { return this._financialsService.chartPeriod; }
  public get chartOption(): EarningsChartSelection { return this._financialsService.chartOption; }

  public get periodIsAnnual(): boolean { return this.chartPeriod === 'ANNUAL'; }
  public get periodIsQuarter(): boolean { return this.chartPeriod === 'QUARTER'; }
  // public get periodIsQoverQ(): boolean { return this.chartPeriod === 'QOVERQ'; }

  public get chartIsRevenueVsIncome(): boolean { return this.chartOption === EarningsChartSelection.REVENUE_VS_NET_INCOME; }
  public get chartIsRevenueVsCost(): boolean { return this.chartOption === EarningsChartSelection.REVENUE_VS_COST; }
  public get chartIsRevenueVsGrossProfit(): boolean { return this.chartOption === EarningsChartSelection.REVENUE_VS_GROSS_PROFIT; }

  public get chartIsOperations(): boolean { return this.chartOption === EarningsChartSelection.OPERATING_INCOME; }
  public get chartIsGrossProfitVsSGA(): boolean { return this.chartOption === EarningsChartSelection.GROSS_PROFIT_VS_SGA; }
  public get chartIsOperationsVsSGA(): boolean { return this.chartOption === EarningsChartSelection.OPERATIONS_VS_SGA; }

  public get chartIsInterest(): boolean { return this.chartOption === EarningsChartSelection.INTEREST_INCOME; }
  public get chartIsEquity(): boolean { return this.chartOption === EarningsChartSelection.STOCKHOLDERS_EQUITY; }



  public onClickChartOption(option: EarningsChartSelection) {
    this._financialsService.setChartOption(option);
  }

  public onClickChartPeriod(option: 'ANNUAL' | 'QUARTER' | 'QOVERQ') {
    this._financialsService.setChartPeriod(option);
  }

}
