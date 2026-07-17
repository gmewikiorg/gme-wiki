import { Component } from '@angular/core';
import { OwnershipData } from '../../../../main-pages/ownership/ownership-data/ownership-data.class';
import { ScreenService } from '../../../../shared/services/screen-size.service';
import { FooterComponent } from '../../../../layout/footer/footer.component';
import { RouterLink } from "@angular/router";
import { InfoPage, InfoPageProperties } from '../../../../shared/components/information-page.interface';

@Component({
  selector: 'app-dspp',
  standalone: true,
  imports: [FooterComponent, RouterLink],
  templateUrl: './dspp.component.html',
  styleUrl: './dspp.component.scss'
})
export class DsppComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'DSPP | gmewiki.org',
    description: 'DSPP (Direct Stock Purchase Plan) - registered shares held by Computershare',
    url: 'https://gmewiki.org/dspp',
    image: '',
    githubPageUrl: 'info-pages/_concepts/drs/dspp/dspp.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }


  private _recentDrsUpdate = new OwnershipData();
  public get recentDrsUpdate(): OwnershipData { return this._recentDrsUpdate; }

}
