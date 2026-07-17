import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EarningsChartComponent } from '../../../main-pages/financials/earnings-chart/earnings-chart.component';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { EarningsChartPropertySelection } from '../../../main-pages/financials/earnings-chart/choose-earnings-chart/earnings-chart-property-selection.enum';
import { EarningsChartConfig } from '../../../main-pages/financials/earnings-chart/earnings-chart-config.interface';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-fy24-earnings',
  standalone: true,
  imports: [RouterModule, CommonModule, EarningsChartComponent, FooterComponent],
  templateUrl: './fy24-earnings.component.html',
  styleUrl: './fy24-earnings.component.scss'
})
export class Fy24EarningsComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'GameStop FY 2024 Earnings Results | gmewiki.org',
    description: 'GameStop’s FY 2024 Earnings Results: Reduced revenue and stores, increasing profitability and equity',
    url: 'https://gmewiki.org/fy24',
    image: 'https://gmewiki.org/assets/info-pages/fy24-earnings-sankey.png',
    githubPageUrl: 'info-pages/_events/fy24-earnings/fy24-earnings.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }


  public get isBrowser(): boolean { return this._screenService.isBrowser; }

  public get equityChartConfig(): EarningsChartConfig {
    {
      return {
        period: 'ANNUAL',
        startYear: 2010,
        endYear: 2024,
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
        endYear: 2024,
        selectedProperty: EarningsChartPropertySelection.REVENUE_VS_STORES,
        menuLabel: 'GameStop Revenue versus Store Count by Fiscal Year',
      }
    }
  }
  public get interestIncomeChartConfig(): EarningsChartConfig {
    {
      return {
        period: 'ANNUAL',
        startYear: 2010,
        endYear: 2024,
        selectedProperty: EarningsChartPropertySelection.INTEREST_INCOME,
        menuLabel: 'GameStop Interest Income per Fiscal Year',
      }
    }
  }
  public get operatingIncomeConfig(): EarningsChartConfig {
    {
      return {
        period: 'ANNUAL',
        startYear: 2010,
        endYear: 2024,
        selectedProperty: EarningsChartPropertySelection.OPERATING_INCOME,
        menuLabel: 'GameStop Operating Income per Fiscal Year',
      }
    }
  }
  public get netIncomeChartConfig(): EarningsChartConfig {
    {
      return {
        period: 'ANNUAL',
        startYear: 2010,
        endYear: 2024,
        selectedProperty: EarningsChartPropertySelection.NET_INCOME,
        menuLabel: 'GameStop Net Income per Fiscal Year',
      }
    }
  }

}

