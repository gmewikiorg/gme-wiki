import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DrsGmeChartComponent } from './drs-gme-chart/drs-gme-chart.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { OwnershipData } from '../../main-pages/ownership/ownership-data/ownership-data.class';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-drs',
  standalone: true,
  imports: [RouterModule, DrsGmeChartComponent, CommonModule, FooterComponent],
  templateUrl: './drs.component.html',
  styleUrl: './drs.component.scss'
})
export class DrsComponent {

  private _ownershipData: OwnershipData = new OwnershipData();
  private _drsPercent = (this._ownershipData.drsShares / this._ownershipData.tso) * 100;
  public get drsPercent(): string { return this._drsPercent.toFixed(0); }
  private _recentDrsUpdate = new OwnershipData();
  public get recentDrsUpdate(): OwnershipData { return this._recentDrsUpdate; }

  constructor(private _screenService: ScreenService, @Inject(PLATFORM_ID) private platformId: Object,) {
    this._isBrowser = isPlatformBrowser(this.platformId);
    const title = 'DRS - Direct Registration System | gmewiki.org';
    const description = 'DRS - Direct Registration System: information pertaining to DRS and GME, the history of DRS by GME investors, the distinction between DRS and DSPP';
    const url = 'https://gmewiki.org/drs';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }

  private _isBrowser: boolean = false;
  public get isBrowser(): boolean { return this._isBrowser; }



}
