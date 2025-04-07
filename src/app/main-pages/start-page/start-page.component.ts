import { Component } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { OwnershipData } from '../ownership/ownership-data/ownership-data.class';
import { CommonModule } from '@angular/common';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [RouterModule, FooterComponent, CommonModule],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'Welcome to gmewiki.org - an information tool all about GME and GameStop';
    const description = 'gmewiki.org - a community-driven information tool all about GME and GameStop';
    const url = 'https://gmewiki.org/start';
    const image = 'https://gmewiki.org/assets/nav-icons/start.png';
    this._screenService.setPageInfo(title, description, url, image);
  }

  private _ownershipData: OwnershipData = new OwnershipData();
  private _registeredPercent = (this._ownershipData.totalRegistered / this._ownershipData.tso) * 100;
  public get registeredPercent(): string { return this._registeredPercent.toFixed(0); }

  public get isDarkMode(): boolean { return this._screenService.isDarkMode; }

}
