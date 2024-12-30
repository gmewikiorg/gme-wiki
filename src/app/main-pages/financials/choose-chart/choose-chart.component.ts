import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { EarningsChartComponent } from '../earnings-chart/earnings-chart.component';
import { FinancialChartService } from './financial-chart.service';

@Component({
  selector: 'app-choose-chart',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, EarningsChartComponent],
  templateUrl: './choose-chart.component.html',
  styleUrl: './choose-chart.component.scss'
})
export class ChooseChartComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private _financialsService: FinancialChartService  ) {
    this._isBrowser = isPlatformBrowser(this.platformId);
  }
  public get faChartSimple() { return faChartSimple; }


  private _showMoreChartOptions: boolean = false;
  public get showMoreChartOptions(): boolean { return this._showMoreChartOptions; }
  private _isBrowser: boolean = false;
  public get isBrowser(): boolean { return this._isBrowser; }

  public get chartTitle(): string { return this._financialsService.chartTitle; }



  onClickMoreCharts() {
    this._showMoreChartOptions = !this._showMoreChartOptions;
  }

  public get chartPeriod(): 'ANNUAL' | 'QUARTER' | 'QOVERQ' { return this._financialsService.chartPeriod; }
  public get chartOption(): 'REVENUE' | 'PROFIT' | 'OPERATIONS' | 'SGA' | 'INTEREST' | 'EQUITY' { return this._financialsService.chartOption; }

  public get periodIsAnnual(): boolean { return this.chartPeriod === 'ANNUAL'; }
  public get periodIsQuarter(): boolean { return this.chartPeriod === 'QUARTER'; }
  public get periodIsQoverQ(): boolean { return this.chartPeriod === 'QOVERQ'; }

  public get chartIsRevenue(): boolean { return this.chartOption === 'REVENUE'; }
  public get chartIsProfit(): boolean { return this.chartOption === 'PROFIT'; }
  public get chartIsOperations(): boolean { return this.chartOption === 'OPERATIONS'; }
  public get chartIsSGA(): boolean { return this.chartOption === 'SGA'; }
  public get chartIsInterest(): boolean { return this.chartOption === 'INTEREST'; }
  public get chartIsEquity(): boolean { return this.chartOption === 'EQUITY'; }


  public onClickChartOption(option: 'REVENUE' | 'PROFIT' | 'OPERATIONS' | 'SGA' | 'INTEREST' | 'EQUITY') {
    this._financialsService.setChartOption(option);
  }

  public onClickChartPeriod(option: 'ANNUAL' | 'QUARTER' | 'QOVERQ') {
    this._financialsService.setChartPeriod(option);
  }

}
