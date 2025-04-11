import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScreenService } from '../../shared/services/screen-size.service';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-trading-cards',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './trading-cards.component.html',
  styleUrl: './trading-cards.component.scss'
})
export class TradingCardsComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'Graded Trading Cards at GameStop | gmewiki.org';
    const description = 'Starting in 2024, GameStop has made efforts to expand into the market of graded trading cards ';
    const url = 'https://gmewiki.org/trading-cards';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }
}
