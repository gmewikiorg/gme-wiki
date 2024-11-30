import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-social-media',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.scss'
})
export class SocialMediaComponent {
  constructor(private meta: Meta, private titleService: Title){
    this.titleService.setTitle('Social Media for GME Shareholders');
    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: 'Social Media for GME Shareholders' },
      { name: 'keywords', content: 'GameStop, GME, social media, X, Twitter, Reddit, fediverse, Spaces, YouTube, Roaring Kitty, DRS, Discord, X Spaces, federated apps, Lemmy, subreddits, superstonk, teddy' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: 'Social Media for GME Shareholders' },
      { property: 'og:description', content: 'Social Media for GME shareholders' },
      { property: 'og:url', content: 'https://gmetimeline.org/social-media' },
      { property: 'og:type', content: 'website' },
    ]);
  }
}
