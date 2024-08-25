import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ScreenService } from '../../shared/services/screen-size.service';
import { NewsArticleComponent } from './news-article/news-article.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsArticle } from './news-article/news-article.class';
import { fy23NewsArticles } from './news-article/fy23-news-articles';

@Component({
  selector: 'app-fy23-profitability',
  standalone: true,
  imports: [NewsArticleComponent, CommonModule, RouterModule],
  templateUrl: './fy23-profitability.component.html',
  styleUrl: './fy23-profitability.component.scss'
})
export class Fy23ProfitabilityComponent {

  constructor(private titleService: Title, private _screenSizeService: ScreenService) {
    this.titleService.setTitle('GameStop was profitable for the first time in 6 years - FY 2023')
  }
  public get newsArticles(): NewsArticle[] { return fy23NewsArticles; }
  public get moreThan800Px(): boolean {
    return this._screenSizeService.screenDimensions.width >= 800
      && this._screenSizeService.screenDimensions.width < 1680;
  }
  public get moreThan1680Px(): boolean { return this._screenSizeService.screenDimensions.width >= 1680; }
  public get screenWidth(): number { return this._screenSizeService.screenWidth; }

}
