import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-fud',
  standalone: true,
  imports: [RouterLink, FooterComponent],
  templateUrl: './fud.component.html',
  styleUrl: './fud.component.scss'
})
export class FudComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: "FUD | gmewiki.org",
    description: 'FUD - Fear, Uncertainty, Doubt | gmewiki.org',
    url: 'https://gmewiki.org/fud',
    image: '',
    githubPageUrl: 'info-pages/_concepts/fud/fud.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

}
