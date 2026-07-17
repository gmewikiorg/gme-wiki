import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../../layout/footer/footer.component';
import { ScreenService } from '../../../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../../../shared/components/information-page.interface';

@Component({
  selector: 'app-bbby',
  standalone: true,
  imports: [FooterComponent, RouterModule],
  templateUrl: './bbby.component.html',
  styleUrl: './bbby.component.scss'
})
export class BbbyComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'BBBY | gmewiki.org',
    description: 'BBBY / BBBYQ / 20230930-DK-Butterfly-1, Inc.',
    url: 'https://gmewiki.org/bbby',
    image: '',
    githubPageUrl: 'info-pages/_concepts/meme-stock/bbby/bbby.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

}
