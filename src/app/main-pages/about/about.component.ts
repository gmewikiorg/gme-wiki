import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ScreenService } from '../../shared/services/screen-size.service';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  public get isMobile(): boolean { return this.screenService.isMobile; }

  constructor(private meta: Meta, private titleService: Title, private screenService: ScreenService){
    this.titleService.setTitle('About gmewiki.org');
    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: 'About gmewiki.org' },
      { name: 'keywords', content: 'GameStop, GME, gmewiki, timeline, community' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: 'About gmewiki.org' },
      { property: 'og:description', content: 'gmewiki.org - a community driven information tool about GME' },
      { property: 'og:url', content: 'https://gmewiki.org/about' },
      { property: 'og:type', content: 'website' },
    ]);
  }

}
