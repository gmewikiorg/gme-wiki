import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { StoresChartComponent } from './stores-chart/stores-chart.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [StoresChartComponent, CommonModule, RouterModule, FooterComponent],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.scss'
})
export class StoresComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'GameStop Store Count | gmewiki.org',
    description: 'GameStop continues to reduce its store count.  See charts and more information about GameStop stores',
    url: 'https://gmewiki.org/stores',
    image: 'https://gmewiki.org/assets/info-pages/stores-page.png',
    githubPageUrl: 'info-pages/_corporate/stores/stores.component.html',
  }

  constructor(private _screenService: ScreenService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this._isBrowser = isPlatformBrowser(this.platformId);
    this._screenService.setPageInfo(this.infoPageProperties);
  }

  private _isBrowser: boolean = false;
  public get isBrowser(): boolean { return this._isBrowser; }
}
