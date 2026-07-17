import { Component } from '@angular/core';
import { ScreenService } from '../../../../shared/services/screen-size.service';
import { FooterComponent } from '../../../../layout/footer/footer.component';
import { RouterLink } from "@angular/router";
import { InfoPage, InfoPageProperties } from '../../../../shared/components/information-page.interface';

@Component({
  selector: 'app-bear-case',
  standalone: true,
  imports: [FooterComponent, RouterLink],
  templateUrl: './bear-case.component.html',
  styleUrl: './bear-case.component.scss'
})
export class BearCaseComponent  implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title:'GME Bear Case | gmewiki.org',
    description: 'GME Bear Case - Information and arguments for why GME might be seen as an unfavorable investment',
    url: 'https://gmewiki.org/bear-case',
    image: '',
    githubPageUrl: 'info-pages/_concepts/conflict/bear-case/bear-case.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

}
