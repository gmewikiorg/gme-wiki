import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sneeze-vs-squeeze',
  standalone: true,
  imports: [RouterModule,FooterComponent],
  templateUrl: './sneeze-vs-squeeze.component.html',
  styleUrl: './sneeze-vs-squeeze.component.scss'
})
export class SneezeVsSqueezeComponent {

  constructor(private titleService: Title, private meta: Meta){
    const title = '"GME Sneeze" vs "GME Short Squeeze" | gmewiki.org';
    const description = 'The events of January 2021 pertaining to GME are often referred to as a short squeeze.  An alternatively held view is that it was not a genuine short squeeze.'
    this.titleService.setTitle(title);

    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: description },
      { name: 'keywords', content: 'GameStop, GME, GME sneeze, GameStop sneeze, GameStop short squeeze, GME short squeeze, wallstreetbets, Roaring Kitty, DeepFuckingValue, gme wiki, gme price' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: 'https://gmewiki.org/sneeze' },
      { property: 'og:type', content: 'website' },
    ]);
  }
}
