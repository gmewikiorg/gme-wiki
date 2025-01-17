import { Component, OnInit } from '@angular/core';
import { TimelineControlsService } from '../timeline-controls/timeline-controls.service';
import { TimelineEvent } from '../timeline-items/timeline-item/timeline-event.class';
import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { RouterModule } from '@angular/router';
import { TimelineEventUrlType } from '../timeline-items/timeline-item/timeline-event-url.interface';

@Component({
  selector: 'app-timeline-annotation-box',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './timeline-annotation-box.component.html',
  styleUrl: './timeline-annotation-box.component.scss'
})
export class TimelineAnnotationBoxComponent implements OnInit {

  private _timelineEvent: TimelineEvent | null = null;
  private _eventNgStyle: any = {};
  public get isEvent(): boolean { return this._timelineEvent !== null; }
  public get event(): TimelineEvent | null { return this._timelineEvent; }
  public get eventStyle(): any { return this._eventNgStyle; }

  constructor(private _controlsService: TimelineControlsService, private _screenService: ScreenService) {

  }
  ngOnInit() {
    this._controlsService.timelineItemAnnotation$.subscribe((timelineEvent: TimelineEvent | null) => {
      this._timelineEvent = timelineEvent;
      this._eventNgStyle = {
        // backgroundColor: TimelineEvent.getTypeColor(this._timelineEvent?.mainType, 0.2),
        border: '2px solid ' + TimelineEvent.getTypeColor(this._timelineEvent?.mainType, 1),
      }
      if (this._controlsService.period === 'CURRENT' && !this.isMobile) {
        this._eventNgStyle = {
          border: '2px solid ' + TimelineEvent.getTypeColor(this._timelineEvent?.mainType, 1),
          alignSelf: 'flex-end',
          maxWidth: '800px',
        }
      }
    })
  }

  public get isMobile(): boolean { return this._screenService.isMobile; }

  public date(dateStringYYYYMMDD: string): string {
    return dayjs(dateStringYYYYMMDD).format('MMM DD, YYYY');
  }

  public linkTypeIsOther(linkType: TimelineEventUrlType) {
    if (linkType !== 'LEMMY' && linkType !== 'REDDIT' && linkType !== 'WIKIPEDIA'
      && linkType !== 'YOUTUBE' && linkType !== 'NEWS' && linkType !== 'DOCUMENT'
      && linkType !== 'GAMESTOP' && linkType !== 'X-TWITTER') {
      return true;
    }
    return false;
  }
}
