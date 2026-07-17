import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-cnbc-on-naked-shorts',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './cnbc-on-naked-shorts.component.html',
  styleUrl: './cnbc-on-naked-shorts.component.scss'
})
export class CNBCVsNakedShortsComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'CNBC on naked short selling of GME | gmewiki.org',
    description: 'CNBC slipped up about naked short selling | gmewiki.org',
    url: 'https://gmewiki.org/cnbc-naked-shorts',
    image: '',
    githubPageUrl: 'info-pages/media/cnbc-on-naked-shorts/cnbc-on-naked-shorts.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

}
