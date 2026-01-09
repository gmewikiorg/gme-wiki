import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';

@Component({
  selector: 'app-directory',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './directory.component.html',
  styleUrl: './directory.component.scss'
})
export class DirectoryComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'gmewiki.org Directory | gmewiki.org';
    const description = 'List of pages on gmewiki.org ';
    const url = 'https://gmewiki.org/directory';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }
}
