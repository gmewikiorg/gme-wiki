import { Component } from '@angular/core';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-superstonk',
  standalone: true,
  imports: [],
  templateUrl: './superstonk.component.html',
  styleUrl: './superstonk.component.scss'
})
export class SuperstonkComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'r/superstonk | gmewiki.org';
    const description = 'The largest GME subreddit';
    const url = 'https://gmewiki.org/superstonk';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }
}
