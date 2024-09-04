import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  public get isMobile(): boolean { return false; }

  constructor(private meta: Meta, private titleService: Title, private screenService: ScreenService){
    this.titleService.setTitle('About gmetimeline.org');
    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: 'About gmetimeline.org' },
      { name: 'keywords', content: 'GameStop, GME, gmetimeline, timeline, community' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: 'About gmetimeline.org' },
      { property: 'og:description', content: 'About gmetimeline.org' },
      { property: 'og:url', content: 'https://gmetimeline.org/about' },
      { property: 'og:type', content: 'website' },
    ]);
  }

}
