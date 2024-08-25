import { Component } from '@angular/core';
import { CategoryButton } from './category-button.interface';
import { TimelineEventType } from '../../../timeline-items/timeline-item/timeline-event-type.enum';
import { ChartDataManagerService } from '../../../timeline-chart/timeline-chart-data-manager-service';
import { SettingsService } from '../../../../../shared/services/settings.service';
import { TimelineItemsService } from '../../../timeline-items/timeline-items.service';
import { CategoryButtons } from './category-button-manager.class';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timeline-categories-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline-categories-control.component.html',
  styleUrl: './timeline-categories-control.component.scss'
})
export class TimelineCategoriesControlComponent {

  constructor(
    private _dataManagerService: ChartDataManagerService,
    private _itemService: TimelineItemsService,
    private _settingsService: SettingsService,
    private _chartDataService: ChartDataManagerService,) { }

  private _buttonManager: CategoryButtons  = new CategoryButtons();
  public get buttonManager(): CategoryButtons { return this._buttonManager; }
  public get categoryButtons(): CategoryButton[] { return this.buttonManager.categoryButtons; }

  ngOnInit() {
    // const existingCategoriesFilter: TimelineItemType[] = this._dataManagerService.categories;
    const existingCategoriesFilter = this._settingsService.categories;
    this._buttonManager.setCategories(existingCategoriesFilter);
  }

  public getBackgroundColor(button: CategoryButton): string {
    const category = button.category;
    let color = '';
    if (category !== 'ALL') {
      color = this._chartDataService.getTypeColor(category, 0.2);
    }
    return color;
  }
  public getButtonClass(button: CategoryButton, showOrHide: 'show' | 'hide') {
    let ngClass: string[] = [];
    if (showOrHide === 'show') {
      if (button.showActivated) {
        if (button.category === 'ALL') {
          ngClass.push('show-all-selected');
        } else {
          const type = button.category;
          if (type === TimelineEventType.CORP) {
            ngClass.push('corporate-selected');
          } else if (type === TimelineEventType.MEDIA) {
            ngClass.push('media-selected');
          } else if (type === TimelineEventType.RC) {
            ngClass.push('ryan-cohen-selected');
          } else if (type === TimelineEventType.SOCIAL_MEDIA) {
            ngClass.push('social-media-selected');
          } else if (type === TimelineEventType.OTHER) {
            ngClass.push('other-selected');
          } else if (type === TimelineEventType.DRS) {
            ngClass.push('drs-selected');
          }
        }
      }
    } else {
      // if 'hide' 

      if (button.hideActivated) {
        ngClass.push('hide-selected');
      }
    }


    return ngClass;
  }

  public onClickButtonCategory(button: CategoryButton) {
    this.buttonManager.onClickButtonCategory(button);
    this._makeUpdates();
  }
  public onClickShow(button: CategoryButton) {
    this.buttonManager.onClickShow(button);
    this._makeUpdates();
  }
  public onClickHide(button: CategoryButton) {
    this.buttonManager.onClickHide(button);
    this._makeUpdates();
  }

  private _makeUpdates() {

    const selectedCategories = this.buttonManager.selectedCategories;
    this._settingsService.updateCategories(selectedCategories);
    this._dataManagerService.updateCategories(selectedCategories);
    this._itemService.updateCategories(selectedCategories);
  }

}
