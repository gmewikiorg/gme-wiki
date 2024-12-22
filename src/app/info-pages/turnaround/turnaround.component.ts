import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { HelpContributeComponent } from '../../shared/components/help-contribute/help-contribute.component';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-turnaround',
  standalone: true,
  imports: [HelpContributeComponent, RouterModule],
  templateUrl: './turnaround.component.html',
  styleUrl: './turnaround.component.scss'
})
export class TurnaroundComponent {
  constructor(
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title) {

    this.titleService.setTitle('GameStop Turnaround');


    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: 'GameStop Turnaround' },
      { name: 'keywords', content: 'GameStop, GME, Turnaround, Ryan Cohen, Roaring Kitty, DeepFuckingValue, GameStop Turnaround, GameStop Turnaround 2021, GameStop Turnaround 2022, GameStop Turnaround 2023, GameStop Turnaround 2024' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: 'GameStop Turnaround' },
      { property: 'og:description', content: 'GameStop Turnaround' },
      { property: 'og:url', content: 'https://gmetimeline.org/turnaround' },
      { property: 'og:type', content: 'website' },
    ]);
  }

}
