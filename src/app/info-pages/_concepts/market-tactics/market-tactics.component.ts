import { Component } from '@angular/core';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { RouterLink } from "@angular/router";
import { ScreenService } from '../../../shared/services/screen-size.service';

@Component({
  selector: 'app-market-tactics',
  standalone: true,
  imports: [FooterComponent, RouterLink],
  templateUrl: './market-tactics.component.html',
  styleUrl: './market-tactics.component.scss'
})
export class MarketTacticsComponent {
  constructor(private _screenService: ScreenService) {
    const title = "Market Tactics and Manipulation | gmewiki.org";
    const description = 'Market Tactics and Manipulation; how and why the market is manipulated | gmewiki.org';
    const url = 'https://gmewiki.org/market-tactics';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }
}
