import { Component } from '@angular/core';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-bull-case',
  standalone: true,
  imports: [],
  templateUrl: './bull-case.component.html',
  styleUrl: './bull-case.component.scss'
})
export class BullCaseComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'GME Bull Case | gmewiki.org';
    const description = 'GME Bull Case';
    const url = 'https://gmewiki.org/bull-case';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  
  }
}
