import { Component } from '@angular/core';
import { HelpContributeComponent } from '../../shared/components/help-contribute/help-contribute.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-turnaround',
  standalone: true,
  imports: [HelpContributeComponent, RouterModule],
  templateUrl: './turnaround.component.html',
  styleUrl: './turnaround.component.scss'
})
export class TurnaroundComponent {

}
