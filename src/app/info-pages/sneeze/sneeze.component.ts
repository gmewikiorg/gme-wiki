import { AfterViewInit, Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { HelpContributeComponent } from '../../shared/components/help-contribute/help-contribute.component';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from '../../layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoadingService } from '../../shared/services/loading.service';
import { TimelineChartComponent } from '../../main-pages/timeline/timeline-chart/timeline-chart.component';
import { CommonModule } from '@angular/common';
import { ScreenService } from '../../shared/services/screen-size.service';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { Subscription, timer } from 'rxjs';
import { TimelineChartDataManagerService } from '../../main-pages/timeline/timeline-chart/timeline-chart-data-manager-service';
import { TimelineAnnotationBoxComponent } from '../../main-pages/timeline/timeline-annotation-box/timeline-annotation-box.component';
import { TimelineControlsService } from '../../main-pages/timeline/timeline-controls/timeline-controls.service';
import { TimelineEvent } from '../../main-pages/timeline/timeline-items/timeline-item/timeline-event.class';

@Component({
  selector: 'app-sneeze',
  standalone: true,
  imports: [FooterComponent, RouterModule, TimelineChartComponent, CommonModule, LoadingComponent, TimelineAnnotationBoxComponent],
  templateUrl: './sneeze.component.html',
  styleUrl: './sneeze.component.scss'
})
export class SneezeComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private _loadingService: LoadingService,
    private _screenService: ScreenService,
    private _chartDataService: TimelineChartDataManagerService,
    private _controlsService: TimelineControlsService,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title) {

    this.titleService.setTitle('GameStop Sneeze of January 2021 | gmewiki.org');


    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: 'January 2021 GME Sneeze or "GME Short Squeeze" - the events of January 2021, whatever happened there, played an important role in the story of GameStop' },
      { name: 'keywords', content: 'GameStop, GME, GME sneeze, GameStop sneeze, GameStop short squeeze, GME short squeeze, wallstreetbets, Roaring Kitty, DeepFuckingValue, gme wiki, gme price' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: 'GameStop Sneeze of January 2021 | gmewiki.org' },
      { property: 'og:description', content: 'January 2021 GME Sneeze or "GME Short Squeeze" - the events of January 2021, whatever happened there, played an important role in the story of GameStop' },
      { property: 'og:url', content: 'https://gmewiki.org/sneeze' },
      { property: 'og:type', content: 'website' },
    ]);
  }
  ngOnDestroy(): void {
    this._chartDataService.stopAnimation();
    this._animateSubscription?.unsubscribe();
    this._controlsSubscription?.unsubscribe();
  }
  ngAfterViewInit(): void {

  }

  private _chartIsLoaded: boolean = false;
  private _showAnnotationBox: boolean = false;
  public get chartIsLoaded(): boolean { return this._chartIsLoaded; }
  public get isBrowser(): boolean { return this._screenService.isBrowser; }
  public get isMobile(): boolean { return this._screenService.isMobile; }
  public get showAnnotationBox(): boolean { return this._showAnnotationBox; }

  async ngOnInit(): Promise<void> {
    await this._loadingService.loadData$();
    this._controlsService.setPeriod('SNEEZE');
    this._controlsService.removeAnnotation();
    if (this._screenService.isBrowser) {
      this._chartIsLoaded = true;

    }
    this._controlsSubscription = this._controlsService.timelineItemAnnotation$.subscribe((timelineEvent: TimelineEvent | null | undefined) => {
      if (timelineEvent !== null && timelineEvent !== undefined) {
        this._showAnnotationBox = true;
      } else {
        this._showAnnotationBox = false;
      }
    })
  }

  
  private _controlsSubscription: Subscription | null = null;
  private _animateSubscription: Subscription | null = null;
  public onClick() {
    this._animateButtonDisabled = true;
    this._chartDataService.initiateSneezeAnimation();
    this._animateSubscription = this._chartDataService.currentlyAnimating$.subscribe((animating: boolean) => {
      if (animating === false) {
        this._animateButtonDisabled = false;
        this._animateSubscription?.unsubscribe();
      }
    })
  }

  private _animateButtonDisabled: boolean = false;
  public get animateButtonDisabled(): boolean { return this._animateButtonDisabled; }
}
