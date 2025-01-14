import { Component, ElementRef, ViewChild } from '@angular/core';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { SettingsService } from '../../../shared/services/settings.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TimelineItemsService } from '../timeline-items/timeline-items.service';
import { EventSearchService } from './timeline-search-control/search/event-search.service';
import { faMagnifyingGlass, faQuestion, faSliders } from '@fortawesome/free-solid-svg-icons';
import { TimelineSearchControlComponent } from './timeline-search-control/timeline-search-control.component';
import { TimelineSettingsControlComponent } from './timeline-settings-control/timeline-settings-control.component';
import { ChooseGmeMetricComponent } from '../timeline-chart/chart-options/timeline-chart-options.component';

@Component({
  selector: 'app-timeline-controls',
  standalone: true,
  imports: [
    FontAwesomeModule, 
    CommonModule, 
    TimelineSearchControlComponent,
    TimelineSettingsControlComponent,
    ChooseGmeMetricComponent
  ],
  templateUrl: './timeline-controls.component.html',
  styleUrl: './timeline-controls.component.scss',
  animations: [
    trigger('appear', [
      state('appear', style({
        transform: 'translateX(0)',
        opacity: 1,
      })),
      // state('disappear', style({
      //   transform: 'translateX(-100%)',
      //   opacity: 0.3,
      // })),
      transition('void => *', [
        style({
          transform: 'translateY(1px)',
          opacity: 0.3,
        }),
        animate(120, style({
          opacity: 1,
          transform: 'translateY(0)',
        }))
      ]),
      transition('* => void', [
        style({
          transform: 'translateY(0)',
          opacity: 1,
        }),
        animate(120, style({
          opacity: 0.3,
          transform: 'translateY(1px)',
        }))
      ]),
    ]),
  ]
})
export class TimelineControlsComponent {

  constructor(
    private _sizeService: ScreenService,
    private _settingsService: SettingsService,
    private _timelineItemService: TimelineItemsService,
    private _searchService: EventSearchService) { }

  ngOnInit(): void {
    this._searchService.closeControls$.subscribe({
      next: ()=>{
        this._settingsOpen = false;
        this._storyChaptersOpen = false;
        this._showSearchResults = false;
      }
    })
  }



  public get faSliders() { return faSliders; }
  public get faQuestion() { return faQuestion; }
  public get faMagnifyingGlass() { return faMagnifyingGlass; }

  public get isMobile(): boolean { return this._sizeService.isMobile; }
  public get showAsList(): boolean { return this._settingsService.chartListIsVertical; }

  public displayControls: boolean = false;

  private _showSearchResults: boolean = false;
  // private _searchIsOpen: boolean = false;
  private _settingsOpen: boolean = false;
  private _storyChaptersOpen: boolean = false;

  private _searchValue: string = '';
  private _searchInputValue: string = '';

  // public get searchIsOpen(): boolean { return this._searchIsOpen; }
  public get settingsOpen(): boolean { return this._settingsOpen; }
  public get storyChaptersOpen(): boolean { return this._storyChaptersOpen; }
  public get showSearchResults(): boolean { return this._showSearchResults; }
  public get searchInputValue(): string { return this._searchInputValue; }
  public get searchValue(): string { return this._searchValue; }

  public onClickSettings() {
    if (this._settingsOpen === true) {
      this._settingsOpen = false;
    } else {
      this._timelineItemService.unselectAll();
      this._settingsOpen = true;
      this._storyChaptersOpen = false;
      this._showSearchResults = false;
      this.searchbox.nativeElement.blur();
    }

  }
  public onMouseLeaveControls() {
    this._settingsOpen = false;
    this._storyChaptersOpen = false;
    this._showSearchResults = false;
    this._searchValue = this._searchInputValue;
  }

  public onClickSearchText() {
    this._settingsOpen = false;
    this._storyChaptersOpen = false;
    this._showSearchResults = true;
  }
  public onClickSearchButton() {
    if (this._showSearchResults === true) {
      this._showSearchResults = false;
    } else {
      this._settingsOpen = false;
      this._storyChaptersOpen = false;
      this._showSearchResults = true;
    }

  }
  public onClickStory() {
    if (this._storyChaptersOpen === true) {
      this._storyChaptersOpen = false;
    } else {
      this._storyChaptersOpen = true;
      this._settingsOpen = false;
      this._showSearchResults = false;
    }

  }

  @ViewChild('searchbox') searchbox: ElementRef = new ElementRef('');

  public onKey(event: any) {
    this._showSearchResults = true;
    const inputValue: string = event.target.value;
    this._searchInputValue = inputValue;
    this._searchValue = inputValue;
  }

  public onSearchInputValueChanged(value: string) {
    this._searchInputValue = value;
    if (value === '') {
      this._searchValue = '';
    }
  }



  private _isOverStoryIcon: boolean = false;
  public get isOverStoryIcon(): boolean { return this._isOverStoryIcon; }

  public onMouseEnterStory() {
    this._isOverStoryIcon = true;
  }
  public onMouseLeaveStory() {
    this._isOverStoryIcon = false;
  }
}
