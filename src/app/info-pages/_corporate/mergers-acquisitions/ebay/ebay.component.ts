import { Component } from '@angular/core';
import { ScreenService } from '../../../../shared/services/screen-size.service';
import { FooterComponent } from '../../../../layout/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ebay',
  standalone: true,
  imports: [FooterComponent, RouterModule],
  templateUrl: './ebay.component.html',
  styleUrl: './ebay.component.scss'
})
export class EbayComponent {
  constructor(private _screenService: ScreenService) {

    const description = 'In May 2026, GameStop formally proposed an acquisition of eBay';
    const title = 'Proposed Acquisition of eBay | gmewiki.org'
    const url = 'https://gmewiki.org/ebay';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }
}
