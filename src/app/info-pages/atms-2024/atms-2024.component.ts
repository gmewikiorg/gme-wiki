import { Component } from '@angular/core';
import { ScreenService } from '../../shared/services/screen-size.service';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-atms-2024',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './atms-2024.component.html',
  styleUrl: './atms-2024.component.scss'
})
export class Atms2024Component {


  constructor(private _screenService: ScreenService, private titleService: Title, private meta: Meta) {
    this.titleService.setTitle('GameStop raises cash in 2024 | gmewiki.org')
    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: 'GameStop raised nearly $3.5 B in 2024 via ATM equity offerings' },
      { name: 'keywords', content: 'GameStop, GME, Ryan Cohen, Cash, ATM, ATMs, At-the-market equity offering program' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: 'GameStop raises cash in 2024 via ATM equity offerings | gmewiki.org' },
      { property: 'og:description', content: 'GameStop raised nearly $3.5 B in 2024 via ATM equity offerings' },
      { property: 'og:url', content: 'https://gmewiki.org/2024-atms' },
      { property: 'og:type', content: 'website' },
      // { name: 'twitter:card', content: 'summary_large_image' }, // Optimized Twitter card format
      { name: 'twitter:title', content: 'GameStop raises cash in 2024 via ATM equity offerings | gmewiki.org' },
      { name: 'twitter:description', content: 'GameStop raised nearly $3.5 B in 2024 via ATM equity offerings' },
      // { name: 'twitter:image', content: 'https://yourwebsite.com/assets/images/evergreen-trees.jpg' }
    ]);
  }

  public get isMobile(): boolean { return this._screenService.isMobile; }
}
