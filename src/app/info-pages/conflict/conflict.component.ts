import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-conflict',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './conflict.component.html',
  styleUrl: './conflict.component.scss'
})
export class ConflictComponent {
  constructor(
    private meta: Meta,
    private titleService: Title, 
  ) {
    const title = 'GME Financial Conflict | gmewiki.org';
    const description = 'Various market participants are in conflict over the outcome of the GME share price; GME short sellers aim for the price to go down, while GME shareholders aim for the price to go up.';
    this.titleService.setTitle(title)
    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: description },
      { name: 'keywords', content: 'GameStop, GME, conflict, shorts, short selling, shareholders, DRS' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: 'https://gmewiki.org/conflict' },
      { property: 'og:type', content: 'website' },
    ]);
  }
}
