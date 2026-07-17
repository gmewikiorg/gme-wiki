import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-superstonk',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './superstonk.component.html',
  styleUrl: './superstonk.component.scss'
})
export class SuperstonkComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: "r/superstonk | gmewiki.org",
    description: 'The largest GME subreddit',
    url: 'https://gmewiki.org/superstonk',
    image: '',
    githubPageUrl: 'info-pages/reddit/superstonk/superstonk.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

}
