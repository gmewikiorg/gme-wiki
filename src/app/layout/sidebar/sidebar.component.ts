import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes, } from '@angular/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoins, faChartLine, faChartPie, faSliders, faQuestion, faBars, faCircleInfo, faTableList, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SettingsService } from '../../shared/services/settings.service';
import { ScreenService } from '../../shared/services/screen-size.service';
import { OwnershipIconComponent } from '../../shared/nav-icons/ownership-icon/ownership-icon.component';
import { SocialMediaIconComponent } from '../../shared/nav-icons/social-media-icon/social-media-icon.component';
import { TimelineIconComponent } from '../../shared/nav-icons/timeline-icon/timeline-icon.component';
import { EarningsIconComponent } from '../../shared/nav-icons/earnings-icon/earnings-icon.component';
import { StartIconComponent } from '../../shared/nav-icons/start-icon/start-icon.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, CommonModule, OwnershipIconComponent, SocialMediaIconComponent, TimelineIconComponent, EarningsIconComponent, StartIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('appear', [
      state('appear', style({
        transform: 'translateX(0)',
        opacity: 1,
      })),
      transition('void => *', [
        style({
          transform: 'translateX(-270px)',
          opacity: 0.3,
        }),
        animate(120, style({
          opacity: 1,
          transform: 'translateX(0)',
        }))
      ]),
      transition('* => void', [
        style({
          transform: 'translateX(0)',
          opacity: 1,
        }),
        animate(120, style({
          opacity: 0.3,
          transform: 'translateX(-270px)',
        }))
      ]),
    ]),
  ]
})
export class SidebarComponent {
  constructor(
    private _settingsService: SettingsService,
    private _router: Router,
    private _screenService: ScreenService
  ) { }
  public get faChartLine(): IconDefinition { return faChartLine; }
  public get faChartPie(): IconDefinition { return faChartPie; }
  public get faQuestion(): IconDefinition { return faQuestion; }
  public get faBars(): IconDefinition { return faBars; }
  public get faCircleInfo(): IconDefinition { return faCircleInfo; }
  public get faTableList(): IconDefinition { return faTableList; }
  public get showAsList(): boolean { return this._settingsService.chartListIsVertical; }
  public get isDarkMode(): boolean { return this._screenService.isDarkMode; }

  ngOnInit(): void {
    this._router.events.subscribe((event) => {
    })
    this.areaOutSideClicked.subscribe(() => {
      console.log("Out of sidebar")
      this._menuIsOpen = false;
      this._clicked = false;
    })
  }

  private _message: string = '';
  public get message(): string { return this._message; }

  ngAfterViewInit() {
  }

  @ViewChild('menu') menuButtonElement: ElementRef | null = null;
  @Input() areaOutSideClicked: Subject<boolean> = new Subject();

  private _menuIsOpen: boolean = false;
  public get menuIsOpen(): boolean { return this._menuIsOpen; }
  public onMouseLeave() {
    this._menuIsOpen = false;
  }
  private _clicked = false;
  public onClick() {
    this._menuIsOpen = !this._menuIsOpen;
    this._clicked = true;
  }
  public onMouseEnter() {
      this._menuIsOpen = true;

  }

}
