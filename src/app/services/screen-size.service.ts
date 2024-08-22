import { Injectable, isSignal } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {

  constructor() {
    this._screenDimensions$ = new BehaviorSubject({ width: window.innerWidth, height: window.innerHeight });
    this._browser = window.navigator.userAgent;
  }

  private _screenDimensions$: BehaviorSubject<{ width: number, height: number }>;
  public get screenDimensions$(): Observable<{ width: number, height: number }> { return this._screenDimensions$.asObservable(); }
  public get screenDimensions(): { width: number, height: number } { return this._screenDimensions$.getValue(); }
  public get isMobile(): boolean { return this.screenDimensions.width < 480; }



  public updateScreenSize(width: number, height: number) {
    this._screenDimensions$.next({ width: width, height: height });
  }

  
  public get screenWidth(): number { return this.screenDimensions.width; }
  public get screenHeight(): number { return this.screenDimensions.height; }
  public get isLargeScreen(): boolean { return this.screenWidth > 800 && this.screenHeight > 800;}

   
  
  
  private _browser: string = '';
  public get browser(): string { return this._browser; }

  public get browserIsSafari(): boolean { 
    return this._browser.includes('AppleWebKit') && this._browser.includes('Safari') && !this._browser.includes('Chrome');
  }


}
