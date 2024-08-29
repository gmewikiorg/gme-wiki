import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { Title } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ScreenService } from './shared/services/screen-size.service';
import { SettingsService } from './shared/services/settings.service';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gme-timeline-3';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _titleService: Title,
    private _sizeService: ScreenService,
    private _settingsService: SettingsService,
    private _router: Router,
    private _loadingService: LoadingService,
  ) {
    this._isBrowser = isPlatformBrowser(this.platformId);
    const isServer: boolean = isPlatformServer(this.platformId);
    
  }

  private _isBrowser: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const width: number = event.target.innerWidth;
    const height: number = event.target.innerHeight;
    this._sizeService.updateScreenSize(width, height);
  }

  async ngOnInit() {
    this._settingsService.getSettings();
    if(this._isBrowser){
      this._router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          if (event.url === '/') {
            this._router.navigate(['/timeline']);
          }else{
            if(event.url === '/timeline'){
            }
          }
        }
        const element = document.querySelector('#app-component-root');
        if(element){
          element.scrollIntoView();
        }
      });
    }
    
  }

}
