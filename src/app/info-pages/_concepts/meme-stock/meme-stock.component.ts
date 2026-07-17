import { Component } from '@angular/core';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { RouterLink } from "@angular/router";
import { ScreenService } from '../../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-meme-stock',
  standalone: true,
  imports: [FooterComponent, RouterLink],
  templateUrl: './meme-stock.component.html',
  styleUrl: './meme-stock.component.scss'
})
export class MemeStockComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: "Meme Stock | gmewiki.org",
    description: 'What is a meme stock? | gmewiki.org',
    url: 'https://gmewiki.org/meme-stock',
    image: '',
    githubPageUrl: 'info-pages/_concepts/meme-stock/meme-stock.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

}
