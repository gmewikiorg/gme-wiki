import { Component, HostListener, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { OwnershipData } from './ownership-data/ownership-data.class';
import dayjs from 'dayjs';
import { RouterModule } from '@angular/router';
import { OwnershipChartComponent } from './ownership-chart/ownership-chart.component';
import { OwnershipTableComponent } from './ownership-table/ownership-table.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-ownership',
  standalone: true,
  imports: [CommonModule, RouterModule, OwnershipChartComponent, OwnershipTableComponent, FooterComponent],
  templateUrl: './ownership.component.html',
  styleUrl: './ownership.component.scss'
})
export class OwnershipComponent {


  constructor(
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title) {

    const title = 'GameStop ownership (as of ' + this.lastUpdated + ') | gmewiki.org';
    const description = 'Chart and table with data sources providing a breakdown of GME ownership';
    this.titleService.setTitle(title);
    this._isBrowser = isPlatformBrowser(this.platformId);

    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: description },
      { name: 'keywords', content: 'GameStop, GME, ownership, shares' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: 'https://gmewiki.org/assets/main-pages/ownership.png' },
      { property: 'og:url', content: 'https://gmewiki.org/ownership' },
      { property: 'og:type', content: 'website' },
    ]);
  }

  private _isBrowser: boolean = false;
  public get isBrowser(): boolean { return this._isBrowser; }


  @HostListener('mousemove', ['$event']) onMousemove(event: MouseEvent) { }

  public get isLoading(): boolean { return false; }

  public get lastUpdated(): string {
    return dayjs((new OwnershipData()).lastUpdateYYYYMMDD).format('MMMM D, YYYY')
  }

  async ngOnInit() {

  }




}
