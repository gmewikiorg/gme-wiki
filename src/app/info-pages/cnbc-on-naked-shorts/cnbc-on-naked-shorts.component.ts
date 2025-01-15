import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-cnbc-on-naked-shorts',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './cnbc-on-naked-shorts.component.html',
  styleUrl: './cnbc-on-naked-shorts.component.scss'
})
export class CNBCVsNakedShortsComponent {

}
