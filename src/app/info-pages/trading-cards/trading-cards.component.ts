import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-trading-cards',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './trading-cards.component.html',
  styleUrl: './trading-cards.component.scss'
})
export class TradingCardsComponent {
  constructor(private titleService: Title, private meta: Meta) {
    const title = 'Trading Cards at GameStop | gmewiki.org';
    this.titleService.setTitle(title);
    const description = 'Starting in 2024, GameStop has made efforts to expand into the market of graded trading cards';

    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: description },
      { name: 'keywords', content: 'GameStop, GME, gme wiki, wiki, trading cards' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: title, },
      { property: 'og:description', content: description },
      { property: 'og:url', content: 'https://gmewiki.org/sneeze' },
      { property: 'og:type', content: 'website' },
    ]);
  }
}
