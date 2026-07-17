import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScreenService } from '../../../../shared/services/screen-size.service';
import { FooterComponent } from '../../../../layout/footer/footer.component';
import { InfoPage, InfoPageProperties } from '../../../../shared/components/information-page.interface';

@Component({
  selector: 'app-drs-full-timeline',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './drs-full-timeline.component.html',
  styleUrl: './drs-full-timeline.component.scss'
})
export class DrsFullTimelineComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'GME DRS Discovery Timeline',
    description: 'The history of how and why GME investors decided to hold their shares in directly registered form',
    url: 'https://gmewiki.org/drs-timeline',
    image: '',
    githubPageUrl: 'info-pages/_concepts/drs/drs-full-timeline/drs-full-timeline.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }
}
