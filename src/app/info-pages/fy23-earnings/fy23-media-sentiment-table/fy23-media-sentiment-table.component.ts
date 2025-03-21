import { Component } from '@angular/core';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fy23-media-sentiment-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fy23-media-sentiment-table.component.html',
  styleUrl: './fy23-media-sentiment-table.component.scss'
})
export class Fy23MediaSentimentTableComponent {
  constructor(private _screenService: ScreenService){

  }

  public get isMobile(): boolean { return this._screenService.isMobile; }
  public get isLarge(): boolean { return this._screenService.screenWidth > 1100; }

}
