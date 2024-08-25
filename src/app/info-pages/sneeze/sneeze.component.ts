import { Component } from '@angular/core';
import { HelpContributeComponent } from '../../shared/components/help-contribute/help-contribute.component';

@Component({
  selector: 'app-sneeze',
  standalone: true,
  imports: [HelpContributeComponent],
  templateUrl: './sneeze.component.html',
  styleUrl: './sneeze.component.scss'
})
export class SneezeComponent {

}
