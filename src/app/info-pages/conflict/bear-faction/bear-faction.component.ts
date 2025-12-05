import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';

@Component({
  selector: 'app-bear-faction',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './bear-faction.component.html',
  styleUrl: './bear-faction.component.scss'
})
export class BearFactionComponent {
  constructor(private _screenService: ScreenService) {
    const title = "GME Bear Faction | gmewiki.org";
    const description = 'The faction of market participants that are bearish on GME and have a financial interest in the price of GME going down';
    const url = 'https://gmewiki.org/bear-faction';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);

  }
}
