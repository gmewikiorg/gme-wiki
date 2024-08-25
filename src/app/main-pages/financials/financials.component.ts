import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { EarningsChartComponent } from './earnings-chart/earnings-chart.component';
import { EarningsTableComponent } from './earnings-table/earnings-table.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-financials',
  standalone: true,
  imports: [EarningsChartComponent, EarningsTableComponent, CommonModule, RouterModule],
  templateUrl: './financials.component.html',
  styleUrl: './financials.component.scss'
})
export class FinancialsComponent {

  constructor(
    // private _loadingService: LoadingService, 
    // private _screenService: ScreenSizeService, 
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title,
    private screenService: ScreenService,
  ) {
    this.titleService.setTitle('GameStop Income Statements');
    this._isBrowser = isPlatformBrowser(this.platformId);


  }

  public get isMobile(): boolean { return this.screenService.isMobile; }

  private _isBrowser: boolean = false;
  public get isBrowser(): boolean { return this._isBrowser; }
  public get screenWidth(): number { return this.screenService.screenDimensions.width; }


  ngOnInit(){
  }

}
