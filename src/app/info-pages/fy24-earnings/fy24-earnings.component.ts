import { Component } from '@angular/core';
import { TurnaroundTableComponent } from '../turnaround/turnaround-table/turnaround-table.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EarningsChartComponent } from '../../main-pages/financials/earnings-chart/earnings-chart.component';
import { ScreenService } from '../../shared/services/screen-size.service';
import { EarningsChartSelection } from '../../main-pages/financials/choose-earnings-chart/earnings-chart-selection.enum';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-fy24-earnings',
  standalone: true,
  imports: [TurnaroundTableComponent, RouterModule, CommonModule, EarningsChartComponent, FooterComponent],
  templateUrl: './fy24-earnings.component.html',
  styleUrl: './fy24-earnings.component.scss'
})
export class Fy24EarningsComponent {

  constructor(private _screenService: ScreenService) {
    const title = 'GameStop FY 2024 Earnings Results | gmewiki.org';
    const description = 'GameStop’s FY 2024 Earnings Results: Reduced revenue and stores, increasing profitability and equity';
    const url = 'https://gmewiki.org/fy24';
    const image = 'https://gmewiki.org/assets/info-pages/fy24-earnings-sankey.png';
    this._screenService.setPageInfo(title, description, url, image);
  }

  public get isBrowser(): boolean { return this._screenService.isBrowser; }

  public get equityChartConfig(): { article: 'FY24', chart: EarningsChartSelection, } { return { article: 'FY24', chart: EarningsChartSelection.STOCKHOLDERS_EQUITY } }
  public get storesChartConfig(): { article: 'FY24', chart: EarningsChartSelection, } { return { article: 'FY24', chart: EarningsChartSelection.REVENUE_VS_STORES } }
  public get interestIncomeChartConfig(): { article: 'FY24', chart: EarningsChartSelection, } { return { article: 'FY24', chart: EarningsChartSelection.INTEREST_INCOME } }
  public get operatingIncomeConfig(): { article: 'FY24', chart: EarningsChartSelection, } { return { article: 'FY24', chart: EarningsChartSelection.OPERATING_INCOME } }
  public get netIncomeChartConfig(): { article: 'FY24', chart: EarningsChartSelection, } { return { article: 'FY24', chart: EarningsChartSelection.NET_INCOME } }


}

