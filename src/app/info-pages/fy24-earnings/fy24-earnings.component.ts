import { Component } from '@angular/core';
import { TurnaroundTableComponent } from '../turnaround/turnaround-table/turnaround-table.component';

@Component({
  selector: 'app-fy24-earnings',
  standalone: true,
  imports: [TurnaroundTableComponent],
  templateUrl: './fy24-earnings.component.html',
  styleUrl: './fy24-earnings.component.scss'
})
export class Fy24EarningsComponent {

}
