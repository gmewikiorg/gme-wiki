import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-downfall-era',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './downfall-era.component.html',
  styleUrl: './downfall-era.component.scss'
})
export class DownfallEraComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'The Downfall Era of GameStop - Approximately 2016 through 2020 | gmewiki.org';
    const description = 'From approximately 2018 through 2020, GameStop was heading downwards ';
    const url = 'https://gmewiki.org/downfall-era';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }
}
