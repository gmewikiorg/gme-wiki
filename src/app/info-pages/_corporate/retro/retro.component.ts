import { Component } from '@angular/core';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-retro',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './retro.component.html',
  styleUrl: './retro.component.scss'
})
export class RetroComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'GameStop Retro | gmewiki.org',
    description: 'In 2026, GameStop launched Retro sections in all U.S. stores',
    url: 'https://gmewiki.org/retro',
    image: 'https://gmewiki.org/assets/info-pages/retro.webp',
    githubPageUrl: 'info-pages/_corporate/retro/retro.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

}
