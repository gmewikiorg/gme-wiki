import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';

@Component({
  selector: 'app-media-vs-gme',
  standalone: true,
  imports: [FooterComponent, RouterModule],
  templateUrl: './media-vs-gme.component.html',
  styleUrl: './media-vs-gme.component.scss'
})
export class MediaVsGmeComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'Financial Media Reporting on GME | gmewiki.org';
    const description = 'Financial media is often demonstrably biased, cynical, and dishonest when reporting about GME and GameStop | gmewiki.org';
    const url = 'https://gmewiki.org/media-vs-gme';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);

  }
}
