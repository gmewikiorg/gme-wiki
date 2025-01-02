import { Component } from '@angular/core';
import { TimelineSignificanceControlComponent } from './timeline-significance-control/timeline-significance-control.component';
import { TimelineCategoriesControlComponent } from './timeline-categories-control/timeline-categories-control.component';
import { CommonModule } from '@angular/common';
import { ScreenService } from '../../../../shared/services/screen-size.service';

@Component({
  selector: 'app-timeline-settings-control',
  standalone: true,
  imports: [TimelineSignificanceControlComponent, TimelineCategoriesControlComponent, CommonModule],
  templateUrl: './timeline-settings-control.component.html',
  styleUrl: './timeline-settings-control.component.scss'
})
export class TimelineSettingsControlComponent {
  constructor(private _screenService: ScreenService){}
  public get isMobile(): boolean { return this._screenService.isMobile; }
}
