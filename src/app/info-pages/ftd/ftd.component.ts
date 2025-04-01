import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ScreenService } from '../../shared/services/screen-size.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ftd',
  standalone: true,
  imports: [RouterModule,FooterComponent],
  templateUrl: './ftd.component.html',
  styleUrl: './ftd.component.scss'
})
export class FtdComponent {
  constructor(private _screenService: ScreenService, private titleService: Title, private meta: Meta) {
    const title = 'Failure To Deliver (FTD) | gmewiki.org';
    const description = 'FTDs (fails-to-deliver) occur when a party in a stock transaction fails to deliver the security to the buyer by the settlement date';
    this.titleService.setTitle(title)
    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: description, },
      { name: 'keywords', content: 'GameStop, GME, FTD' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: title, },
      { property: 'og:description', content: description, },
      { property: 'og:image', content: 'https://gmewiki.org/assets/info-pages/fy24-earnings-sankey.png'}, 
      { property: 'og:url', content: 'https://gmewiki.org/fy24' },
      { property: 'og:type', content: 'website' },
      // { name: 'twitter:card', content: 'summary_large_image' }, // Optimized Twitter card format
      { name: 'twitter:title', content: 'GameStop FY 2024 Earnings Results - gmewiki.org' },
      { name: 'twitter:description', content: 'GameStop’s FY24: Increasing Profitability and Value' },
      { name: 'twitter:image', content: 'https://gmewiki.org/assets/info-pages/fy24-earnings-sankey.png'}, 
    ]);

  }
}
