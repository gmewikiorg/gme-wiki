import { Component } from '@angular/core';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { RouterLink } from "@angular/router";
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-investment-policy',
  standalone: true,
  imports: [FooterComponent, RouterLink],
  templateUrl: './investment-policy.component.html',
  styleUrl: './investment-policy.component.scss'
})
export class InvestmentPolicyComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'GameStop Investment Policy | gmewiki.org',
    description: 'As legacy retail contracts, GameStop evolves into a capital allocator with a growing focus on strategic investments.',
    url: 'https://gmewiki.org/investment-policy',
    image: '',
    githubPageUrl: 'info-pages/_corporate/investment-policy/investment-policy.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

}