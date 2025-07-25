import { Component } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-reddit',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './reddit.component.html',
  styleUrl: './reddit.component.scss'
})
export class RedditComponent {

}
