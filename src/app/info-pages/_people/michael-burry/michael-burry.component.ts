import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-michael-burry',
  standalone: true,
  imports: [RouterModule, CommonModule, FooterComponent],
  templateUrl: './michael-burry.component.html',
  styleUrl: './michael-burry.component.scss'
})
export class MichaelBurryComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: "Michael Burry | gmewiki.org",
    description: 'Michael Burry’s Relationship to GME | gmewiki.org',
    url: 'https://gmewiki.org/michael-burry',
    image: '',
    githubPageUrl: 'info-pages/_people/michael-burry/michael-burry.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

}
