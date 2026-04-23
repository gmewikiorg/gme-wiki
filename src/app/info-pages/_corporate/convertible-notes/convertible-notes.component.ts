import { Component } from '@angular/core';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-convertible-notes',
  standalone: true,
  imports: [FooterComponent, RouterModule],
  templateUrl: './convertible-notes.component.html',
  styleUrl: './convertible-notes.component.scss'
})
export class ConvertibleNotesComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'Convertible Senior Notes | gmewiki.org';
    const description = 'In 2025, GameStop raised over $4B by completing 2 private offerings of convertible senior notes';
    const url = 'https://gmewiki.org/convertible-notes';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }
}
