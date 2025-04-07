import { Component } from '@angular/core';
import { OwnershipData } from '../../../main-pages/ownership/ownership-data/ownership-data.class';
import { ScreenService } from '../../../shared/services/screen-size.service';

@Component({
  selector: 'app-drs-vs-dspp',
  standalone: true,
  imports: [],
  templateUrl: './drs-vs-dspp.component.html',
  styleUrl: './drs-vs-dspp.component.scss'
})
export class DrsVsDsppComponent {

  constructor(private _screenService: ScreenService) {
    const title = 'DRS vs DSPP | gmewiki.org';
    const description = 'Explanation of the differences between DRS and DSPP.  Both are forms of registered shares, only DRS provides self-custody.';
    const url = 'https://gmewiki.org/drs-vs-dspp';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);



  }

  private _recentDrsUpdate = new OwnershipData();
  public get recentDrsUpdate(): OwnershipData { return this._recentDrsUpdate; }

}
