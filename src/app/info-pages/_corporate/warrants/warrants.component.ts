import { Component } from '@angular/core';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { RouterLink } from "@angular/router";
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-warrants',
  standalone: true,
  imports: [FooterComponent, RouterLink],
  templateUrl: './warrants.component.html',
  styleUrl: './warrants.component.scss'
})
export class WarrantsComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'Warrants Issued by GameStop | gmewiki.org',
    description: 'In 2025, GameStop issued a dividend of warrants with a $32 exercise price',
    url: 'https://gmewiki.org/warrants',
    image: 'https://gmewiki.org/assets/info-pages/warrants.png',
    githubPageUrl: 'info-pages/_corporate/warrants/warrants.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }
}
