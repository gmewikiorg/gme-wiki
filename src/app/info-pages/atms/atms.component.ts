import { Component } from '@angular/core';
import { ScreenService } from '../../shared/services/screen-size.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../layout/footer/footer.component';
import { EarningsChartComponent } from '../../main-pages/financials/earnings-chart/earnings-chart.component';
import { EarningsChartPropertySelection } from '../../main-pages/financials/earnings-chart/choose-earnings-chart/earnings-chart-property-selection.enum';
import { RouterModule } from '@angular/router';
import { EarningsChartConfig } from '../../main-pages/financials/earnings-chart/choose-earnings-chart/earnings-chart-config.interface';

@Component({
  selector: 'app-atms',
  standalone: true,
  imports: [CommonModule, FooterComponent, EarningsChartComponent, RouterModule],
  templateUrl: './atms.component.html',
  styleUrl: './atms.component.scss'
})
export class ATMsComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'GameStop raised cash with ATMs | gmewiki.org';
    const description = 'GameStop raised nearly $3.5 B in 2024 via ATM equity offerings, and $1.6 B in 2021';
    const url = 'https://gmewiki.org/atms';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }

  public get isBrowser(): boolean { return this._screenService.isBrowser; }
  public get isMobile(): boolean { return this._screenService.isMobile; }
  // public get interestIncomeChartConfig(): { article: 'ATMs', chart: EarningsChartPropertySelection, } { return { article: 'ATMs', chart: EarningsChartPropertySelection.INTEREST_INCOME } }
  // public get equityChartConfig(): { article: 'ATMs', chart: EarningsChartPropertySelection, } { return { article: 'ATMs', chart: EarningsChartPropertySelection.STOCKHOLDERS_EQUITY } }

  public get interestIncomeChartConfig(): EarningsChartConfig {
    {
      return {
        period: 'QUARTER',
        startYear: 2018,
        endYear: 2024,
        selectedProperty: EarningsChartPropertySelection.INTEREST_INCOME,
        menuLabel: "GameStop Interest Income",
      }
    }
  }
  public get equityChartConfig(): EarningsChartConfig {
    {
      return {
        period: 'QUARTER',
        startYear: 2018,
        endYear: 2024,
        selectedProperty: EarningsChartPropertySelection.STOCKHOLDERS_EQUITY,
        menuLabel: "GameStop Stockholders' Equity",
      }
    }
  }
}
