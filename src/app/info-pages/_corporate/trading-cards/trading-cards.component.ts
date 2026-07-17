import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { EarningsChartPropertySelection } from '../../../main-pages/financials/earnings-chart/choose-earnings-chart/earnings-chart-property-selection.enum';
import { EarningsChartComponent } from '../../../main-pages/financials/earnings-chart/earnings-chart.component';
import { EarningsChartConfig } from '../../../main-pages/financials/earnings-chart/earnings-chart-config.interface';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-trading-cards',
  standalone: true,
  imports: [RouterModule, FooterComponent, CommonModule, EarningsChartComponent],
  templateUrl: './trading-cards.component.html',
  styleUrl: './trading-cards.component.scss'
})
export class TradingCardsComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'Graded Trading Cards at GameStop | gmewiki.org',
    description: 'Starting in 2024, GameStop has made efforts to expand into the market of graded trading cards',
    url: 'https://gmewiki.org/trading-cards',
    image: '',
    githubPageUrl: 'info-pages/_corporate/trading-cards/trading-cards.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }


  public get isBrowser(): boolean { return this._screenService.isBrowser; }
  // public get collectiblesConfig():  { article: 'FY24' | 'ATMs' | 'collectibles', chart: EarningsChartPropertySelection, } { return { article: 'collectibles', chart: EarningsChartPropertySelection.REVENUE_TYPE_PERCENTAGE } }
  public get collectiblesConfig(): EarningsChartConfig {
    return {
      period: 'QUARTER',
      startYear: 2020,
      endYear: 2026,
      selectedProperty: EarningsChartPropertySelection.REVENUE_TYPE_PERCENTAGE_COLLECTIBLES,
      menuLabel: 'Collectibles Revenue: Increasing',
      showCustomLegend: false,
    }
  }
}
