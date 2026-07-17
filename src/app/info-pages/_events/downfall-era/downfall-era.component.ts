import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-downfall-era',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './downfall-era.component.html',
  styleUrl: './downfall-era.component.scss'
})
export class DownfallEraComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'The Downfall Era of GameStop | gmewiki.org',
    description: 'From approximately 2018 through 2020, GameStop was heading downwards',
    url: 'https://gmewiki.org/downfall-era',
    image: '',
    githubPageUrl: 'info-pages/_events/downfall-era/downfall-era.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }
}
