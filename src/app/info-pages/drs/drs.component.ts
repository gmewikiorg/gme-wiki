import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { DrsTimelineComponent } from './drs-timeline/drs-timeline.component';
import { RouterModule } from '@angular/router';
import { DrsGmeChartComponent } from './drs-gme-chart/drs-gme-chart.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-drs',
  standalone: true,
  imports: [DrsTimelineComponent, RouterModule, DrsGmeChartComponent, CommonModule],
  templateUrl: './drs.component.html',
  styleUrl: './drs.component.scss'
})
export class DrsComponent {
  constructor(
    // private _loadingService: LoadingService, 
    // private _screenService: ScreenSizeService, 
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this._isBrowser = isPlatformBrowser(this.platformId);
  }

  private _isBrowser: boolean = false;
  public get isBrowser(): boolean { return this._isBrowser; }

}
