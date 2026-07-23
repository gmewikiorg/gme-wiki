import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScreenService } from '../../shared/services/screen-size.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ChooseEarningsChartComponent } from './earnings-chart/choose-earnings-chart/choose-earnings-chart.component';
import { QuarterlyEarningsDataTableComponent } from './quarterly-earnings-data-table/quarterly-earnings-data-table.component';
import { EarningsTableComponent } from './earnings-summary-table/earnings-summary-table.component';
import { InfoPage, InfoPageProperties } from '../../shared/components/information-page.interface';
import { AssetsCompositionComponent } from './assets-composition/assets-composition.component';

@Component({
  selector: 'app-financials',
  standalone: true,
  imports: [ChooseEarningsChartComponent, EarningsTableComponent, CommonModule, RouterModule, 
    FontAwesomeModule, FooterComponent, QuarterlyEarningsDataTableComponent, AssetsCompositionComponent],
  templateUrl: './financials.component.html',
  styleUrl: './financials.component.scss'
})
export class FinancialsComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'GameStop Earnings and Financial Information | gmewiki.org',
    description: 'Interactive chart of GameStop quarterly and annual earnings information; information pertaining to GameStop raising cash via ATM equity offerings',
    url: 'https://gmewiki.org/earnings',
    image: 'https://gmewiki.org/assets/main-pages/earnings.png',
    githubPageUrl: 'main-pages/financials/financials.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
    this._isBrowser = this._screenService.isBrowser;
  }


  public get isMobile(): boolean { return this._screenService.isMobile; }

  private _isBrowser: boolean = false;
  public get isBrowser(): boolean { return this._isBrowser; }
  public get screenWidth(): number { return this._screenService.screenDimensions.width; }


  ngOnInit() {
  }



}
