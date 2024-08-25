import { Component } from '@angular/core';
import { HelpContributeComponent } from '../../shared/components/help-contribute/help-contribute.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-moass',
  standalone: true,
  imports: [HelpContributeComponent, RouterModule],
  templateUrl: './moass.component.html',
  styleUrl: './moass.component.scss'
})
export class MoassComponent {

}
