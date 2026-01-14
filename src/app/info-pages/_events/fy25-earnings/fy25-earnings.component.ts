import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { EarningsChartComponent } from '../../../main-pages/financials/earnings-chart/earnings-chart.component';
import { EarningsChartPropertySelection } from '../../../main-pages/financials/earnings-chart/choose-earnings-chart/earnings-chart-property-selection.enum';
import { EarningsChartConfig } from '../../../main-pages/financials/earnings-chart/earnings-chart-config.interface';
import { CommonModule } from '@angular/common';
import { ScreenService } from '../../../shared/services/screen-size.service';

@Component({
  selector: 'app-fy25-earnings',
  standalone: true,
  imports: [RouterModule, FooterComponent, EarningsChartComponent, CommonModule],
  templateUrl: './fy25-earnings.component.html',
  styleUrl: './fy25-earnings.component.scss'
})
export class Fy25EarningsComponent {

  constructor(private _screenService: ScreenService) {
    const title = 'GameStop FY 2025 Earnings Results | gmewiki.org';
    const description = 'GameStop’s FY 2025 Earnings Results: Strongest financial position in company history';
    const url = 'https://gmewiki.org/fy25';
    const image = 'https://gmewiki.org/assets/info-pages/fy25-earnings-sankey.png';
    this._screenService.setPageInfo(title, description, url, image);
  }

  public get isBrowser(): boolean { return this._screenService.isBrowser; }

  public get equityChartConfig(): EarningsChartConfig {
    {
      return {
        period: 'ANNUAL',
        startYear: 2013,
        endYear: 2025,
        selectedProperty: EarningsChartPropertySelection.STOCKHOLDERS_EQUITY,
        menuLabel: "GameStop Stockholders' Equity by Fiscal Year",
      }
    }
  }
  public get storesChartConfig(): EarningsChartConfig {
    {
      return {
        period: 'ANNUAL',
        startYear: 2015,
        endYear: 2025,
        selectedProperty: EarningsChartPropertySelection.REVENUE_VS_STORES,
        menuLabel: 'GameStop Revenue versus Store Count by Fiscal Year',
      }
    }
  }
  public get interestIncomeChartConfig(): EarningsChartConfig {
    {
      return {
        period: 'ANNUAL',
        startYear: 2013,
        endYear: 2025,
        selectedProperty: EarningsChartPropertySelection.INTEREST_INCOME,
        menuLabel: 'GameStop Interest Income per Fiscal Year',
      }
    }
  }
  public get operatingIncomeConfig(): EarningsChartConfig {
    {
      return {
        period: 'ANNUAL',
        startYear: 2013,
        endYear: 2025,
        selectedProperty: EarningsChartPropertySelection.OPERATING_INCOME,
        menuLabel: 'GameStop Operating Income per Fiscal Year',
      }
    }
  }
  public get netIncomeChartConfig(): EarningsChartConfig {
    {
      return {
        period: 'ANNUAL',
        startYear: 2013,
        endYear: 2025,
        selectedProperty: EarningsChartPropertySelection.NET_INCOME,
        menuLabel: 'GameStop Net Income per Fiscal Year',
      }
    }
  }
  public get collectiblesConfig(): EarningsChartConfig {
    return {
      period: 'QUARTER',
      startYear: 2020,
      endYear: 2025,
      selectedProperty: EarningsChartPropertySelection.REVENUE_TYPE_PERCENTAGE_COLLECTIBLES,
      menuLabel: 'Collectibles Revenue: Increasing',
    }
  }
  public get profitMarginChartConfig(): EarningsChartConfig {
    return {
      period: 'ANNUAL',
      startYear: 2013,
      endYear: 2025,
      selectedProperty: EarningsChartPropertySelection.NET_PROFIT_MARGIN,
      menuLabel: 'GameStop Net Profit Margin per Fiscal Year',
    }
  }


  
}
