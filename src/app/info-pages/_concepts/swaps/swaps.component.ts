import { Component } from '@angular/core';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../layout/footer/footer.component';

@Component({
  selector: 'app-swaps',
  standalone: true,
  imports: [RouterModule, CommonModule, FooterComponent],
  templateUrl: './swaps.component.html',
  styleUrl: './swaps.component.scss'
})
export class SwapsComponent {
  constructor(private _screenService: ScreenService){
    const title = 'Swaps | gmewiki.org';
    const description = 'An indicator of bearish sentiment: a metric that measures the (reported) number of shares sold short'
    const url = 'https://gmewiki.org/short-interest';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }
}
