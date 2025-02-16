import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MobileTopBarComponent } from './mobile-top-bar/mobile-top-bar.component';
import { ScreenService } from '../shared/services/screen-size.service';
import { LoadingService } from '../shared/services/loading.service';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { timer } from 'rxjs';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, MobileTopBarComponent, LoadingComponent, FontAwesomeModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, AfterViewInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _sizeService: ScreenService, 
    private _loadingService: LoadingService, 
    private router: Router,
    private _screenService: ScreenService) {
    if (isPlatformBrowser(this.platformId)) {
      this._isBrowser = true;
    } else {
      this._isBrowser = false;
    }
    if (isPlatformServer(this.platformId)) {
      this._isServer = true;
    } else {
      this._isServer = false;
    }

  }

  private _isServer: boolean = false;
  private _isBrowser: boolean = true;
  private _isMobile: boolean = false;
  private _isLoading: boolean = true;
  public get isLoading(): boolean { return this._isLoading; }
  public get isBrowser(): boolean { return this._isBrowser; }
  public get isServer(): boolean { return this._isServer; }
  public get isMobile(): boolean { return this._isMobile; }
  public get loadingMessage(): string { return this._loadingService.loadingMessage; }

  public get faMoon(): IconDefinition { return faMoon; }
  public get faSun(): IconDefinition { return faSun; }

  public get isDarkMode(): boolean { return this._screenService.isDarkMode; }
  public onClickDarkMode() { this._screenService.onClickDarkMode(); }
  public onClickLightMode() { this._screenService.onClickLightMode(); }

  ngOnInit() {
    if (this._isBrowser) {
      if (this.router.url === '/timeline') {
      }

      /**
       * Without this timer, for some reason there is an issue with this components value of _isLoading, 
       * behaving as if it is both true and false for a brief moment in time
       */
      timer(100).subscribe(() => {

        if (window.innerWidth < 480) {
          this._isMobile = true;
        } else {
          this._isMobile = false;
        }
        this._isLoading = false;
      });
      this._sizeService.screenDimensions$.subscribe({
        next: () => {
          if (window.innerWidth < 480) {
            this._isMobile = true;
          } else {
            this._isMobile = false;
          }
        }
      })
      // this._loadingService.dataIsLoading$.subscribe(change => {
      //   this._isLoading = change;
      // })
    }
  }

  private _afterViewInit: boolean = false;
  public get afterViewInit(): boolean { return this._afterViewInit; }
  ngAfterViewInit(): void {
    // if (isPlatformBrowser(this.platformId)) {
    //   const ssrElements = document.querySelectorAll('.ssr-hidden');
    //   ssrElements.forEach(el => el.classList.remove('ssr-hidden'));
    // }
  }
}
