import { Component, OnInit } from '@angular/core';
import { TimelineControlsService } from '../timeline-controls/timeline-controls.service';
import { TimelineEvent } from '../timeline-items/timeline-item/timeline-event.class';
import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { RouterModule } from '@angular/router';
import { TimelineEventUrlType } from '../timeline-items/timeline-item/timeline-event-url.interface';
import { TimelinePeriodType } from '../timeline-controls/timeline-period-type';

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
  private _isLeftSide: boolean = false;
  public get isEvent(): boolean { return this._timelineEvent !== null; }
  public get event(): TimelineEvent | null { return this._timelineEvent; }
  public get eventStyle(): any { return this._eventNgStyle; }
  public get isLeftSide(): boolean { return this._isLeftSide; }

  constructor(private _controlsService: TimelineControlsService, private _screenService: ScreenService) {

  }

  ngOnInit() {

    this._setPosition();

    this._controlsService.period$.subscribe((period)=>{
      this._setPosition();
    });

    this._controlsService.timelineItemAnnotation$.subscribe((timelineEvent: TimelineEvent | null) => {
      // const mainColor = TimelineEvent.getTypeColor(this._timelineEvent?.mainType, 0.01);
      const lightColor = TimelineEvent.getTypeColor(this._timelineEvent?.mainType, 0.1);
      const darkColor = TimelineEvent.getTypeColor(this._timelineEvent?.mainType, 0.2);
      // const gradient = 'radial-gradient(circle, ' + lightColor + ' 0%, ' + darkColor + ' 100%)';
      // const gradient = 'linear-gradient(to right, '+lightColor+' 50%, '+darkColor+' 100%)'
      const gradient = 'linear-gradient(80deg, rgba(255,255,255,0.0) 75%, '+lightColor+' 98%, '+darkColor+' 99%)';
      this._timelineEvent = timelineEvent;
      this._eventNgStyle = {
        border: '2px solid ' + TimelineEvent.getTypeColor(this._timelineEvent?.mainType, 1),
        background: gradient,
      }
      if (this._controlsService.period === 'CURRENT' && !this.isMobile) {
        this._eventNgStyle = {
          border: '2px solid ' + TimelineEvent.getTypeColor(this._timelineEvent?.mainType, 1),
          background: gradient,
          alignSelf: 'flex-end',
          maxWidth: '800px',
        }
      }
    })
  }

  private _setPosition(){
    const period = this._controlsService.period;
    if(period === 'HISTORIC' || period === 'SNEEZE'){
      this._isLeftSide = true;
    }else{
      this._isLeftSide = false;
    }
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
