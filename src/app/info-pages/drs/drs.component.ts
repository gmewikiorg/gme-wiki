import { Component } from '@angular/core';
import { DrsTimelineComponent } from './drs-timeline/drs-timeline.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-drs',
  standalone: true,
  imports: [DrsTimelineComponent, RouterModule],
  templateUrl: './drs.component.html',
  styleUrl: './drs.component.scss'
})
export class DrsComponent {

}
