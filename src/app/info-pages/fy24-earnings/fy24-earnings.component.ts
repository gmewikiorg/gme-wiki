import { Component } from '@angular/core';
import { TurnaroundTableComponent } from '../turnaround/turnaround-table/turnaround-table.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EarningsChartComponent } from '../../main-pages/financials/earnings-chart/earnings-chart.component';
import { ScreenService } from '../../shared/services/screen-size.service';
import { EarningsChartSelection } from '../../main-pages/financials/choose-earnings-chart/earnings-chart-selection.enum';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-fy24-earnings',
  standalone: true,
  imports: [TurnaroundTableComponent, RouterModule, CommonModule, EarningsChartComponent, FooterComponent],
  templateUrl: './fy24-earnings.component.html',
  styleUrl: './fy24-earnings.component.scss'
})
export class Fy24EarningsComponent {

  constructor(private _screenService: ScreenService, private titleService: Title, private meta: Meta) {
    this.titleService.setTitle('GameStop FY 2024 Earnings Results | gmewiki.org')
    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: 'GameStop’s FY 2024 Earnings Results: Reduced revenue and stores, increasing profitability and equity' },
      { name: 'keywords', content: 'GameStop, GME, GameStop turnaround, GameStop profitability, GameStop FY 2023 profitability, GameStop FY 23 earnings, earnings report, GameStop FY 2024, FY24' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: 'GameStop FY 2024 Earnings Results - gmewiki.org' },
      { property: 'og:description', content: 'GameStop’s FY24: Increasing Profitability and Value' },
      // { property: 'og:image', content: 'https://gmewiki.org/assets/earnings-sankey/fy23-sankey.jpg'}, 
      { property: 'og:url', content: 'https://gmewiki.org/fy24' },
      { property: 'og:type', content: 'website' },
      // { name: 'twitter:card', content: 'summary_large_image' }, // Optimized Twitter card format
      { name: 'twitter:title', content: 'GameStop FY 2024 Earnings Results - gmewiki.org' },
      { name: 'twitter:description', content: 'GameStop’s FY24: Increasing Profitability and Value' },
      // { name: 'twitter:image', content: 'https://yourwebsite.com/assets/images/evergreen-trees.jpg' }
    ]);

  }

  public get isBrowser(): boolean { return this._screenService.isBrowser; }

  public get equityChartConfig(): { article: 'FY24', chart: EarningsChartSelection, } { return { article: 'FY24', chart: EarningsChartSelection.STOCKHOLDERS_EQUITY } }
  public get storesChartConfig(): { article: 'FY24', chart: EarningsChartSelection, } { return { article: 'FY24', chart: EarningsChartSelection.REVENUE_VS_STORES } }
  public get interestIncomeChartConfig(): { article: 'FY24', chart: EarningsChartSelection, } { return { article: 'FY24', chart: EarningsChartSelection.INTEREST_INCOME } }
  public get operatingIncomeConfig(): { article: 'FY24', chart: EarningsChartSelection, } { return { article: 'FY24', chart: EarningsChartSelection.OPERATING_INCOME } }
  public get netIncomeChartConfig(): { article: 'FY24', chart: EarningsChartSelection, } { return { article: 'FY24', chart: EarningsChartSelection.NET_INCOME } }


}

