import { Component,  OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { TurnaroundTableComponent } from './turnaround-table/turnaround-table.component';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-turnaround',
  standalone: true,
  imports: [TurnaroundTableComponent, RouterModule, FooterComponent, CommonModule],
  templateUrl: './turnaround.component.html',
  styleUrl: './turnaround.component.scss'
})
export class TurnaroundComponent implements OnInit, InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'GameStop Turnaround: 2021 to present | gmewiki.org',
    description: 'GameStop Turnaround:  fewer stores, higher value, renewed profitability',
    url: 'https://gmewiki.org/turnaround',
    image: 'https://gmewiki.org/assets/info-pages/turnaround.png',
    githubPageUrl: 'info-pages/_corporate/turnaround/turnaround.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }



  public get isBrowser(): boolean { return this._screenService.isBrowser; }

  ngOnInit() {

  }

}
