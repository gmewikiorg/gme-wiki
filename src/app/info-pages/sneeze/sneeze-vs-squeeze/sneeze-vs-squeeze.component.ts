import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';

@Component({
  selector: 'app-sneeze-vs-squeeze',
  standalone: true,
  imports: [RouterModule,FooterComponent],
  templateUrl: './sneeze-vs-squeeze.component.html',
  styleUrl: './sneeze-vs-squeeze.component.scss'
})
export class SneezeVsSqueezeComponent {

  constructor(private _screenService: ScreenService){
    const title = '"GME Sneeze" vs "GME Short Squeeze" | gmewiki.org';
    const description = 'The events of January 2021 pertaining to GME are often referred to as a short squeeze.  An alternatively held view is that it was not a genuine short squeeze.'
    const url = 'https://gmewiki.org/sneeze-vs-squeeze';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }
}
