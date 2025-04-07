import { Component } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';
import { RcInterviewTranscriptComponent } from './rc-interview-transcript/rc-interview-transcript.component';
import { RouterLink } from '@angular/router';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-rc-interview-2022',
  standalone: true,
  imports: [FooterComponent, RcInterviewTranscriptComponent, RouterLink],
  templateUrl: './rc-interview-2022.component.html',
  styleUrl: './rc-interview-2022.component.scss'
})
export class RcInterview2022Component {
  constructor(private _screenService: ScreenService) {
    const title = 'Ryan Cohen Interview with Joe Fonicello of GMEdd.com | gmewiki.org';
    const description = 'Ryan Cohen Interview with Joe Fonicello of GMEdd.com';
    const url = 'https://gmewiki.org/rc-interview';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);

  }

}
