import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { DrsTimelineComponent } from './drs-timeline/drs-timeline.component';
import { RouterModule } from '@angular/router';
import { DrsGmeChartComponent } from './drs-gme-chart/drs-gme-chart.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { OwnershipData } from '../../main-pages/ownership/ownership-data.class';

@Component({
  selector: 'app-drs',
  standalone: true,
  imports: [DrsTimelineComponent, RouterModule, DrsGmeChartComponent, CommonModule],
  templateUrl: './drs.component.html',
  styleUrl: './drs.component.scss'
})
export class DrsComponent {

  private _ownershipData: OwnershipData = new OwnershipData();
  private _drsPercent = (this._ownershipData.drsData.value / this._ownershipData.tso) * 100;

  private _recentDrsUpdate = new OwnershipData();
  public get recentDrsUpdate(): OwnershipData { return this._recentDrsUpdate; }

  constructor(
    // private _loadingService: LoadingService, 
    // private _screenService: ScreenSizeService, 
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this._isBrowser = isPlatformBrowser(this.platformId);
  }

  private _isBrowser: boolean = false;
  public get isBrowser(): boolean { return this._isBrowser; }

  public get drsPercent(): string { return this._drsPercent.toFixed(0); }

}
