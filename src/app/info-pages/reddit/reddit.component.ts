import { Component } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ScreenService } from '../../shared/services/screen-size.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfoPage, InfoPageProperties } from '../../shared/components/information-page.interface';

@Component({
  selector: 'app-reddit',
  standalone: true,
  imports: [FooterComponent, CommonModule, RouterModule],
  templateUrl: './reddit.component.html',
  styleUrl: './reddit.component.scss'
})
export class RedditComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: "Reddit's role in the GME saga | gmewiki.org",
    description: 'Reddit has played a role in the GME saga but the situation has changed over time',
    url: 'https://gmewiki.org/reddit',
    image: '',
    githubPageUrl: 'info-pages/reddit/reddit.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

}
