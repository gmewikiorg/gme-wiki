import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-moass',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './moass.component.html',
  styleUrl: './moass.component.scss'
})
export class MoassComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'MOASS - Mother of all Short Squeezes | gmewiki.org';
    const description = 'MOASS:  A hypothetical event where the price of GME soars astronomically as short sellers close their positions';
    const url = 'https://gmewiki.org/moass';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }
}
