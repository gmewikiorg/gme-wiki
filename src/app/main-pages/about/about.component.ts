import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ScreenService } from '../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../shared/components/information-page.interface';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'About gmewiki.org',
    description: 'About gmewiki.org - a community-driven website about GME and GameStop',
    url: 'https://gmewiki.org/about',
    image: '',
    githubPageUrl: 'main-pages/about/about.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

  public get isMobile(): boolean { return this._screenService.isMobile; }


}
