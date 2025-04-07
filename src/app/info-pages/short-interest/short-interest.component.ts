import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScreenService } from '../../shared/services/screen-size.service';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-short-interest',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './short-interest.component.html',
  styleUrl: './short-interest.component.scss'
})
export class ShortInterestComponent {
  constructor(private _screenService: ScreenService){
    const title = 'Short Interest (SI) | gmewiki.org';
    const description = 'An indicator of bearish sentiment: a metric that measures the (reported) number of shares sold short'
    const url = 'https://gmewiki.org/short-interest';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }
}
