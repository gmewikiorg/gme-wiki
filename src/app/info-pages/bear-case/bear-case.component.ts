import { Component } from '@angular/core';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-bear-case',
  standalone: true,
  imports: [],
  templateUrl: './bear-case.component.html',
  styleUrl: './bear-case.component.scss'
})
export class BearCaseComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'GME Bear Case | gmewiki.org';
    const description = 'GME Bear Case';
    const url = 'https://gmewiki.org/bear-case';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  
  }
}
