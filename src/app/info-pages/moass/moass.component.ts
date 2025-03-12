import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-moass',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './moass.component.html',
  styleUrl: './moass.component.scss'
})
export class MoassComponent {
constructor(
    private meta: Meta,
    private titleService: Title, 
  ) {
    const title = 'MOASS - Mother of all Short Squeezes | gmewiki.org';
    const description = 'MOASS:  A hypothetical event where the price of GME soars astronomically as short sellers close their positions';
    this.titleService.setTitle(title)
    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: description },
      { name: 'keywords', content: 'GameStop, GME, MOASS, short squeeze, mother of all short squeezes' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: 'https://gmewiki.org/moass' },
      { property: 'og:type', content: 'website' },
    ]);
  }
}
