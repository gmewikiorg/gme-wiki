import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-sneeze-vs-squeeze',
  standalone: true,
  imports: [RouterModule,FooterComponent],
  templateUrl: './sneeze-vs-squeeze.component.html',
  styleUrl: './sneeze-vs-squeeze.component.scss'
})
export class SneezeVsSqueezeComponent {

}
