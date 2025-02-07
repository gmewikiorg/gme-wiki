import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { EarningsChartComponent } from './earnings-chart/earnings-chart.component';
import { EarningsTableComponent } from './earnings-table/earnings-table.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ScreenService } from '../../shared/services/screen-size.service';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChooseEarningsChartComponent } from './choose-earnings-chart/choose-earnings-chart.component';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-financials',
  standalone: true,
  imports: [ChooseEarningsChartComponent, EarningsTableComponent, CommonModule, RouterModule, FontAwesomeModule, FooterComponent],
  templateUrl: './financials.component.html',
  styleUrl: './financials.component.scss'
})
export class FinancialsComponent {

  constructor(
    // private _loadingService: LoadingService, 
    // private _screenService: ScreenSizeService, 
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title,
    private screenService: ScreenService,
    private meta: Meta,
  ) {
    this.titleService.setTitle('GameStop Earnings and Financial Information');
    this._isBrowser = isPlatformBrowser(this.platformId);
    
    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: 'GameStop Earnings and Financial Information' },
      { name: 'keywords', content: 'GameStop, GME, Earnings, fiscal year, fiscal quarter, quarterly results, EPS, equity, assets, liabilities, financials, profit, net income, 10K, 10-K, 10Q, 10-Q' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: 'gmewiki.org - GameStop Earnings and Financial Information' },
      { property: 'og:description', content: 'Interactive chart of GameStop quarterly and annual earnings information; information pertaining to GameStop raising cash via ATM equity offerings' },
      { property: 'og:image', content: 'https://gmewiki.org/assets/main-pages/earnings.png' },
      { property: 'og:url', content: 'https://gmewiki.org/financials' },
      { property: 'og:type', content: 'website' },
    ]);

  }



  public get isMobile(): boolean { return this.screenService.isMobile; }

  private _isBrowser: boolean = false;
  public get isBrowser(): boolean { return this._isBrowser; }
  public get screenWidth(): number { return this.screenService.screenDimensions.width; }


  ngOnInit(){
  }



}
