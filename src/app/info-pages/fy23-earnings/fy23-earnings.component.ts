import { Component } from '@angular/core';
import { ScreenService } from '../../shared/services/screen-size.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsArticle } from './news-article/news-article.class';
import { fy23NewsArticles } from './news-article/fy23-news-articles';
import { FooterComponent } from '../../layout/footer/footer.component';
import { EarningsChartComponent } from '../../main-pages/financials/earnings-chart/earnings-chart.component';
import { Fy23MediaSentimentTableComponent } from './fy23-media-sentiment-table/fy23-media-sentiment-table.component';

@Component({
  selector: 'app-fy23-earnings',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, EarningsChartComponent, Fy23MediaSentimentTableComponent],
  templateUrl: './fy23-earnings.component.html',
  styleUrl: './fy23-earnings.component.scss'
})
export class Fy23EarningsComponent {

  constructor(private _screenSizeService: ScreenService) {

    const title = 'GameStop FY 2024 Earnings Results | gmewiki.org';
    const description = 'GameStop’s FY 2023 Earnings Results: Profitable for the first time in 6 years';
    const url = 'https://gmewiki.org/fy23';
    const image = 'https://gmewiki.org/assets/earnings-sankey/fy23-earnings-sankey.png';
    this._screenSizeService.setPageInfo(title, description, url, image);

    this._isBrowser = this._screenSizeService.isBrowser;
  }

  private _isBrowser: boolean = false;
  public get isBrowser(): boolean { return this._isBrowser; }
  public get newsArticles(): NewsArticle[] { return fy23NewsArticles; }
  public get moreThan800Px(): boolean {
    return this._screenSizeService.screenDimensions.width >= 800
      && this._screenSizeService.screenDimensions.width < 1680;
  }
  public get moreThan1680Px(): boolean { return this._screenSizeService.screenDimensions.width >= 1680; }
  public get screenWidth(): number { return this._screenSizeService.screenWidth; }
  public get isMobile(): boolean { return this._screenSizeService.isMobile; }

}
