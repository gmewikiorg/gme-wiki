import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { FooterComponent } from '../../../layout/footer/footer.component';

@Component({
  selector: 'app-drs-full-timeline',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './drs-full-timeline.component.html',
  styleUrl: './drs-full-timeline.component.scss'
})
export class DrsFullTimelineComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'GME DRS Discovery Timeline';
    const description = 'The history of how and why GME investors decided to hold their shares in directly registered form';
    const url = 'https://gmewiki.org/drs-timeline';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }
}
