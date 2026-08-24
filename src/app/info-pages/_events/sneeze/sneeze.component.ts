import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoadingService } from '../../../shared/services/loading.service';
import { CommonModule } from '@angular/common';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { Subscription } from 'rxjs';
import { TimelineChartDataManagerService } from '../../../main-pages/timeline/timeline-chart/timeline-chart-data-manager-service';
import { TimelineControlsService } from '../../../main-pages/timeline/timeline-controls/timeline-controls.service';
import { TimelineEventOLD } from '../../../main-pages/timeline/timeline-items/timeline-item/timeline-event.class';
import { SneezeChartComponent } from './sneeze-chart/sneeze-chart.component';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-sneeze',
  standalone: true,
  imports: [FooterComponent, RouterModule, CommonModule, SneezeChartComponent],
  templateUrl: './sneeze.component.html',
  styleUrl: './sneeze.component.scss'
})
export class SneezeComponent implements OnInit, AfterViewInit, OnDestroy, InfoPage {


  infoPageProperties: InfoPageProperties = {
    title: 'GameStop Sneeze of January 2021 | gmewiki.org',
    description: 'Something unprecendented happened. Wall Street responded drastically.',
    url: 'https://gmewiki.org/sneeze',
    image: '',
    githubPageUrl: 'info-pages/_events/sneeze/sneeze.component.html',
  }
  constructor(
    private _loadingService: LoadingService,
    private _screenService: ScreenService,
    private _chartDataService: TimelineChartDataManagerService,
    private _controlsService: TimelineControlsService,) {

    this._screenService.setPageInfo(this.infoPageProperties);
  }
  ngOnDestroy(): void {
    this._chartDataService.stopAnimation();
    this._animateSubscription?.unsubscribe();
    this._controlsSubscription?.unsubscribe();
  }
  ngAfterViewInit(): void {
    this._controlsService.setPeriod('SNEEZE');
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
    this._controlsSubscription = this._controlsService.timelineItemAnnotation$.subscribe((timelineEvent: TimelineEventOLD | null | undefined) => {
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
