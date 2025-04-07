import { Component } from '@angular/core';
import { ScreenService } from '../../shared/services/screen-size.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../layout/footer/footer.component';
import { EarningsChartComponent } from '../../main-pages/financials/earnings-chart/earnings-chart.component';
import { EarningsChartSelection } from '../../main-pages/financials/choose-earnings-chart/earnings-chart-selection.enum';

@Component({
  selector: 'app-atms',
  standalone: true,
  imports: [CommonModule, FooterComponent, EarningsChartComponent],
  templateUrl: './atms.component.html',
  styleUrl: './atms.component.scss'
})
export class ATMsComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'GameStop raised cash with ATMs | gmewiki.org';
    const description = 'GameStop raised nearly $3.5 B in 2024 via ATM equity offerings, and $1.6 B in 2021';
    const url = 'https://gmewiki.org/atms';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }

  public get isBrowser(): boolean { return this._screenService.isBrowser; }
  public get isMobile(): boolean { return this._screenService.isMobile; }
  public get interestIncomeChartConfig(): { article: 'ATMs', chart: EarningsChartSelection, } { return { article: 'ATMs', chart: EarningsChartSelection.INTEREST_INCOME } }
  public get equityChartConfig(): { article: 'ATMs', chart: EarningsChartSelection, } { return { article: 'ATMs', chart: EarningsChartSelection.STOCKHOLDERS_EQUITY } }


}
