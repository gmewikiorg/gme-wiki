import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
constructor(
    // private _loadingService: LoadingService, 
    // private _screenService: ScreenSizeService, 
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta,
    private titleService: Title, 
  ) {
    this.titleService.setTitle('gmewiki.org - GME FAQ')
    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: 'Explore our comprehensive FAQ page about GameStop (GME) to find answers to your most pressing questions. From stock performance and corporate history to key figures like Ryan Cohen and Keith Gill, we cover everything you need to know. Dive into topics such as revenue, financials, DRS, and the pivotal events that shaped GME’s story.' },
      { name: 'keywords', 
        content: 'GME, GameStop, GameStop stock, GME stock, buy GME, invest in GME, GameStop FAQ, GME FAQ, GameStop stock price, GME stock price, GameStop history, GME short squeeze, GME Reddit, GME investment, GameStop company info, GameStop revenue, GME stock analysis, GameStop leadership, GME dividend, GME stock split, GME market cap, GameStop competitors, GameStop e-commerce, GME short interest, GameStop trading volume, GME stock performance, GameStop CEO, GameStop major shareholders, GameStop quarterly earnings, GME stock risks, GameStop retail stores, GameStop trade-in program, GameStop pre-orders, GameStop loyalty program, GameStop legal issues, GME SEC response, GameStop stock controversy, DRS, Ryan Cohen, Keith Gill, Roaring Kitty, Larry Cheng, GameStop DRS, GME DRS, GameStop Ryan Cohen, GME Ryan Cohen, GameStop Keith Gill, GME Keith Gill, GameStop Roaring Kitty, GME Roaring Kitty, GameStop Larry Cheng, GME Larry Cheng, GameStop revenue, GME revenue, GameStop earnings, GME earnings, GameStop financials, GME financials, GameStop history, GME history, GameStop equity, GME equity, GameStop debt, GME debt, GameStop assets, GME assets, GME stockholders, GameStop shareholder equity, GameStop quarterly earnings, GME balance sheet, GameStop financial reports, GME stock analysis, GME investment, GameStop cash flow, GME debt analysis, GameStop financial health, GameStop revenue growth, GME financial performance, Ryan Cohen leadership, GameStop board members, GameStop strategy, GME direct registration, GameStop short interest, GameStop investor relations, GME earnings report' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: 'gmewiki.org - GME FAQ' },
      { property: 'og:description', content: 'Explore our comprehensive FAQ page about GameStop (GME) to find answers to your most pressing questions. From stock performance and corporate history to key figures like Ryan Cohen and Keith Gill, we cover everything you need to know. Dive into topics such as revenue, financials, DRS, and the pivotal events that shaped GME’s story.' },
      { property: 'og:url', content: 'https://gmewiki.org/faq' },
      { property: 'og:type', content: 'website' },
    ]);
  }
}
