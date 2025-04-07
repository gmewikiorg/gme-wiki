import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-burp',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './burp.component.html',
  styleUrl: './burp.component.scss'
})
export class BurpComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'GME Burp of 2024 | gmewiki.org';
    const description = 'In May and June of 2024, GME experienced some major turbulence.  Why?';
    const url = 'https://gmewiki.org/burp';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  
  }
}
