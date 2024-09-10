import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TimelineControlsComponent } from './timeline-controls/timeline-controls.component';
import { TimelineChartComponent } from './timeline-chart/timeline-chart.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScreenService } from '../../shared/services/screen-size.service';
import { LoadingService } from '../../shared/services/loading.service';
import { Meta, Title } from '@angular/platform-browser';
import { TimelineItemsComponent } from './timeline-items/timeline-items.component';
import { SettingsService } from '../../shared/services/settings.service';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [TimelineControlsComponent, TimelineItemsComponent, TimelineChartComponent, CommonModule, LoadingComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta,
    private _sizeService: ScreenService,
    private _loadingService: LoadingService,
    private _settingsService: SettingsService,
    private titleService: Title) {
      this.titleService.setTitle('GameStop Interactive Timeline');
      const metaTags = this.meta.getTags('name');
      metaTags.forEach(tag => this.meta.removeTagElement(tag));
      this.meta.addTags([
        { name: 'description', content: 'GameStop Interactive Timeline' },
        { name: 'keywords', content: 'GameStop, GME, timeline, Ryan Cohen, Roaring Kitty, DeepFuckingValue, reddit, superstonk, wallstreetbets, DRS, teddy, moass' },
        { name: 'author', content: 'GME shareholder' },
        { name: 'robots', content: 'index, follow' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { charset: 'UTF-8' }
      ]);
      this.meta.addTags([
        { property: 'og:title', content: 'GameStop Interactive Timeline' },
        { property: 'og:description', content: 'GameStop Interactive Timeline' },
        { property: 'og:url', content: 'https://gmetimeline.org/timeline' },
        { property: 'og:type', content: 'website' },
      ]);
    this._isBrowser = isPlatformBrowser(this.platformId);
  }

  private _isBrowser: boolean;
  private _isLoading: boolean = true;
  public get isBrowser(): boolean { return this._isBrowser; }

  public get isMobile(): boolean { return this._sizeService.isMobile }
  public get showAsList(): boolean { return this._settingsService.chartListIsVertical; }

  public get isNarrow(): boolean { return this._sizeService.screenDimensions.width < 1050; }
  public get isLoading(): boolean { return this._isLoading; }
  // public get isLoading(): boolean { return true; }
  public get loadingMessage(): string { return this._loadingService.loadingMessage; }

  async ngOnInit() {
    this._sizeService.screenDimensions$.subscribe({
      next: (dimensions) => {
        if (dimensions.width < 1050) {
        }
      },
    });

    this._loadingService.loadingMessage = "Building chart...";
    if(this._isBrowser){
      await this._loadingService.loadData$();
      this._isLoading = false;
    }else{
      // console.log("Not browser")
    }

  }

}
