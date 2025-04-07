import { Component } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './media.component.html',
  styleUrl: './media.component.scss'
})
export class MediaComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'Media | gmewiki.org';
    const description = 'Mainstream financial media: consistently misleading';
    const url = 'https://gmewiki.org/media';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }
}
