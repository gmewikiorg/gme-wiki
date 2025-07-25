import { Component, EventEmitter, Output } from '@angular/core';
import { TimelineControlsService } from '../timeline-controls.service';
import { CommonModule } from '@angular/common';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TimelineEventViewType } from '../../timeline-items/timeline-item/timeline-event-url.interface';
import { TimelineChartMetric } from './timeline-chart-metric';

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

  public get metric(): TimelineChartMetric { return this._controlsService.metric; }
  public get period(): TimelineEventViewType { return this._controlsService.period; }

  public get metricIsPrice(): boolean { return this.metric === 'PRICE'; }
  public get metricIsVolume(): boolean { return this.metric === 'VOLUME'; }
  public get metricIsPtoB(): boolean { return this.metric === 'PTOB'; }
  public get metricIsPtoS(): boolean { return this.metric === 'PTOS'; }
  public get metricIsPtoE(): boolean { return this.metric === 'PTOE'; }
  public get metricIsEquity(): boolean { return this.metric === 'EQUITY'; }
  public get metricIsFTDs(): boolean { return this.metric === 'FTDs'; }

  public get periodIs1Year(): boolean { return this.period === '2_YEARS'; }
  public get periodIs5Years(): boolean { return this.period === '5_YEARS'; }
  public get periodIsCurrent(): boolean { return this.period === 'CURRENT'; }
  public get periodIsHistoric(): boolean { return this.period === 'HISTORIC'; }
  public get periodIsCustom(): boolean { return this.period === 'CUSTOM'; }

  onClickMetricFTDs() { this._controlsService.setMetric(TimelineChartMetric.FTDs); }
  onClickMetricPTOE() { this._controlsService.setMetric(TimelineChartMetric.PTOE); }
  onClickMetricPTOS() { this._controlsService.setMetric(TimelineChartMetric.PTOS); }
  onClickMetricPTOB() { this._controlsService.setMetric(TimelineChartMetric.PTOB); }
  onClickMetricVolume() { this._controlsService.setMetric(TimelineChartMetric.VOLUME); }
  onClickMetricPrice() { this._controlsService.setMetric(TimelineChartMetric.PRICE); }



  public onClickPeriod(period: TimelineEventViewType) {
    this._controlsService.setPeriod(period);
  }

  public onClickClose() {
    this.closeOptions.emit(true);
  }
}
