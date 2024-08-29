import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MobileTopBarComponent } from './mobile-top-bar/mobile-top-bar.component';
import { ScreenService } from '../shared/services/screen-size.service';
import { LoadingService } from '../shared/services/loading.service';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { timer } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, MobileTopBarComponent, LoadingComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, AfterViewInit{

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private _sizeService: ScreenService, private _loadingService: LoadingService, private router: Router) { 
    if (isPlatformBrowser(this.platformId)) {
      this._isBrowser = true;
    } else {
      this._isBrowser = false;
    }

  }
  private _isBrowser: boolean;
  private _isMobile: boolean = false;
  private _isLoading: boolean = true;
  public get isLoading(): boolean { return this._isLoading; }
  public get isMobile(): boolean { return this._isMobile; }
  public get loadingMessage(): string { return this._loadingService.loadingMessage; }

  ngOnInit(){
    if(this._isBrowser){
      if(this.router.url === '/timeline'){
      }
      if(window.innerWidth < 480){
        this._isMobile = true;
      }else{
        this._isMobile = false;
      }
      /**
       * Without this timer, for some reason there is an issue with this components value of _isLoading, 
       * behaving as if it is both true and false for a brief moment in time
       */
      timer(0).subscribe(() => {
        this._isLoading = false;
      });
      this._sizeService.screenDimensions$.subscribe({
        next: ()=>{
          if(window.innerWidth < 480){
            this._isMobile = true;
          }else{
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
    this._afterViewInit = true;
  }
}
