import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';

@Component({
  selector: 'app-reinvention',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './reinvention.component.html',
  styleUrl: './reinvention.component.scss'
})
export class ReinventionComponent {
  constructor(private _screenService: ScreenService) {

    const description = 'After successfully completing a turnaround, GameStop is reinventing itself';
    const title = 'Reinvention of GameStop | gmewiki.org'
    const url = 'https://gmewiki.org/reinvention';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);



  }
}
