import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-keith-gill',
  standalone: true,
  imports: [RouterModule, CommonModule, FooterComponent],
  templateUrl: './keith-gill.component.html',
  styleUrl: './keith-gill.component.scss'
})
export class KeithGillComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'Keith Gill, aka Roaring Kitty (RK), aka DeepFuckingValue (DFV) | gmewiki.org',
    description: 'Keith Gill, aka Roaring Kitty (RK), aka DeepFuckingValue (DFV), is somebody with great interest in GME | gmewiki.org',
    url: 'https://gmewiki.org/keith-gill',
    image: '',
    githubPageUrl: 'info-pages/_people/keith-gill/keith-gill.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

}
