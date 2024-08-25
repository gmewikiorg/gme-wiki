import { Component } from '@angular/core';
import { ScreenService } from '../../shared/services/screen-size.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-atms-2024',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atms-2024.component.html',
  styleUrl: './atms-2024.component.scss'
})
export class Atms2024Component {
  constructor(private _screenService: ScreenService){}

  public get isMobile(): boolean { return this._screenService.isMobile; }
}
