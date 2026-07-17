import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from '../../../../layout/footer/footer.component';
import { ScreenService } from '../../../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../../../shared/components/information-page.interface';

@Component({
  selector: 'app-media-omits-drs',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './media-omits-drs.component.html',
  styleUrl: './media-omits-drs.component.scss'
})
export class MediaOmitsDrsComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'Media Omission of DRS | gmewiki.org',
    description: 'Information about DRS and registered shares of GME is not provided by most commonly used financial information sources.  Financial media is incentivized to not ever bring attention to DRS.',
    url: 'https://gmewiki.org/media-omits-drs',
    image: '',
    githubPageUrl: 'info-pages/_concepts/drs/media-omits-drs/media-omits-drs.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }


}