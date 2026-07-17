import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScreenService } from '../../shared/services/screen-size.service';
import { FooterComponent } from '../../layout/footer/footer.component';
import { InfoPage, InfoPageProperties } from '../../shared/components/information-page.interface';

@Component({
  selector: 'app-social-media',
  standalone: true,
  imports: [RouterModule, CommonModule, FooterComponent],
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.scss'
})
export class SocialMediaComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'Social Media for GME Shareholders | gmewiki.org',
    description: 'Directory of places for GME shareholders on X, Reddit, Discord, BlueSky, Github',
    url: 'https://gmewiki.org/social-media',
    image: '',
    githubPageUrl: 'main-pages/social-media/social-media.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }


  private _xSpacesAccounts: string[] = [
    'DSquadRadio'
  ].sort(() => Math.random() - 0.5);

  public get xSpacesAccounts(): string[] {
    return this._xSpacesAccounts;
  }


}

