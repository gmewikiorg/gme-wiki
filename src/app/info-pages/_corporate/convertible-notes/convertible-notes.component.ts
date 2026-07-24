import { Component } from '@angular/core';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';
import { AssetsCompositionComponent } from '../../../main-pages/financials/assets-composition/assets-composition.component';

@Component({
  selector: 'app-convertible-notes',
  standalone: true,
  imports: [FooterComponent, RouterModule, AssetsCompositionComponent],
  templateUrl: './convertible-notes.component.html',
  styleUrl: './convertible-notes.component.scss'
})
export class ConvertibleNotesComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'Convertible Senior Notes | gmewiki.org',
    description: 'In 2025, GameStop raised over $4B by completing 2 private offerings of convertible senior notes',
    url: 'https://gmewiki.org/convertible-notes',
    image: '',
    githubPageUrl: 'info-pages/_corporate/convertible-notes/convertible-notes.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

}
