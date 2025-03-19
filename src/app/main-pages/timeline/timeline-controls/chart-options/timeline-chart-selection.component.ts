import { Component, EventEmitter, Output } from '@angular/core';
import { TimelineControlsService } from '../timeline-controls.service';
import { CommonModule } from '@angular/common';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TimelinePeriodType } from '../timeline-period-type';

@Component({
  selector: 'app-timeline-chart-selection',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './timeline-chart-selection.component.html',
  styleUrl: './timeline-chart-selection.component.scss'
})
export class TimelineChartSelectionComponent {

  constructor(private _controlsService: TimelineControlsService) { }

  @Output() closeOptions = new EventEmitter<boolean>();

    public get faX() { return faX; }

  public get metric(): 'PRICE' | 'VOLUME' | 'EQUITY' | 'PTOB' | 'PTOS' | 'PTOE' { return this._controlsService.metric; }
  public get period(): TimelinePeriodType { return this._controlsService.period; }

  public get metricIsPrice(): boolean { return this.metric === 'PRICE'; }
  public get metricIsVolume(): boolean { return this.metric === 'VOLUME'; }
  public get metricIsPtoB(): boolean { return this.metric === 'PTOB'; }
  public get metricIsPtoS(): boolean { return this.metric === 'PTOS'; }
  public get metricIsPtoE(): boolean { return this.metric === 'PTOE'; }
  public get metricIsEquity(): boolean { return this.metric === 'EQUITY'; }

  public get periodIs1Year(): boolean { return this.period === '2_YEARS'; }
  public get periodIs5Years(): boolean { return this.period === '5_YEARS'; }
  public get periodIsCurrent(): boolean { return this.period === 'CURRENT'; }
  public get periodIsHistoric(): boolean { return this.period === 'HISTORIC'; }
  public get periodIsCustom(): boolean { return this.period === 'CUSTOM'; }


  public onClickMetric(metric:  'PRICE' | 'VOLUME' | 'EQUITY' | 'PTOB' | 'PTOS' | 'PTOE' ) {
    this._controlsService.setMetric(metric);
  }

  public onClickPeriod(period: TimelinePeriodType) {
    this._controlsService.setPeriod(period);
  }

  public onClickClose(){
    this.closeOptions.emit(true);
  }
}
