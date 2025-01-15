import { Component } from '@angular/core';
import { HelpContributeComponent } from '../../shared/components/help-contribute/help-contribute.component';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [HelpContributeComponent, FooterComponent],
  templateUrl: './media.component.html',
  styleUrl: './media.component.scss'
})
export class MediaComponent {

}
