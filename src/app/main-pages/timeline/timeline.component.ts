import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TimelineControlsComponent } from './timeline-controls/timeline-controls.component';
import { TimelineChartComponent } from './timeline-chart/timeline-chart.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScreenService } from '../../shared/services/screen-size.service';
import { LoadingService } from '../../shared/services/loading.service';
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
    private _screenService: ScreenService,
    private _loadingService: LoadingService,
    private _controlsService: TimelineControlsService,) {
    const title = 'GameStop Interactive Timeline | gmewiki.org';
    const description = 'GME interactive annotated timeline and chart tools';
    const url = 'https://gmewiki.org/timeline';
    const image = 'https://gmewiki.org/assets/main-pages/timeline.png';
    this._screenService.setPageInfo(title, description, url, image);
    this._isBrowser = isPlatformBrowser(this.platformId);
  }

  private _isBrowser: boolean;
  private _chartIsLoaded: boolean = false;
  private _showAnnotationBox: boolean = false;

  private _isLoading: boolean = true;
  public get chartIsLoaded(): boolean { return this._chartIsLoaded; }
  public get showAnnotationBox(): boolean { return this._showAnnotationBox; }

  public get isBrowser(): boolean { return this._isBrowser; }

  public get isMobile(): boolean { return this._screenService.isMobile }

  public get isNarrow(): boolean { return this._screenService.screenDimensions.width < 1050; }
  public get isLoading(): boolean { return this._isLoading; }
  public get loadingMessage(): string { return this._loadingService.loadingMessage; }

  private _chartTitle: string = 'GME Sneeze & Turnaround timeline - from 2020 to present';
  public get chartTitle(): string { return this._chartTitle; }

  async ngOnInit() {
    this._controlsService.setPeriod('CURRENT');
    this._screenService.screenDimensions$.subscribe({
      next: (dimensions) => {
        if (dimensions.width < 1050) {
        }
      },
    });

    this._controlsService.period$.subscribe((period) => {
      if (period === 'CURRENT') {
        this._chartTitle = 'GME Sneeze & Turnaround timeline - from 2020 to present';
      } else if (period === 'HISTORIC') {
        this._chartTitle = 'GME Historic timeline';
      } else if (period === '2_YEARS') {
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
    this._controlsService.timelineItemAnnotation$.subscribe((timelineEvent: TimelineEvent | null | undefined) => {
      if (timelineEvent !== null && timelineEvent !== undefined) {
        this._showAnnotationBox = true;
      } else {
        this._showAnnotationBox = false;
      }
    })
  }

}
