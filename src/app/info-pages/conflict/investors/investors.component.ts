import { Component } from '@angular/core';
import { ScreenService } from '../../shared/services/screen-size.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-investors',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './investors.component.html',
  styleUrl: './investors.component.scss'
})
export class InvestorsComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'GME Shareholders | gmewiki.org';
    const description = 'GME shareholders include Ryan Cohen, Keith Gill, and hundreds of thousands of registered shareholders';
    const url = 'https://gmewiki.org/investors';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);

  }
}
