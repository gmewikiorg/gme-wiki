import { Component} from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent {
constructor(
    private meta: Meta,
    private titleService: Title) {

    this.titleService.setTitle('Welcome to gmewiki.org - an information tool all about GME and GameStop',);


    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: 'gmewiki.org - start here for information about GME' },
      { name: 'keywords', content: 'gmewiki, gme, wiki, gme wiki, gme information, gamestop information, gamestop, gamestop history, gme history' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: 'Welcome to gmewiki.org' },
      { property: 'og:description', content: 'gmewiki.org - a community-driven information tool all about GME and GameStop' },
      { property: 'og:image', content: 'https://gmewiki.org/assets/nav-icons/start.png' },
      { property: 'og:url', content: 'https://gmewiki.org/start' },
      { property: 'og:type', content: 'website' },
    ]);
  }

}
