import { Component } from '@angular/core';
import { RcInterviewTranscriptComponent } from './rc-interview-transcript/rc-interview-transcript.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../../../layout/footer/footer.component';
import { ScreenService } from '../../../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../../../shared/components/information-page.interface';

@Component({
  selector: 'app-rc-interview-2022',
  standalone: true,
  imports: [FooterComponent, RcInterviewTranscriptComponent, RouterLink],
  templateUrl: './rc-interview-2022.component.html',
  styleUrl: './rc-interview-2022.component.scss'
})
export class RcInterview2022Component implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'Ryan Cohen Interview with Joe Fonicello of GMEdd.com | gmewiki.org',
    description: 'Ryan Cohen Interview with Joe Fonicello of GMEdd.com | gmewiki.org',
    url: 'https://gmewiki.org/rc-interview',
    image: '',
    githubPageUrl: 'info-pages/_people/ryan-cohen/rc-interview-2022/rc-interview-2022.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

}
