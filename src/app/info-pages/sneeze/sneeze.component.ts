import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { HelpContributeComponent } from '../../shared/components/help-contribute/help-contribute.component';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from '../../layout/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sneeze',
  standalone: true,
  imports: [HelpContributeComponent, FooterComponent, RouterModule],
  templateUrl: './sneeze.component.html',
  styleUrl: './sneeze.component.scss'
})
export class SneezeComponent {
  constructor(
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title) {

    this.titleService.setTitle('GameStop Sneeze of January 2021 | gmewiki.org');


    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: 'January 2021 GME Sneeze or "GME Short Squeeze" - the events of January 2021, whatever happened there, played an important role in the story of GameStop' },
      { name: 'keywords', content: 'GameStop, GME, GME sneeze, GameStop sneeze, GameStop short squeeze, GME short squeeze, wallstreetbets, Roaring Kitty, DeepFuckingValue, gme wiki, gme price' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: 'GameStop Sneeze of January 2021 | gmewiki.org' },
      { property: 'og:description', content: 'January 2021 GME Sneeze or "GME Short Squeeze" - the events of January 2021, whatever happened there, played an important role in the story of GameStop' },
      { property: 'og:url', content: 'https://gmewiki.org/sneeze' },
      { property: 'og:type', content: 'website' },
    ]);
  }
}
