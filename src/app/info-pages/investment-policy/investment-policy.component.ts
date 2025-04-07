import { Component } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-investment-policy',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './investment-policy.component.html',
  styleUrl: './investment-policy.component.scss'
})
export class InvestmentPolicyComponent {
  constructor(private _screenService: ScreenService) {

    const description = 'As legacy retail contracts, GameStop evolves into a capital allocator with a growing focus on strategic investments.';
    const title = 'GameStop Investment Policy | gmewiki.org'
    const url = 'https://gmewiki.org/investment-policy';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);



  }
}