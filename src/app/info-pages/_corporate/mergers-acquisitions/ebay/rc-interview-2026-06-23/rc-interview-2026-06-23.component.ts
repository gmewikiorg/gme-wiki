import { Component } from '@angular/core';
import { FooterComponent } from '../../../../../layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ScreenService } from '../../../../../shared/services/screen-size.service';

@Component({
  selector: 'app-rc-interview-2026-06-23',
  standalone: true,
  imports: [FooterComponent, RouterModule],
  templateUrl: './rc-interview-2026-06-23.component.html',
  styleUrl: './rc-interview-2026-06-23.component.scss'
})
export class RcInterview20260623Component {
  constructor(private _screenService: ScreenService) {

    const description = 'June 23, 2026:  Ryan Cohen interview with David Friedberg on the All-In Podcast';
    const title = 'Ryan Cohen Interview on the All-In Podcast | gmewiki.org'
    const url = 'https://gmewiki.org/rc-interview-2026-06-23';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }
}
