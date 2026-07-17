import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-moass',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './moass.component.html',
  styleUrl: './moass.component.scss'
})
export class MoassComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'MOASS - Mother of all Short Squeezes | gmewiki.org',
    description: 'MOASS:  A hypothetical event where the price of GME soars astronomically as short sellers close their positions',
    url: 'https://gmewiki.org/moass',
    image: '',
    githubPageUrl: 'info-pages/_concepts/moass/moass.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

}
