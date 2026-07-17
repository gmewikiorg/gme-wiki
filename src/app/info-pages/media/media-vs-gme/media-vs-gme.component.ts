import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-media-vs-gme',
  standalone: true,
  imports: [FooterComponent, RouterModule],
  templateUrl: './media-vs-gme.component.html',
  styleUrl: './media-vs-gme.component.scss'
})
export class MediaVsGmeComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'Financial Media Reporting on GME | gmewiki.org',
    description: 'Financial media is often demonstrably biased, cynical, and dishonest when reporting about GME and GameStop | gmewiki.org',
    url: 'https://gmewiki.org/media-vs-gme',
    image: '',
    githubPageUrl: 'info-pages/media/media-vs-gme/media-vs-gme.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }
}
