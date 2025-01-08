import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CNBCVsNakedShortsComponent } from '../cnbc-on-naked-shorts/cnbc-on-naked-shorts.component';

@Component({
  selector: 'app-naked-short-selling',
  standalone: true,
  imports: [RouterModule, CNBCVsNakedShortsComponent],
  templateUrl: './naked-short-selling.component.html',
  styleUrl: './naked-short-selling.component.scss'
})
export class NakedShortSellingComponent {

}
