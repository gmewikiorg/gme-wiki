import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CNBCVsNakedShortsComponent } from '../../media/cnbc-on-naked-shorts/cnbc-on-naked-shorts.component';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-naked-short-selling',
  standalone: true,
  imports: [RouterModule, CNBCVsNakedShortsComponent, FooterComponent],
  templateUrl: './naked-short-selling.component.html',
  styleUrl: './naked-short-selling.component.scss'
})
export class NakedShortSellingComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'Naked Short Selling | gmewiki.org',
    description: 'A form of fraud where the perpetrator profits while lowering the price of a target stock',
    url: 'https://gmewiki.org/naked-short-selling',
    image: '',
    githubPageUrl: 'info-pages/_concepts/naked-short-selling/naked-short-selling.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

}
