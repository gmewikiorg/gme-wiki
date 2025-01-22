import { Component } from '@angular/core';
import { MobileMenuItem } from './mobile-menu-item.class';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBars, faInfo, faQuestion, faSliders } from '@fortawesome/free-solid-svg-icons';
import { mobileMenuItems } from './mobile-menu-items';
import { TimelineControlsComponent } from '../../main-pages/timeline/timeline-controls/timeline-controls.component';
import { LoadingService } from '../../shared/services/loading.service';
import { OwnershipIconComponent } from '../../shared/nav-icons/ownership-icon/ownership-icon.component';
import { SocialMediaIconComponent } from '../../shared/nav-icons/social-media-icon/social-media-icon.component';
import { TimelineIconComponent } from '../../shared/nav-icons/timeline-icon/timeline-icon.component';
import { EarningsIconComponent } from '../../shared/nav-icons/earnings-icon/earnings-icon.component';

@Component({
  selector: 'app-mobile-top-bar',
  standalone: true,
  imports: [RouterModule, CommonModule, FontAwesomeModule, TimelineControlsComponent, OwnershipIconComponent, SocialMediaIconComponent, TimelineIconComponent, EarningsIconComponent],
  templateUrl: './mobile-top-bar.component.html',
  styleUrl: './mobile-top-bar.component.scss'
})
export class MobileTopBarComponent {

  constructor(private router: Router, private _loadingService: LoadingService) { }

  private _isTimeline: boolean = false;
  private _menuIsExpanded: boolean = false;
  private _selectedMenuItem: MobileMenuItem | null = null;

  public get menuIsExpanded(): boolean { return this._menuIsExpanded; }
  public get selectedMenuItem(): MobileMenuItem | null { return this._selectedMenuItem; }
  public get isTimeline(): boolean { return this._isTimeline; }

  public get faInfo(): IconDefinition { return faInfo; }
  public get faSliders(): IconDefinition { return faSliders; }
  public get faQuestion(): IconDefinition { return faQuestion; }
  public get faBars(): IconDefinition { return faBars; }
  public get mobileMenuItems(): MobileMenuItem[] { return mobileMenuItems; }
  public get isLoading(): boolean { return this._loadingService.dataIsLoading; }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this._setItem(event.url);
      }
    });
    this._setItem(this.router.url)
  }

  private _setItem(url: string) {
    let itemFound: boolean = false;
    this._isTimeline = false;
    this.mobileMenuItems.forEach(item => item.unselect());
    this.mobileMenuItems.forEach(item => {
      if (item.routerLink === url) {
        item.select();
        this._selectedMenuItem = item;
        itemFound = true;
      }

    });
    if (url === '/' || url === '/timeline') {
      this._isTimeline = true;
      const timelineItem = this.mobileMenuItems.find(item => item.routerLink === '/timeline');
      if (timelineItem) {
        this._selectedMenuItem = timelineItem;
        itemFound = true;
      }
    }
    if (!itemFound) {
      this._selectedMenuItem = null;
    }
  }

  public onClickMenuItem(item: MobileMenuItem) {
    this.mobileMenuItems.forEach(item => item.unselect());
    item.onClick(this.router);
    this._menuIsExpanded = false;
  }
  public onClickImage() {
    // if(this.selectedMenuItem?.routerLink === '/timeline'){
    //   this._menuIsExpanded = !this._menuIsExpanded;
    // }
  }

  public onClickTopBar() {
    this._menuIsExpanded = !this._menuIsExpanded;
  }

}
