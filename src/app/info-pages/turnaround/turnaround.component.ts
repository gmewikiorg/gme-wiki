import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from '../../layout/footer/footer.component';
import dayjs from 'dayjs';
import { TurnaroundTableComponent } from './turnaround-table/turnaround-table.component';
import { CommonModule } from '@angular/common';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-turnaround',
  standalone: true,
  imports: [TurnaroundTableComponent, RouterModule, FooterComponent, CommonModule],
  templateUrl: './turnaround.component.html',
  styleUrl: './turnaround.component.scss'
})
export class TurnaroundComponent implements OnInit {
  constructor(
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title, private _screenService: ScreenService) {

      const title = 'GameStop Turnaround: 2021 to present | gmewiki.org'
      const description = 'GameStop Turnaround:  fewer stores, higher value, renewed profitability'
    this.titleService.setTitle(title);


    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: description },
      { name: 'keywords', content: ' GameStop Turnaround 2024' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: 'https://gmewiki.org/turnaround' },
      { property: 'og:image', content: 'https://gmewiki.org/assets/info-pages/turnaround.png' },
      { property: 'og:type', content: 'website' },
    ]);
  }


  public get isBrowser(): boolean { return this._screenService.isBrowser; }
  private _turnaroundDuration: string = '4 years';
  public get turnaroundDuration(): string { return this._turnaroundDuration; }

  ngOnInit() {

  }

}
