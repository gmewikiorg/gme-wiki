import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartSimple, faX } from '@fortawesome/free-solid-svg-icons';
import { EarningsChartComponent } from '../earnings-chart/earnings-chart.component';
import { FinancialChartService } from './earnings-chart.service';
import { EarningsChartOption } from './earnings-chart-option.enum';
import { timer } from 'rxjs';


@Component({
  selector: 'app-choose-earnings-chart',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, EarningsChartComponent],
  templateUrl: './choose-earnings-chart.component.html',
  styleUrl: './choose-earnings-chart.component.scss'
})
export class ChooseEarningsChartComponent implements OnInit {
  public EarningsChartOption = EarningsChartOption;
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

  public get chartTitle(): string { return this._financialsService.chartTitle; }
  public get isLoading(): boolean { return this._isLoading; }

  ngOnInit() {
    timer(0).subscribe(()=>{
      this._isLoading = false;
    })

  }

  onClickMoreCharts() {
    this._showMoreChartOptions = !this._showMoreChartOptions;
  }

  public get chartPeriod(): 'ANNUAL' | 'QUARTER' | 'QOVERQ' { return this._financialsService.chartPeriod; }
  public get chartOption(): EarningsChartOption { return this._financialsService.chartOption; }

  public get periodIsAnnual(): boolean { return this.chartPeriod === 'ANNUAL'; }
  public get periodIsQuarter(): boolean { return this.chartPeriod === 'QUARTER'; }
  // public get periodIsQoverQ(): boolean { return this.chartPeriod === 'QOVERQ'; }

  public get chartIsRevenueVsIncome(): boolean { return this.chartOption === EarningsChartOption.REVENUE_VS_NET_INCOME; }
  public get chartIsRevenueVsCost(): boolean { return this.chartOption === EarningsChartOption.REVENUE_VS_COST; }
  public get chartIsRevenueVsGrossProfit(): boolean { return this.chartOption === EarningsChartOption.REVENUE_VS_GROSS_PROFIT; }

  public get chartIsOperations(): boolean { return this.chartOption === EarningsChartOption.OPERATING_INCOME; }
  public get chartIsGrossProfitVsSGA(): boolean { return this.chartOption === EarningsChartOption.GROSS_PROFIT_VS_SGA; }
  public get chartIsOperationsVsSGA(): boolean { return this.chartOption === EarningsChartOption.OPERATIONS_VS_SGA; }

  public get chartIsInterest(): boolean { return this.chartOption === EarningsChartOption.INTEREST_INCOME; }
  public get chartIsEquity(): boolean { return this.chartOption === EarningsChartOption.STOCKHOLDERS_EQUITY; }



  public onClickChartOption(option: EarningsChartOption) {
    this._financialsService.setChartOption(option);
  }

  public onClickChartPeriod(option: 'ANNUAL' | 'QUARTER' | 'QOVERQ') {
    this._financialsService.setChartPeriod(option);
  }

}
