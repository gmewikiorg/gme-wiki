import { Component } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {

}
