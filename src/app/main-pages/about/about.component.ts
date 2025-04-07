import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  public get isMobile(): boolean { return this._screenService.isMobile; }

  constructor(private _screenService: ScreenService) {
    const title = 'About gmewiki.org';
    const description = 'About gmewiki.org - a community-driven website about GME and GameStop';
    const url = 'https://gmewiki.org/about';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }

}
