import { Component } from '@angular/core';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';

@Component({
  selector: 'app-mergers-acquisitions',
  standalone: true,
  imports: [FooterComponent, RouterModule],
  templateUrl: './mergers-acquisitions.component.html',
  styleUrl: './mergers-acquisitions.component.scss'
})
export class MergersAcquisitionsComponent {
  constructor(private _screenService: ScreenService) {

    const description = 'Mergers and Acquisitions with GameStop';
    const title = 'Mergers and Acquisitions | gmewiki.org'
    const url = 'https://gmewiki.org/m&a';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }
}
