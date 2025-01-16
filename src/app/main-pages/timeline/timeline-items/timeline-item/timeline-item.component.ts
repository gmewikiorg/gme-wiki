import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TimelineEvent } from './timeline-event.class';
import { TimelineEventType } from './timeline-event-type.enum';
import { ScreenService } from '../../../../shared/services/screen-size.service';
import { ChartDataManagerService } from '../../timeline-chart/timeline-chart-data-manager-service';
import dayjs from 'dayjs';
import { urlType } from './timeline-event-url.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timeline-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './timeline-item.component.html',
  styleUrl: './timeline-item.component.scss'
})
export class TimelineItemComponent {
  constructor(
    private _router: Router, private _chartDataService: ChartDataManagerService, private _sizeService: ScreenService) { }

  private _item: TimelineEvent = new TimelineEvent({
    title: '',
    dateYYYYMMDD: '',
    urls: [],
    description: '',
    types: [TimelineEventType.OTHER],
    significance: 0, tags: [], expandedUrls: [],
  }, undefined, -1)
  @Input('item') public set item(item: TimelineEvent) { this._item = item; }
  public get item(): TimelineEvent { return this._item; }

  public get isMobile(): boolean { return this._sizeService.isMobile; }

  public get ngClass(): any {
    const mobileExpanded = this.isMobile && this.item.isSelected;
    const mobileNotExpanded = this.isMobile && !this.item.isSelected;
    const notMobileExpanded = !this.isMobile && this.item.isSelected;
    const notMobileNotExpanded = !this.isMobile && !this.item.isSelected;
    if (mobileExpanded) {
      return 'mobile-expanded';
    } else if (mobileNotExpanded) {
      return 'mobile-not-expanded';
    } else if (notMobileExpanded) {
      return 'not-mobile-expanded';
    } else if (notMobileNotExpanded) {
      return 'not-mobile-not-expanded';
    }
  }



  public date(dateYYYYMMDD: string): string {
    return dayjs(dateYYYYMMDD).format('MMMM D, YYYY')
  }

  public linkTypeIsOther(linkType: urlType) {
    if (linkType !== 'LEMMY' && linkType !== 'REDDIT' && linkType !== 'WIKIPEDIA'
      && linkType !== 'YOUTUBE' && linkType !== 'NEWS' && linkType !== 'DOCUMENT'
      && linkType !== 'GAMESTOP' && linkType !== 'X-TWITTER') {
      return true;
    }
    return false;
  }

  public onClickLocalArticle(localArticle: string) {
    this._router.navigate([localArticle]);
  }

  public onClickClose() {
  }

  public onClickItem(item: TimelineEvent) {
  }

  public get ngStyle() {
    if (this.item.isSelected) {
      if (this.isMobile) {
        return { // if is selected and is mobile
          'background-color': TimelineEvent.getTypeColor(this.item.mainType, 0.9),
          'border-left': '3px solid ' + TimelineEvent.getTypeColor(this.item.mainType, 1),
          'border-right': '3px solid ' + TimelineEvent.getTypeColor(this.item.mainType, 1),
          'color': 'white',
          'padding-top': '15px',
          'padding-bottom': '15px',
        }
      } else {
        return { // if is selected and is not mobile
          'background-color': TimelineEvent.getTypeColor(this.item.mainType, 0.9),
          'border': '3px solid ' + TimelineEvent.getTypeColor(this.item.mainType, 1),
          'color': 'white',
        }
      }

    } else { // if not selected
      if (this.isMobile) { // if mobile and not selected
        if (this._sizeService.isDarkMode) {
          return {
            'background-color': 'rgba(0,0,0,0.9)',
            'color': 'white',
            // 'border-left': '1px solid ' + this._chartDataService.getTypeColor(this.item.mainType, 0.5),
            // 'border-right': '1px solid ' + this._chartDataService.getTypeColor(this.item.mainType, 0.5),
            'padding-top': '15px',
            'padding-bottom': '15px',
          }
        } else {
          return {
            'background-color': TimelineEvent.getTypeColor(this.item.mainType, 0.05),
            // 'border-left': '1px solid ' + this._chartDataService.getTypeColor(this.item.mainType, 0.5),
            // 'border-right': '1px solid ' + this._chartDataService.getTypeColor(this.item.mainType, 0.5),
            'padding-top': '15px',
            'padding-bottom': '15px',
          }
        }

      } else {
        return { // if not mobile and not selected
          'background-color': TimelineEvent.getTypeColor(this.item.mainType, 0.05),
          // 'border': '1px solid ' + this._chartDataService.getTypeColor(this.item.mainType, 0.5),
        }
      }

    }

  }
}
