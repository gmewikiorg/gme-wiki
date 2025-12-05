import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';

@Component({
  selector: 'app-bull-faction',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './bull-faction.component.html',
  styleUrl: './bull-faction.component.scss'
})
export class BullFactionComponent {
  constructor(private _screenService: ScreenService) {
    const title = "GME Bull Faction | gmewiki.org";
    const description = 'The faction of market participants that are bullish on GME and have a financial interest in the price of GME going up';
    const url = 'https://gmewiki.org/bull-faction';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);

  }
}
