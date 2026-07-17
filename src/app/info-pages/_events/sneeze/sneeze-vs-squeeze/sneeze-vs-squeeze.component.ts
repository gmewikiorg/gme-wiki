import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../../layout/footer/footer.component';
import { ScreenService } from '../../../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../../../shared/components/information-page.interface';

@Component({
  selector: 'app-sneeze-vs-squeeze',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './sneeze-vs-squeeze.component.html',
  styleUrl: './sneeze-vs-squeeze.component.scss'
})
export class SneezeVsSqueezeComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title:  '"GME Sneeze" vs "GME Short Squeeze" | gmewiki.org',
    description: 'The events of January 2021 pertaining to GME are often referred to as a short squeeze.  An alternatively held view is that it was not a genuine short squeeze.',
    url: 'https://gmewiki.org/sneeze-vs-squeeze',
    image: '',
    githubPageUrl: 'info-pages/_events/sneeze/sneeze-vs-squeeze/sneeze-vs-squeeze.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

}
