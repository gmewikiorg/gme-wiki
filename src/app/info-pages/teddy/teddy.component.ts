import { Component } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ScreenService } from '../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../shared/components/information-page.interface';

@Component({
  selector: 'app-teddy',
  standalone: true,
  imports: [FooterComponent, RouterModule],
  templateUrl: './teddy.component.html',
  styleUrl: './teddy.component.scss'
})
export class TeddyComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'Teddy.com | gmewiki.org',
    description: 'Teddy.com - a website that sells childrens books written by Ryan Cohen',
    url: 'https://gmewiki.org/teddy',
    image: '',
    githubPageUrl: 'info-pages/teddy/teddy.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

}
