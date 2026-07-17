import { Component } from '@angular/core';
import { ScreenService } from '../../../../shared/services/screen-size.service';
import { FooterComponent } from '../../../../layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { EbayInterviewsComponent } from './ebay-interviews/ebay-interviews.component';
import { InfoPage, InfoPageProperties } from '../../../../shared/components/information-page.interface';

@Component({
  selector: 'app-ebay',
  standalone: true,
  imports: [FooterComponent, RouterModule, EbayInterviewsComponent],
  templateUrl: './ebay.component.html',
  styleUrl: './ebay.component.scss'
})
export class EbayComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'Proposed Acquisition of eBay | gmewiki.org',
    description: 'In May 2026, GameStop formally proposed an acquisition of eBay',
    url: 'https://gmewiki.org/ebay',
    image: '',
    githubPageUrl: 'info-pages/_corporate/mergers-acquisitions/ebay/ebay.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

}
