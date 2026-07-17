import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../../layout/footer/footer.component';
import { ScreenService } from '../../../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../../../shared/components/information-page.interface';

@Component({
  selector: 'app-bull-faction',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './bull-faction.component.html',
  styleUrl: './bull-faction.component.scss'
})
export class BullFactionComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: "GME Bull Faction | gmewiki.org",
    description: 'The faction of market participants that are bullish on GME and have a financial interest in the price of GME going up',
    url: 'https://gmewiki.org/bull-faction',
    image: '',
    githubPageUrl: 'info-pages/_concepts/conflict/bull-faction/bull-faction.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }
}
