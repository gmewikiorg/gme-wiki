import { Component, HostListener, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OwnershipData } from './ownership-data.class';
import dayjs from 'dayjs';
import { RouterModule } from '@angular/router';
import { OwnershipChartComponent } from './ownership-chart/ownership-chart.component';
import { OwnershipTableComponent } from './ownership-table/ownership-table.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-ownership',
  standalone: true,
  imports: [CommonModule, RouterModule, OwnershipChartComponent, OwnershipTableComponent],
  templateUrl: './ownership.component.html',
  styleUrl: './ownership.component.scss'
})
export class OwnershipComponent {


  constructor(
    // private _loadingService: LoadingService, 
    // private _screenService: ScreenSizeService, 
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title) {

    this.titleService.setTitle('GameStop ownership (as of '+this.lastUpdated+')',);
    this._isBrowser = isPlatformBrowser(this.platformId);
  }

  private _isBrowser: boolean;
  public get isBrowser(): boolean { return this._isBrowser; }


  @HostListener('mousemove', ['$event']) onMousemove(event: MouseEvent) { }

  public get isLoading(): boolean { return false; }
    // public get isLoading(): boolean { return this._loadingService.dataIsLoading; }

  // public get isMobile(): boolean { return this._screenService.isMobile; }

  // public get loadingMessage(): string { return this._loadingService.loadingMessage; }

  public get lastUpdated(): string { 
    return dayjs((new OwnershipData()).lastUpdateYYYYMMDD).format('MMMM D, YYYY')
  }

  async ngOnInit() {
    // await this._loadingService.loadData$();
  }




}
