import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-price-is-fake',
  standalone: true,
  imports: [FooterComponent, RouterModule],
  templateUrl: './price-is-fake.component.html',
  styleUrl: './price-is-fake.component.scss'
})
export class PriceIsFakeComponent {
  constructor(private _screenService: ScreenService){
    const title = '"The Price is Fake" | gmewiki.org';
    const description = 'A sentiment held by some GME shareholders as part of an ongoing conflict over GME that the market trading price of GME stock is strategically manipulated and therefore artificial'
    const url = 'https://gmewiki.org/price-is-fake';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }
}
