import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-media-omits-drs',
  standalone: true,
  imports: [],
  templateUrl: './media-omits-drs.component.html',
  styleUrl: './media-omits-drs.component.scss'
})
export class MediaOmitsDrsComponent {
  constructor(
    private meta: Meta,
    private titleService: Title, 
  ) {
    const title = 'Media Omission of DRS | gmewiki.org';
    const description = 'Information about DRS and registered shares of GME is not provided by most commonly used financial information sources.  Financial media is incentivized to not ever bring attention to DRS.';
    this.titleService.setTitle(title)
    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: description },
      { name: 'keywords', content: 'GameStop, GME, DRS, DRS GME, DRSGME, Direct Registration System, DSPP, Computershare, transfer agent' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: 'https://gmewiki.org/media-omits-drs' },
      { property: 'og:type', content: 'website' },
    ]);
  }
}
