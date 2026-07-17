import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-t-plus-thirty-five',
  standalone: true,
  imports: [FooterComponent, RouterModule],
  templateUrl: './t-plus-thirty-five.component.html',
  styleUrl: './t-plus-thirty-five.component.scss'
})
export class TPlusThirtyFiveComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'T+35 Settlement Cycle | gmewiki.org',
    description: 'An observed market cycle related to FTDs (fails-to-deliver) that can influence the price of a stock',
    url: 'https://gmewiki.org/t-plus-35',
    image: '',
    githubPageUrl: 'info-pages/_concepts/t-plus-thirty-five/t-plus-thirty-five.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }
}
