import { Component } from '@angular/core';
import { HelpContributeComponent } from '../../shared/components/help-contribute/help-contribute.component';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-reddit',
  standalone: true,
  imports: [HelpContributeComponent, FooterComponent],
  templateUrl: './reddit.component.html',
  styleUrl: './reddit.component.scss'
})
export class RedditComponent {

}
