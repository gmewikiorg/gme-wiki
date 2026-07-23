import { Component } from '@angular/core';
import { ScreenService } from '../../shared/services/screen-size.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private _screenService: ScreenService, private angularRouter: Router){
  }

  public get isMobile(): boolean { return this._screenService.isMobile;}
  public get gitHubUrl(): string { return this._screenService.gitHubUrl; }

  public get router(): Router { return this.angularRouter; }
}
