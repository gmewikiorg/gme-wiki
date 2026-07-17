import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { TurnaroundTableComponent } from '../../_corporate/turnaround/turnaround-table/turnaround-table.component';
import { DrsGmeChartComponent } from '../drs/drs-gme-chart/drs-gme-chart.component';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-conflict',
  standalone: true,
  imports: [RouterModule, CommonModule, FooterComponent, TurnaroundTableComponent, DrsGmeChartComponent],
  templateUrl: './conflict.component.html',
  styleUrl: './conflict.component.scss'
})
export class ConflictComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'GME Financial Conflict | gmewiki.org',
    description: 'Various market participants are in conflict over the outcome of the GME share price; GME short sellers aim for the price to go down, while GME shareholders aim for the price to go up.',
    url: 'https://gmewiki.org/conflict',
    image: '',
    githubPageUrl: 'info-pages/_concepts/conflict/conflict.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }
}
