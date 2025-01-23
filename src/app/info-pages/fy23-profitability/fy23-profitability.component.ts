import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ScreenService } from '../../shared/services/screen-size.service';
import { NewsArticleComponent } from './news-article/news-article.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsArticle } from './news-article/news-article.class';
import { fy23NewsArticles } from './news-article/fy23-news-articles';
import { FooterComponent } from '../../layout/footer/footer.component';
import { EarningsChartComponent } from '../../main-pages/financials/earnings-chart/earnings-chart.component';

@Component({
  selector: 'app-fy23-profitability',
  standalone: true,
  imports: [NewsArticleComponent, CommonModule, RouterModule, FooterComponent, EarningsChartComponent],
  templateUrl: './fy23-profitability.component.html',
  styleUrl: './fy23-profitability.component.scss'
})
export class Fy23ProfitabilityComponent {

  constructor(
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object, 
    private titleService: Title, 
    private _screenSizeService: ScreenService) {
    this.titleService.setTitle('GameStop FY 2023 Profitability')
    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: 'GameStop was profitable for the first time in 6 years' },
      { name: 'keywords', content: 'GameStop, GME, GameStop turnaround, GameStop profitability, GameStop FY 2023 profitability' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: 'gmewiki.org - GameStop FY 2023 Profitability' },
      { property: 'og:description', content: 'GameStop FY 2023 Profitability - GameStop was profitable for the first time in 6 years with a net income of $6.7 M.' },
      { property: 'og:image', content: 'https://gmewiki.org/assets/earnings-sankey/fy23-sankey.jpg'}, 
      { property: 'og:url', content: 'https://gmewiki.org/fy23-profitability' },
      { property: 'og:type', content: 'website' },
    ]);
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

}
