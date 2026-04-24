import { Component } from '@angular/core';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';

@Component({
  selector: 'app-retro',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './retro.component.html',
  styleUrl: './retro.component.scss'
})
export class RetroComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'GameStop Retro | gmewiki.org';
    const description = 'In 2026, GameStop launched Retro sections in all U.S. stores';
    const url = 'https://gmewiki.org/retro';
    const image = 'https://gmewiki.org/assets/info-pages/retro.webp';
    this._screenService.setPageInfo(title, description, url, image);
  }
}
