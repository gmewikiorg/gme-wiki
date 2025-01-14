import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { HelpContributeComponent } from '../../shared/components/help-contribute/help-contribute.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sneeze',
  standalone: true,
  imports: [HelpContributeComponent],
  templateUrl: './sneeze.component.html',
  styleUrl: './sneeze.component.scss'
})
export class SneezeComponent {
  constructor(
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title) {

    this.titleService.setTitle('GameStop Sneeze');


    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: 'January 2021 GameStop GME Sneeze' },
      { name: 'keywords', content: 'GameStop, GME, GME sneeze, GameStop sneeze, GameStop short squeeze, GME short squeeze, wallstreetbets, Roaring Kitty, DeepFuckingValue' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: 'January 2021 GameStop GME Sneeze' },
      { property: 'og:description', content: 'January 2021 GameStop GME Sneeze' },
      { property: 'og:url', content: 'https://gmewiki.org/sneeze' },
      { property: 'og:type', content: 'website' },
    ]);
  }
}
