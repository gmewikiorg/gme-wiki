import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { Title } from '@angular/platform-browser';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ScreenService } from './shared/services/screen-size.service';
import { SettingsService } from './shared/services/settings.service';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _settingsService: SettingsService,
    private _router: Router,
    private _loadingService: LoadingService,
    private _screenService: ScreenService,
  ) {
    this._isBrowser = isPlatformBrowser(this.platformId);
    const isServer: boolean = isPlatformServer(this.platformId);
  }

  private _isBrowser: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const width: number = event.target.width;
    const height: number = event.target.height;
    this._screenService.updateScreenSize(width, height);
  }

  // @HostListener('touchstart', ['$event'])
  // onTouchStart(event: TouchEvent): void {
  //   // this._screenService.setIsTouchDevice(true);
  // }

  // @HostListener('touchmove', ['$event'])
  // onTouchMove(event: TouchEvent): void {
  //   // this._screenService.setIsTouchDevice(true);
  // }


  async ngOnInit() {
    this._loadingService.loadEarnings();
    this._settingsService.getSettings();
    if (this._isBrowser) {
      this._screenService.refreshDarkMode();
      this._router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          // if (event.url === '/') {
          //   this._router.navigate(['/timeline']);
          // }else{
          //   if(event.url === '/timeline'){
          //   }
          // }
        }
      });
    }
  }

  public get appNgClass(): string[] { return this._screenService.pageContentNgClass; }

}
