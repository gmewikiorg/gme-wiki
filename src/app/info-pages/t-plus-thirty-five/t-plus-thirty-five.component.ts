import { Component } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-t-plus-thirty-five',
  standalone: true,
  imports: [FooterComponent, RouterModule],
  templateUrl: './t-plus-thirty-five.component.html',
  styleUrl: './t-plus-thirty-five.component.scss'
})
export class TPlusThirtyFiveComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'T+35 Settlement Cycle | gmewiki.org';
    const description = 'An observed market cycle related to FTDs (fails-to-deliver) that can influence the price of a stock';
    const url = 'https://gmewiki.org/t-plus-35';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }
}
