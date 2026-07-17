import { Component } from '@angular/core';
import { FooterComponent } from '../../../../../../layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ScreenService } from '../../../../../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../../../../../shared/components/information-page.interface';

@Component({
  selector: 'app-rc-interview-2026-06-23',
  standalone: true,
  imports: [FooterComponent, RouterModule],
  templateUrl: './rc-interview-2026-06-23.component.html',
  styleUrl: './rc-interview-2026-06-23.component.scss'
})
export class RcInterview20260623Component implements InfoPage{

  infoPageProperties: InfoPageProperties = {
    title: 'June 23, 2026:  Ryan Cohen interview with David Friedberg on the All-In Podcast',
    description: 'Ryan Cohen Interview on the All-In Podcast | gmewiki.org',
    url: 'https://gmewiki.org/rc-interview-2026-06-23',
    image: '',
    githubPageUrl: 'info-pages/_corporate/mergers-acquisitions/ebay/ebay-interviews/rc-interview-2026-06-23/rc-interview-2026-06-03.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }
}
