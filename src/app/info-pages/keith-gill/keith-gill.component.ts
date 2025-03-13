import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-keith-gill',
  standalone: true,
  imports: [RouterModule, CommonModule, FooterComponent],
  templateUrl: './keith-gill.component.html',
  styleUrl: './keith-gill.component.scss'
})
export class KeithGillComponent {
constructor(
    private meta: Meta,
    private titleService: Title, 
  ) {
    const title = 'Keith Gill, aka Roaring Kitty, aka DeepFuckingValue | gmewiki.org';
    const description = 'Keith Gill, aka Roaring Kitty, aka DeepFuckingValue, is somebody with great interest in GME | gmewiki.org';
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
