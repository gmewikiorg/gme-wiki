import { Component } from '@angular/core';
import { EarningsTableComponent } from './earnings-table/earnings-table.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScreenService } from '../../shared/services/screen-size.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChooseEarningsChartComponent } from './choose-earnings-chart/choose-earnings-chart.component';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-financials',
  standalone: true,
  imports: [ChooseEarningsChartComponent, EarningsTableComponent, CommonModule, RouterModule, FontAwesomeModule, FooterComponent],
  templateUrl: './financials.component.html',
  styleUrl: './financials.component.scss'
})
export class FinancialsComponent {

  constructor(private _screenService: ScreenService) {
    const title = 'GameStop Earnings and Financial Information | gmewiki.org';
    const description = 'Interactive chart of GameStop quarterly and annual earnings information; information pertaining to GameStop raising cash via ATM equity offerings';
    const url = 'https://gmewiki.org/earnings';
    const image = 'https://gmewiki.org/assets/main-pages/earnings.png';
    this._screenService.setPageInfo(title, description, url, image);
    this._isBrowser = this._screenService.isBrowser;
  }



  public get isMobile(): boolean { return this._screenService.isMobile; }

  private _isBrowser: boolean = false;
  public get isBrowser(): boolean { return this._isBrowser; }
  public get screenWidth(): number { return this._screenService.screenDimensions.width; }


  ngOnInit() {
  }



}
