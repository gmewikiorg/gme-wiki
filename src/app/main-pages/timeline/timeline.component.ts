import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TimelineControlsComponent } from './timeline-controls/timeline-controls.component';
import { TimelineChartComponent } from './timeline-chart/timeline-chart.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScreenService } from '../../shared/services/screen-size.service';
import { LoadingService } from '../../shared/services/loading.service';
import { Meta, Title } from '@angular/platform-browser';
import { SettingsService } from '../../shared/services/settings.service';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { TimelineContentComponent } from './timeline-content/timeline-content.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { TimelineAnnotationBoxComponent } from './timeline-annotation-box/timeline-annotation-box.component';
import { TimelineControlsService } from './timeline-controls/timeline-controls.service';
import { TimelineEvent } from './timeline-items/timeline-item/timeline-event.class';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [
    TimelineChartComponent, CommonModule, LoadingComponent,
    TimelineContentComponent, FooterComponent, TimelineControlsComponent, TimelineAnnotationBoxComponent
  ],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta,
    private _sizeService: ScreenService,
    private _loadingService: LoadingService,
    private _controlsService: TimelineControlsService,
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
      { property: 'og:title', content: 'gmewiki.org - Interactive GME Timeline' },
      { property: 'og:description', content: 'GME interactive annotated timeline and chart tools' },
      { property: 'og:image', content: 'https://gmewiki.org/assets/misc/timeline.png' },
      { property: 'og:url', content: 'https://gmewiki.org/timeline' },
      { property: 'og:type', content: 'website' },
    ]);
    this._isBrowser = isPlatformBrowser(this.platformId);
  }

  private _isBrowser: boolean;
  private _chartIsLoaded: boolean = false;
  private _showAnnotationBox: boolean = false;

  private _isLoading: boolean = true;
  public get chartIsLoaded(): boolean { return this._chartIsLoaded; }
  public get showAnnotationBox(): boolean { return this._showAnnotationBox; }

  public get isBrowser(): boolean { return this._isBrowser; }

  public get isMobile(): boolean { return this._sizeService.isMobile }

  public get isNarrow(): boolean { return this._sizeService.screenDimensions.width < 1050; }
  public get isLoading(): boolean { return this._isLoading; }
  public get loadingMessage(): string { return this._loadingService.loadingMessage; }

  private _chartTitle: string = 'GME Sneeze & Turnaround timeline - from 2020 to present';
  public get chartTitle(): string { return this._chartTitle; }

  async ngOnInit() {
    this._sizeService.screenDimensions$.subscribe({
      next: (dimensions) => {
        if (dimensions.width < 1050) {
        }
      },
    });

    this._controlsService.period$.subscribe((period)=>{
      if(period === 'CURRENT'){
        this._chartTitle = 'GME Sneeze & Turnaround timeline - from 2020 to present';
      }else if(period === 'HISTORIC'){
        this._chartTitle = 'GME Historic timeline';
      }else if(period === '2_YEARS'){
        this._chartTitle = 'GME - timeline of recent 2 years';
      }
    })

    this._loadingService.loadingMessage = "Building chart...";
    if (this._isBrowser) {
      await this._loadingService.loadData$();

      this._isLoading = false;
      this._chartIsLoaded = true;
    } else {
      // console.log("Not browser")
    }
    this._controlsService.timelineItemAnnotation$.subscribe((timelineEvent: TimelineEvent | null)=>{
      if(timelineEvent !== null){
        this._showAnnotationBox = true;
      }else{
        this._showAnnotationBox = false;  
      }
    })
  }

}
