import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { StoresChartComponent } from './stores-chart/stores-chart.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [StoresChartComponent, CommonModule, FooterComponent],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.scss'
})
export class StoresComponent {

    constructor(
      // private _loadingService: LoadingService, 
      // private _screenService: ScreenSizeService, 
      @Inject(PLATFORM_ID) private platformId: Object,
      private meta: Meta,
      private titleService: Title, 
    ) {
      this._isBrowser = isPlatformBrowser(this.platformId);

      const title = 'GameStop Store Count | gmewiki.org';
      const description = 'GameStop continues to reduce its store count.  See charts and more information about GameStop stores'

      this.titleService.setTitle(title);


      const metaTags = this.meta.getTags('name');
      metaTags.forEach(tag => this.meta.removeTagElement(tag));
      this.meta.addTags([
        { name: 'description', content: description },
        { name: 'keywords', content: 'GME Store Count' },
        { name: 'author', content: 'GME shareholder' },
        { name: 'robots', content: 'index, follow' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { charset: 'UTF-8' }
      ]);
      this.meta.addTags([
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: 'https://gmewiki.org/stores' },
        { property: 'og:type', content: 'website' },
      ]);
    }

    private _isBrowser: boolean = false;
    public get isBrowser(): boolean { return this._isBrowser; }
}
