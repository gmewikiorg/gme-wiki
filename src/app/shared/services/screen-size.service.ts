import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, isSignal, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private _settingsService: SettingsService) {
    this._isMobile = false;
    if (isPlatformBrowser(this.platformId)) {
      this._screenDimensions$ = new BehaviorSubject({ width: window.innerWidth, height: window.innerHeight });
      this._browser = window.navigator.userAgent;
      this._isBrowser = true;
      if (window.innerWidth < 480) {
        this._isMobile = true;
      }
    } else {
      this._isBrowser = false;
      this._isMobile = false;
      this._screenDimensions$ = new BehaviorSubject({ width: 800, height: 600 });
    }

    this._setDarkMode(this._settingsService.getDarkMode());

  }



  private _isBrowser: boolean;
  private _isMobile: boolean;
  private _screenDimensions$: BehaviorSubject<{ width: number, height: number }>;
  public get screenDimensions$(): Observable<{ width: number, height: number }> { return this._screenDimensions$.asObservable(); }
  public get screenDimensions(): { width: number, height: number } { return this._screenDimensions$.getValue(); }
  public get isMobile(): boolean { return this._isMobile; }
  public get isBrowser(): boolean { return this._isBrowser; }



  public updateScreenSize(width: number, height: number) {
    this._screenDimensions$.next({ width: width, height: height });
    this._isMobile = this.screenDimensions.width < 480;
  }


  public get screenWidth(): number { return this.screenDimensions.width; }
  public get screenHeight(): number { return this.screenDimensions.height; }
  public get isLargeScreen(): boolean { return this.screenWidth > 800 && this.screenHeight > 800; }




  private _browser: string = '';
  public get browser(): string { return this._browser; }

  public get browserIsSafari(): boolean {
    return this._browser.includes('AppleWebKit') && this._browser.includes('Safari') && !this._browser.includes('Chrome');
  }

  private _setDarkMode(isDarkMode: boolean){
    this._isDarkMode = isDarkMode;
    if(this._isDarkMode){
      this._pageTitleNgClass = ['dark-mode'];
      this._pageContentNgClass = ['dark-mode'];
      this._pageSectionNgClass = ['dark-mode'];
      this._pageSectionHeadingNgClass = ['dark-mode'];
    }else{
      this._pageTitleNgClass = ['light-mode'];
      this._pageContentNgClass = ['light-mode'];
      this._pageSectionNgClass = ['light-mode'];
      this._pageSectionHeadingNgClass = ['light-mode'];
    }
    this._settingsService.setDarkMode(isDarkMode);
  }

  private _isDarkMode: boolean = false;
  public get isDarkMode(): boolean { return this._isDarkMode; }
  public toggleDarkMode() { 
    this._isDarkMode = !this._isDarkMode; 
    this._setDarkMode(this._isDarkMode);
  }

  


  private _pageTitleNgClass: string[] = ['light-mode'];
  private _pageContentNgClass: string[] = ['light-mode'];
  private _pageSectionNgClass: string[] = ['light-mode'];
  private _pageSectionHeadingNgClass: string[] = ['light-mode'];

  public get pageTitleNgClass(): string[] { return this._pageTitleNgClass; }
  public get pageContentNgClass(): string[] { return this._pageContentNgClass; }
  public get pageSectionNgClass(): string[] { return this._pageSectionNgClass; }
  public get pageSectionHeadingNgClass(): string[] { return this._pageSectionHeadingNgClass; }  


}
