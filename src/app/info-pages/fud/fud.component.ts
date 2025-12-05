import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FooterComponent } from '../../layout/footer/footer.component';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-fud',
  standalone: true,
  imports: [RouterLink, FooterComponent],
  templateUrl: './fud.component.html',
  styleUrl: './fud.component.scss'
})
export class FudComponent {
  constructor(private _screenService: ScreenService) {
    const title = "FUD | gmewiki.org";
    const description = 'FUD - Fear, Uncertainty, Doubt | gmewiki.org';
    const url = 'https://gmewiki.org/fud';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }
}
