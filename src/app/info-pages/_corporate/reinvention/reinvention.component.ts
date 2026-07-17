import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-reinvention',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './reinvention.component.html',
  styleUrl: './reinvention.component.scss'
})
export class ReinventionComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'Reinvention of GameStop | gmewiki.org',
    description: 'After successfully completing a turnaround, GameStop is reinventing itself',
    url: 'https://gmewiki.org/reinvention',
    image: '',
    githubPageUrl: 'info-pages/_corporate/reinvention/reinvention.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }
}
