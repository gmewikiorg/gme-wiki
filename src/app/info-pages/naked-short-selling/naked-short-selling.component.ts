import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CNBCVsNakedShortsComponent } from '../cnbc-on-naked-shorts/cnbc-on-naked-shorts.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-naked-short-selling',
  standalone: true,
  imports: [RouterModule, CNBCVsNakedShortsComponent, FooterComponent],
  templateUrl: './naked-short-selling.component.html',
  styleUrl: './naked-short-selling.component.scss'
})
export class NakedShortSellingComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'Naked Short Selling | gmewiki.org';
    const description = 'A form of fraud where the perpetrator profits while lowering the price of a target stock';
    const url = 'https://gmewiki.org/naked-short-selling';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);

  }
}
