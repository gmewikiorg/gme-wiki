import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-conflict',
  standalone: true,
  imports: [RouterModule, CommonModule, FooterComponent],
  templateUrl: './conflict.component.html',
  styleUrl: './conflict.component.scss'
})
export class ConflictComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'GME Financial Conflict | gmewiki.org';
    const description = 'Various market participants are in conflict over the outcome of the GME share price; GME short sellers aim for the price to go down, while GME shareholders aim for the price to go up.';
    const url = 'https://gmewiki.org/conflict';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  
  }
}
