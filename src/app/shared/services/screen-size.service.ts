import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, isSignal, PLATFORM_ID } from '@angular/core';
import { SettingsService } from './settings.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private _settingsService: SettingsService, private titleService: Title, private meta: Meta) {
    if (isPlatformBrowser(this.platformId)) {
      this._screenDimensions$ = new BehaviorSubject({ width: window.innerWidth, height: window.innerHeight });
      this._browser = window.navigator.userAgent;
      this._isBrowser = true;
      if (window.innerWidth < 480) {
        this._isMobile$.next(true);
      }
    } else {
      this._isBrowser = false;
      this._isMobile$.next(false);
      this._screenDimensions$ = new BehaviorSubject({ width: 800, height: 600 });
    }
    this._setDarkMode(this._settingsService.getDarkMode());
  }

  public setPageInfo(title: string, description: string, url: string, image: string){
    this.titleService.setTitle(title)
    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: description, },
      { name: 'keywords', content: 'GameStop, GME, gmewiki, gme wiki, gmewiki.org, wiki' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: title, },
      { property: 'og:description', content: description, },
      { property: 'og:image', content: image}, 
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' }, // Optimized Twitter card format
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image}, 
    ]);
  }



  private _isBrowser: boolean;
  private _isMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _changedScreenFromToMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _screenDimensions$: BehaviorSubject<{ width: number, height: number }>;
  public get screenDimensions$(): Observable<{ width: number, height: number }> { return this._screenDimensions$.asObservable(); }
  public get screenDimensions(): { width: number, height: number } { return this._screenDimensions$.getValue(); }
  public get isMobile(): boolean { return this._isMobile$.getValue(); }
  public get isMobile$(): Observable<boolean> { return this._isMobile$.asObservable(); }
  public get isBrowser(): boolean { return this._isBrowser; }
  public get changedScreenFromToMobile$(): Observable<boolean> { return this._changedScreenFromToMobile$.asObservable();}



  public updateScreenSize(width: number, height: number) {
    const wasMobile: boolean = this.isMobile;
    const mobileCutoff = 480;
    this._screenDimensions$.next({ width: width, height: height });
    
    if(width < mobileCutoff){
      // is now mobile
      if(!wasMobile){
        this._changedScreenFromToMobile$.next(true);
      }

      this._isMobile$.next(true);
    }else{
      // is now not mobile
      if(wasMobile){
        this._changedScreenFromToMobile$.next(true);
      }
      this._isMobile$.next(false);
    }
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
    if(isDarkMode){
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
    this._isDarkMode$.next(isDarkMode);
  }

  private _isDarkMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public get isDarkMode(): boolean { return this._isDarkMode$.getValue(); }
  public get isDarkMode$(): Observable<boolean> { return this._isDarkMode$.asObservable(); }
  public onClickDarkMode() { 
    this._setDarkMode(true);
  }
  public onClickLightMode(){
    this._setDarkMode(false);
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
