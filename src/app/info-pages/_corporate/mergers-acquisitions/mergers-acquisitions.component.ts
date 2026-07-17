import { Component } from '@angular/core';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-mergers-acquisitions',
  standalone: true,
  imports: [FooterComponent, RouterModule],
  templateUrl: './mergers-acquisitions.component.html',
  styleUrl: './mergers-acquisitions.component.scss'
})
export class MergersAcquisitionsComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'Mergers and Acquisitions with GameStop',
    description: 'Mergers and Acquisitions | gmewiki.org',
    url: 'https://gmewiki.org/m&a',
    image: '',
    githubPageUrl: 'info-pages/_corporate/mergers-acquisitions/mergers-acquisitions.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

}
