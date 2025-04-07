import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { StoresChartComponent } from './stores-chart/stores-chart.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FooterComponent } from '../../layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [StoresChartComponent, CommonModule, RouterModule, FooterComponent],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.scss'
})
export class StoresComponent {

  constructor(private _screenService: ScreenService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this._isBrowser = isPlatformBrowser(this.platformId);
    const title = 'GameStop Store Count | gmewiki.org';
    const description = 'GameStop continues to reduce its store count.  See charts and more information about GameStop stores'
    const url = 'https://gmewiki.org/stores';
    const image = 'https://gmewiki.org/assets/info-pages/stores-page.png';
    this._screenService.setPageInfo(title, description, url, image);
  }

  private _isBrowser: boolean = false;
  public get isBrowser(): boolean { return this._isBrowser; }
}
