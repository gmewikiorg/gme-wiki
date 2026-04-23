import { Component } from '@angular/core';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-warrants',
  standalone: true,
  imports: [FooterComponent, RouterLink],
  templateUrl: './warrants.component.html',
  styleUrl: './warrants.component.scss'
})
export class WarrantsComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'Warrants Issued by GameStop | gmewiki.org';
    const description = 'In 2025, GameStop issued a dividend of warrants with a $32 exercise price';
    const url = 'https://gmewiki.org/warrants';
    const image = 'https://gmewiki.org/assets/info-pages/warrants.png';
    this._screenService.setPageInfo(title, description, url, image);
  }
}
