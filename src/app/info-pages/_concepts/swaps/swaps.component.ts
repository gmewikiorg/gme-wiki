import { Component } from '@angular/core';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-swaps',
  standalone: true,
  imports: [RouterModule, CommonModule, FooterComponent],
  templateUrl: './swaps.component.html',
  styleUrl: './swaps.component.scss'
})
export class SwapsComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'Swaps | gmewiki.org',
    description: 'An indicator of bearish sentiment: a metric that measures the (reported) number of shares sold short',
    url: 'https://gmewiki.org/swaps',
    image: '',
    githubPageUrl: 'info-pages/_concepts/swaps/swaps.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

}
