import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MobileTopBarComponent } from './mobile-top-bar/mobile-top-bar.component';
import { ScreenService } from '../shared/services/screen-size.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, MobileTopBarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent{

  constructor(private _sizeService: ScreenService) { }
  public get isMobile(): boolean { return this._sizeService.isMobile; }
}
