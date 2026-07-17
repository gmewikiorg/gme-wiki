import { Component } from '@angular/core';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';
import { ScreenService } from '../../../shared/services/screen-size.service';

@Component({
  selector: 'app-equity',
  standalone: true,
  imports: [],
  templateUrl: './equity.component.html',
  styleUrl: './equity.component.scss'
})
export class EquityComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'GameStop Equity | gmewiki.org',
    description: 'What is the equity value of GameStop?',
    url: 'https://gmewiki.org/equity',
    image: '',
    githubPageUrl: 'info-pages/_corporate/equity/equity.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

  public get gmeShareValue(): number { return 30; }
  // public get assetsValue(): number { return }

}
