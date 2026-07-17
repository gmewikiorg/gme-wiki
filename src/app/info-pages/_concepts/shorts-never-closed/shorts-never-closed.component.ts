import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-shorts-never-closed',
  standalone: true,
  imports: [FooterComponent, RouterModule],
  templateUrl: './shorts-never-closed.component.html',
  styleUrl: './shorts-never-closed.component.scss'
})
export class ShortsNeverClosedComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: '"Shorts never closed" | gmewiki.org',
    description: 'A sentiment held by some GME shareholders as part of an ongoing conflict over GME that short sellers have outstanding obligations against a company that is much stronger than it was before',
    url: 'https://gmewiki.org/shorts-never-closed',
    image: '',
    githubPageUrl: 'info-pages/_concepts/shorts-never-closed/shorts-never-closed.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }
}
