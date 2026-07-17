import { Component } from '@angular/core';
import { ScreenService } from '../../../../shared/services/screen-size.service';
import { FooterComponent } from '../../../../layout/footer/footer.component';
import { RouterLink } from "@angular/router";
import { InfoPage, InfoPageProperties } from '../../../../shared/components/information-page.interface';

@Component({
  selector: 'app-bull-case',
  standalone: true,
  imports: [FooterComponent, RouterLink],
  templateUrl: './bull-case.component.html',
  styleUrl: './bull-case.component.scss'
})
export class BullCaseComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'GME Bull Case | gmewiki.org',
    description: 'GME Bull Case - Information and arguments for why GME might be seen as a favorable investment',
    url: 'https://gmewiki.org/bull-case',
    image: '',
    githubPageUrl: 'info-pages/_concepts/conflict/bull-case/bull-case.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

}
