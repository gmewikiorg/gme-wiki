import { Component,  OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { TurnaroundTableComponent } from './turnaround-table/turnaround-table.component';
import { CommonModule } from '@angular/common';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-turnaround',
  standalone: true,
  imports: [TurnaroundTableComponent, RouterModule, FooterComponent, CommonModule],
  templateUrl: './turnaround.component.html',
  styleUrl: './turnaround.component.scss'
})
export class TurnaroundComponent implements OnInit {
  constructor(private _screenService: ScreenService) {
    const title = 'GameStop Turnaround: 2021 to present | gmewiki.org';
    const description = 'GameStop Turnaround:  fewer stores, higher value, renewed profitability';
    const url = 'https://gmewiki.org/turnaround';
    const image = 'https://gmewiki.org/assets/info-pages/turnaround.png';
    this._screenService.setPageInfo(title, description, url, image);
  }


  public get isBrowser(): boolean { return this._screenService.isBrowser; }
  private _turnaroundDuration: string = '4 years';
  public get turnaroundDuration(): string { return this._turnaroundDuration; }

  ngOnInit() {

  }

}
