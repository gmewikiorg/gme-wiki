import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { SettingsService } from '../../../../../shared/services/settings.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-timeline-view-control',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './timeline-view-control.component.html',
  styleUrl: './timeline-view-control.component.scss'
})
export class TimelineViewControlComponent {
  public get faList(): IconDefinition { return faList; }
  constructor(private _settingsService: SettingsService){}
  public get showAsList(): boolean { return this._settingsService.chartListIsVertical; }
  ngOnInit(){
  }
  public onClickHorizontal(){
    this._settingsService.updateListDirection('HORIZONTAL');
  }
  public onClickVertical(){
    this._settingsService.updateListDirection('VERTICAL');
  }
}
