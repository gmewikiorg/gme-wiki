import { Component, HostListener } from '@angular/core';
import { OwnershipData } from './ownership-data/ownership-data.class';
import dayjs from 'dayjs';
import { RouterModule } from '@angular/router';
import { OwnershipChartComponent } from './ownership-chart/ownership-chart.component';
import { OwnershipTableComponent } from './ownership-table/ownership-table.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-ownership',
  standalone: true,
  imports: [CommonModule, RouterModule, OwnershipChartComponent, OwnershipTableComponent, FooterComponent],
  templateUrl: './ownership.component.html',
  styleUrl: './ownership.component.scss'
})
export class OwnershipComponent {

  constructor(private _screenService: ScreenService) {
    const title = 'GameStop ownership (as of ' + this.lastUpdated + ') | gmewiki.org';
    const description = 'Chart and table with data sources providing a breakdown of GME ownership';
    const url = 'https://gmewiki.org/ownership';
    const image = 'https://gmewiki.org/assets/main-pages/ownership.png';
    this._screenService.setPageInfo(title, description, url, image);
    this._isBrowser = this._screenService.isBrowser;
  }

  private _isBrowser: boolean = false;
  public get isBrowser(): boolean { return this._isBrowser; }


  @HostListener('mousemove', ['$event']) onMousemove(event: MouseEvent) { }

  public get isLoading(): boolean { return false; }

  public get lastUpdated(): string {
    return dayjs((new OwnershipData()).lastUpdateYYYYMMDD).format('MMMM D, YYYY')
  }

  async ngOnInit() {

  }




}
