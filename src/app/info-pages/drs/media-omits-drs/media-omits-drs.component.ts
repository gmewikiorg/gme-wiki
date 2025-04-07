import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';

@Component({
  selector: 'app-media-omits-drs',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './media-omits-drs.component.html',
  styleUrl: './media-omits-drs.component.scss'
})
export class MediaOmitsDrsComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'Media Omission of DRS | gmewiki.org';
    const description = 'Information about DRS and registered shares of GME is not provided by most commonly used financial information sources.  Financial media is incentivized to not ever bring attention to DRS.';

    const url = 'https://gmewiki.org/media-omits-drs';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);

  }

}