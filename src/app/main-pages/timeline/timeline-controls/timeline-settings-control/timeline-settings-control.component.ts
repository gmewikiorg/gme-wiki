import { Component } from '@angular/core';
import { TimelineSignificanceControlComponent } from './timeline-significance-control/timeline-significance-control.component';
import { TimelineViewControlComponent } from './timeline-view-control/timeline-view-control.component';
import { TimelineCategoriesControlComponent } from './timeline-categories-control/timeline-categories-control.component';

@Component({
  selector: 'app-timeline-settings-control',
  standalone: true,
  imports: [TimelineSignificanceControlComponent, TimelineViewControlComponent, TimelineCategoriesControlComponent],
  templateUrl: './timeline-settings-control.component.html',
  styleUrl: './timeline-settings-control.component.scss'
})
export class TimelineSettingsControlComponent {

}
