import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-price-is-fake',
  standalone: true,
  imports: [FooterComponent, RouterModule],
  templateUrl: './price-is-fake.component.html',
  styleUrl: './price-is-fake.component.scss'
})
export class PriceIsFakeComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: '"The Price is Fake" | gmewiki.org',
    description: 'A sentiment held by some GME shareholders as part of an ongoing conflict over GME that the market trading price of GME stock is strategically manipulated and therefore artificial',
    url: 'https://gmewiki.org/price-is-fake',
    image: '',
    githubPageUrl: 'info-pages/_concepts/price-is-fake/price-is-fake.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }
}
