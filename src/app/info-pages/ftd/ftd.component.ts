import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ScreenService } from '../../shared/services/screen-size.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ftd',
  standalone: true,
  imports: [RouterModule,FooterComponent],
  templateUrl: './ftd.component.html',
  styleUrl: './ftd.component.scss'
})
export class FtdComponent {
  constructor(private _screenService: ScreenService, private titleService: Title, private meta: Meta) {
    const title = 'Failure To Deliver (FTD) | gmewiki.org';
    const description = 'FTDs (fails-to-deliver) occur when a party in a stock transaction fails to deliver the security to the buyer by the settlement date';
    this._screenService.setPageInfo(title, description, 'https://gmewiki.org/ftd', '');
  }
}
