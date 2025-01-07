import { Component, EventEmitter, Output } from '@angular/core';
import { TimelineControlsService } from './timeline-controls.service';
import { CommonModule } from '@angular/common';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-choose-gme-metric',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './choose-gme-metric.component.html',
  styleUrl: './choose-gme-metric.component.scss'
})
export class ChooseGmeMetricComponent {

  constructor(private _controlsService: TimelineControlsService) { }

  @Output() closeOptions = new EventEmitter<boolean>();

    public get faX() { return faX; }

  public get metric(): 'PRICE' | 'VOLUME' | 'PtoB' | 'PtoS' { return this._controlsService.metric; }
  public get period(): '2_YEARS' | '5_YEARS' | 'CURRENT' | 'HISTORIC' | 'CUSTOM' { return this._controlsService.period; }

  public get metricIsPrice(): boolean { return this.metric === 'PRICE'; }
  public get metricIsVolume(): boolean { return this.metric === 'VOLUME'; }
  public get metricIsPtoB(): boolean { return this.metric === 'PtoB'; }
  public get metricIsPtoS(): boolean { return this.metric === 'PtoS'; }

  public get periodIs1Year(): boolean { return this.period === '2_YEARS'; }
  public get periodIs5Years(): boolean { return this.period === '5_YEARS'; }
  public get periodIsCurrent(): boolean { return this.period === 'CURRENT'; }
  public get periodIsHistoric(): boolean { return this.period === 'HISTORIC'; }
  public get periodIsCustom(): boolean { return this.period === 'CUSTOM'; }


  public onClickMetric(metric:  'PRICE' | 'VOLUME' | 'PtoB' | 'PtoS') {
    this._controlsService.setMetric(metric);
  }

  public onClickPeriod(period: '2_YEARS' | '5_YEARS' | 'CURRENT' | 'HISTORIC' | 'CUSTOM') {
    this._controlsService.setPeriod(period);
  }

  public onClickClose(){
    this.closeOptions.emit(true);
  }
}
