import { Component } from '@angular/core';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsArticle } from './news-article/news-article.class';
import { fy23NewsArticles } from './news-article/fy23-news-articles';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { EarningsChartComponent } from '../../../main-pages/financials/earnings-chart/earnings-chart.component';
import { Fy23MediaSentimentTableComponent } from './fy23-media-sentiment-table/fy23-media-sentiment-table.component';
import { EarningsChartConfig } from '../../../main-pages/financials/earnings-chart/earnings-chart-config.interface';
import { EarningsChartPropertySelection } from '../../../main-pages/financials/earnings-chart/choose-earnings-chart/earnings-chart-property-selection.enum';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-fy23-earnings',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, EarningsChartComponent, Fy23MediaSentimentTableComponent],
  templateUrl: './fy23-earnings.component.html',
  styleUrl: './fy23-earnings.component.scss'
})
export class Fy23EarningsComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'GameStop FY 2023 Earnings Results | gmewiki.org',
    description: 'GameStop’s FY 2023 Earnings Results: Profitable for the first time in 6 years',
    url: 'https://gmewiki.org/fy23',
    image: 'https://gmewiki.org/assets/earnings-sankey/fy23-earnings-sankey.jpg',
    githubPageUrl: 'info-pages/_events/fy23-earnings/fy23-earnings.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
    this._isBrowser = this._screenService.isBrowser;
  }


  private _isBrowser: boolean = false;
  public get isBrowser(): boolean { return this._isBrowser; }
  public get newsArticles(): NewsArticle[] { return fy23NewsArticles; }
  public get moreThan800Px(): boolean {
    return this._screenService.screenDimensions.width >= 800
      && this._screenService.screenDimensions.width < 1680;
  }
  public get moreThan1680Px(): boolean { return this._screenService.screenDimensions.width >= 1680; }
  public get screenWidth(): number { return this._screenService.screenWidth; }
  public get isMobile(): boolean { return this._screenService.isMobile; }

  public get fy23EarningsChartConfig(): EarningsChartConfig {
    {
      return {
        period: 'ANNUAL',
        startYear: 2016,
        endYear: 2023,
        selectedProperty: EarningsChartPropertySelection.REVENUE_VS_NET_INCOME,
        menuLabel: "GameStop Revenue versus Net Income by Fiscal Year",
      }
    }
  }
}
