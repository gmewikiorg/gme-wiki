import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { StoresChartComponent } from './stores-chart/stores-chart.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [StoresChartComponent, CommonModule, FooterComponent],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.scss'
})
export class StoresComponent {

    constructor(
      // private _loadingService: LoadingService, 
      // private _screenService: ScreenSizeService, 
      @Inject(PLATFORM_ID) private platformId: Object,
      private meta: Meta,
      private titleService: Title, 
    ) {
      this._isBrowser = isPlatformBrowser(this.platformId);

    }

    private _isBrowser: boolean = false;
    public get isBrowser(): boolean { return this._isBrowser; }
}
