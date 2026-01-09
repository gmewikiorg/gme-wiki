import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';

@Component({
  selector: 'app-michael-burry',
  standalone: true,
  imports: [RouterModule, CommonModule, FooterComponent],
  templateUrl: './michael-burry.component.html',
  styleUrl: './michael-burry.component.scss'
})
export class MichaelBurryComponent {
  constructor(private _screenService: ScreenService) {
    const title = "Michael Burry | gmewiki.org";
    const description = 'Michael Burry’s Relationship to GME | gmewiki.org';
    const url = 'https://gmewiki.org/michael-burry';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);

  }
}
