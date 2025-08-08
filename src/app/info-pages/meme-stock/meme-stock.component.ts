import { Component } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-meme-stock',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './meme-stock.component.html',
  styleUrl: './meme-stock.component.scss'
})
export class MemeStockComponent {

}
