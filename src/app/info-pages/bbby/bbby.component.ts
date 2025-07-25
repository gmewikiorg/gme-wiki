import { Component } from '@angular/core';
import { ScreenService } from '../../shared/services/screen-size.service';
import { FooterComponent } from '../../layout/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bbby',
  standalone: true,
  imports: [FooterComponent, RouterModule],
  templateUrl: './bbby.component.html',
  styleUrl: './bbby.component.scss'
})
export class BbbyComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'BBBY | gmewiki.org';
    const description = 'BBBY / BBBYQ / 20230930-DK-Butterfly-1, Inc.';
    const url = 'https://gmewiki.org/bbby';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);

  }
}
