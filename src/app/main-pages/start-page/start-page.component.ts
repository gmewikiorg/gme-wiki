import { Component } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { OwnershipData } from '../ownership/ownership-data/ownership-data.class';
import { CommonModule } from '@angular/common';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [RouterModule, FooterComponent, CommonModule],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private _screenService: ScreenService) {

    const title = 'Welcome to gmewiki.org - an information tool all about GME and GameStop';
    const description = 'gmewiki.org - a community-driven information tool all about GME and GameStop';
    this.titleService.setTitle(title);


    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: description },
      { name: 'keywords', content: 'gmewiki, gme, wiki, gme wiki, gme information, gamestop information, gamestop, gamestop history, gme history' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: 'https://gmewiki.org/assets/nav-icons/start.png' },
      { property: 'og:url', content: 'https://gmewiki.org/start' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' }, // Optimized Twitter card format
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: 'https://gmewiki.org/assets/nav-icons/start.png'}, 
    ]);
  }

  private _ownershipData: OwnershipData = new OwnershipData();
  private _registeredPercent = (this._ownershipData.totalRegistered / this._ownershipData.tso) * 100;
  public get registeredPercent(): string { return this._registeredPercent.toFixed(0); }

  public get isDarkMode(): boolean { return this._screenService.isDarkMode; }

}
