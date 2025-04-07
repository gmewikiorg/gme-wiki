import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-keith-gill',
  standalone: true,
  imports: [RouterModule, CommonModule, FooterComponent],
  templateUrl: './keith-gill.component.html',
  styleUrl: './keith-gill.component.scss'
})
export class KeithGillComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'Keith Gill, aka Roaring Kitty (RK), aka DeepFuckingValue (DFV) | gmewiki.org';
    const description = 'Keith Gill, aka Roaring Kitty (RK), aka DeepFuckingValue (DFV), is somebody with great interest in GME | gmewiki.org';
    const url = 'https://gmewiki.org/keith-gill';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);

  }
}
