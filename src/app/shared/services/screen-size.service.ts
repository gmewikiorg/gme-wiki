import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, isSignal, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this._isMobile = false;
    if (isPlatformBrowser(this.platformId)) {
      this._screenDimensions$ = new BehaviorSubject({ width: window.innerWidth, height: window.innerHeight });
      this._browser = window.navigator.userAgent;
      this._isBrowser = true;
      if(window.innerWidth < 480){
        this._isMobile = true;
      }
    } else {
      this._isBrowser = false;
      this._isMobile = false;
      this._screenDimensions$ = new BehaviorSubject({ width: 800, height: 600 });
    }

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


}
