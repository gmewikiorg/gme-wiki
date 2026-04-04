import { Component } from '@angular/core';
import { OwnershipData } from '../../../../main-pages/ownership/ownership-data/ownership-data.class';
import { ScreenService } from '../../../../shared/services/screen-size.service';
import { FooterComponent } from '../../../../layout/footer/footer.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-dspp',
  standalone: true,
  imports: [FooterComponent, RouterLink],
  templateUrl: './dspp.component.html',
  styleUrl: './dspp.component.scss'
})
export class DsppComponent {

  constructor(private _screenService: ScreenService) {
    const title = 'DSPP | gmewiki.org';
    const description = 'DSPP (Direct Stock Purchase Plan) - registered shares held by Computershare';
    const url = 'https://gmewiki.org/dspp';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }

  private _recentDrsUpdate = new OwnershipData();
  public get recentDrsUpdate(): OwnershipData { return this._recentDrsUpdate; }

}
