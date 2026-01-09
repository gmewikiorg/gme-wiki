import { Component } from '@angular/core';
import { ScreenService } from '../../../../shared/services/screen-size.service';
import { FooterComponent } from '../../../../layout/footer/footer.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-bull-case',
  standalone: true,
  imports: [FooterComponent, RouterLink],
  templateUrl: './bull-case.component.html',
  styleUrl: './bull-case.component.scss'
})
export class BullCaseComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'GME Bull Case | gmewiki.org';
    const description = 'GME Bull Case - Information and arguments for why GME might be seen as a favorable investment';
    const url = 'https://gmewiki.org/bull-case';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  
  }
}
