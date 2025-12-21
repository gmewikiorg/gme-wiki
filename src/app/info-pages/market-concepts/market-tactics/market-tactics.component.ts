import { Component } from '@angular/core';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-market-tactics',
  standalone: true,
  imports: [FooterComponent, RouterLink],
  templateUrl: './market-tactics.component.html',
  styleUrl: './market-tactics.component.scss'
})
export class MarketTacticsComponent {

}
