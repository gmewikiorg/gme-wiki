import { Component } from '@angular/core';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { RouterLink } from "@angular/router";
import { ScreenService } from '../../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-market-tactics',
  standalone: true,
  imports: [FooterComponent, RouterLink],
  templateUrl: './market-tactics.component.html',
  styleUrl: './market-tactics.component.scss'
})
export class MarketTacticsComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: "Market Tactics and Manipulation | gmewiki.org",
    description: 'Market Tactics and Manipulation; how and why the market is manipulated | gmewiki.org',
    url: 'https://gmewiki.org/market-tactics',
    image: '',
    githubPageUrl: 'info-pages/_concepts/market-tactics/market-tactics.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

}
