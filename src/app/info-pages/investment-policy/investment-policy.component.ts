import { Component } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ScreenService } from '../../shared/services/screen-size.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-investment-policy',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './investment-policy.component.html',
  styleUrl: './investment-policy.component.scss'
})
export class InvestmentPolicyComponent {
  constructor(private _screenService: ScreenService, private titleService: Title, private meta: Meta) {

    const metaTags = this.meta.getTags('name');
    const description = 'GameStop’s FY 2024 Earnings Results: Reduced revenue and stores, increasing profitability and equity';
    const title = 'GameStop Investment Policy | gmewiki.org'
    this.titleService.setTitle(title)
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: description },
      { name: 'keywords', content: 'GameStop, GME, investment policy' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: 'https://gmewiki.org/fy24' },
      { property: 'og:type', content: 'website' },
      // { name: 'twitter:card', content: 'summary_large_image' }, // Optimized Twitter card format
      { name: 'twitter:title', content: title, },
      { name: 'twitter:description', content: description },

    ]);

  }
}