import { Component } from '@angular/core';
import { ScreenService } from '../../shared/services/screen-size.service';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from '../../layout/footer/footer.component';
import { EarningsChartComponent } from '../../main-pages/financials/earnings-chart/earnings-chart.component';
import { EarningsChartSelection } from '../../main-pages/financials/choose-earnings-chart/earnings-chart-selection.enum';

@Component({
  selector: 'app-atms',
  standalone: true,
  imports: [CommonModule, FooterComponent, EarningsChartComponent],
  templateUrl: './atms.component.html',
  styleUrl: './atms.component.scss'
})
export class ATMsComponent {


  constructor(private _screenService: ScreenService, private titleService: Title, private meta: Meta) {
    const title = 'GameStop raised cash with ATMs | gmewiki.org';
    const description = 'GameStop raised nearly $3.5 B in 2024 via ATM equity offerings, and $1.6 B in 2021';
    this.titleService.setTitle(title);
    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: description },
      { name: 'keywords', content: 'GameStop, GME, Ryan Cohen, Cash, ATM, ATMs, At-the-market equity offering program' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: 'https://gmewiki.org/2024-atms' },
      { property: 'og:type', content: 'website' },
      // { name: 'twitter:card', content: 'summary_large_image' }, // Optimized Twitter card format
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      // { name: 'twitter:image', content: 'https://yourwebsite.com/assets/images/evergreen-trees.jpg' }
    ]);
  }

  public get isBrowser(): boolean { return this._screenService.isBrowser; }
  public get isMobile(): boolean { return this._screenService.isMobile; }
  public get interestIncomeChartConfig(): { article: 'ATMs', chart: EarningsChartSelection, } { return { article: 'ATMs', chart: EarningsChartSelection.INTEREST_INCOME } }
  public get equityChartConfig(): { article: 'ATMs', chart: EarningsChartSelection, } { return { article: 'ATMs', chart: EarningsChartSelection.STOCKHOLDERS_EQUITY } }
  

}
