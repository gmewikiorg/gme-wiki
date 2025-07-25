import { Component } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-teddy',
  standalone: true,
  imports: [FooterComponent, RouterModule],
  templateUrl: './teddy.component.html',
  styleUrl: './teddy.component.scss'
})
export class TeddyComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'Teddy.com | gmewiki.org';
    const description = 'Teddy.com - a website that sells childrens books written by Ryan Cohen';
    const url = 'https://gmewiki.org/teddy';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }
}
