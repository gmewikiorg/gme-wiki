import { Component } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ScreenService } from '../../shared/services/screen-size.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-meme-stock',
  standalone: true,
  imports: [FooterComponent, RouterLink],
  templateUrl: './meme-stock.component.html',
  styleUrl: './meme-stock.component.scss'
})
export class MemeStockComponent {
  constructor(private _screenService: ScreenService) {
    const title = "Meme Stock | gmewiki.org";
    const description = 'What is a meme stock? | gmewiki.org';
    const url = 'https://gmewiki.org/meme-stock';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);

  }
}
