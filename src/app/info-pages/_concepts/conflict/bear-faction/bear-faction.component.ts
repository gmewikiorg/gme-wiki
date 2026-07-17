import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../../layout/footer/footer.component';
import { ScreenService } from '../../../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../../../shared/components/information-page.interface';

@Component({
  selector: 'app-bear-faction',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './bear-faction.component.html',
  styleUrl: './bear-faction.component.scss'
})
export class BearFactionComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: "GME Bear Faction | gmewiki.org",
    description: 'The faction of market participants that are bearish on GME and have a financial interest in the price of GME going down',
    url: 'https://gmewiki.org/bear-faction',
    image: '',
    githubPageUrl: 'info-pages/_concepts/conflict/bear-faction/bear-faction.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

}
