import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-timeline-content',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './timeline-content.component.html',
  styleUrl: './timeline-content.component.scss'
})
export class TimelineContentComponent {

}
