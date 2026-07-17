import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-ftd',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './ftd.component.html',
  styleUrl: './ftd.component.scss'
})
export class FtdComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'Failure To Deliver (FTD) | gmewiki.org',
    description: 'FTDs (fails-to-deliver) occur when a party in a stock transaction fails to deliver the security to the buyer by the settlement date',
    url: 'https://gmewiki.org/ftd',
    image: '',
    githubPageUrl: 'info-pages/_concepts/ftd/ftd.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }


}
