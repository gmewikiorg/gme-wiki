import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScreenService } from '../../shared/services/screen-size.service';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-shorts-never-closed',
  standalone: true,
  imports: [FooterComponent, RouterModule],
  templateUrl: './shorts-never-closed.component.html',
  styleUrl: './shorts-never-closed.component.scss'
})
export class ShortsNeverClosedComponent {
  constructor(private _screenService: ScreenService){
    const title = '"Shorts never closed" | gmewiki.org';
    const description = 'A sentiment held by some GME shareholders as part of an ongoing conflict over GME that short sellers have outstanding obligations against a company that is much stronger than it was before'
    const url = 'https://gmewiki.org/shorts-never-closed';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }
}
