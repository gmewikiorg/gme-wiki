import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-burp',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './burp.component.html',
  styleUrl: './burp.component.scss'
})
export class BurpComponent {

}
