import { Component } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ScreenService } from '../../shared/services/screen-size.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reddit',
  standalone: true,
  imports: [FooterComponent, CommonModule, RouterModule],
  templateUrl: './reddit.component.html',
  styleUrl: './reddit.component.scss'
})
export class RedditComponent {
  constructor(private _screenService: ScreenService) {
    const title = "Reddit's role in the GME saga | gmewiki.org";
    const description = 'Reddit has played a role in the GME saga but the situation has changed over time';
    const url = 'https://gmewiki.org/reddit';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }
}
