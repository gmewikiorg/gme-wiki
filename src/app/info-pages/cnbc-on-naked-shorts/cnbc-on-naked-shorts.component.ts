import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-cnbc-on-naked-shorts',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './cnbc-on-naked-shorts.component.html',
  styleUrl: './cnbc-on-naked-shorts.component.scss'
})
export class CNBCVsNakedShortsComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'CNBC on naked short selling of GME | gmewiki.org';
    const description = 'CNBC slipped up about naked short selling';
    const url = 'https://gmewiki.org/cnbc-naked-shorts';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  
  }
}
