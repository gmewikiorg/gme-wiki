import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { TimelineChartSelectionComponent } from './chart-options/timeline-chart-selection.component';

@Component({
  selector: 'app-timeline-controls',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule, TimelineChartSelectionComponent
  ],
  templateUrl: './timeline-controls.component.html',
  styleUrl: './timeline-controls.component.scss',
})
export class TimelineControlsComponent {

  constructor() { }

  ngOnInit(): void {

  }
  public get faSliders() { return faSliders; }
  public displayControls: boolean = false;

}
