import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-short-interest',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './short-interest.component.html',
  styleUrl: './short-interest.component.scss'
})
export class ShortInterestComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'Short Interest | gmewiki.org',
    description: 'An indicator of bearish sentiment: a metric that measures the (reported) number of shares sold short',
    url: 'https://gmewiki.org/short-interest',
    image: '',
    githubPageUrl: 'info-pages/_concepts/short-interest/short-interest.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }
}
