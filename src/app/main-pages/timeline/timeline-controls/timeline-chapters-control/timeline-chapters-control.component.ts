import { Component } from '@angular/core';
import dayjs from 'dayjs';
import { SettingsService } from '../../../../shared/services/settings.service';
import { TimelineItemsService } from '../../timeline-items/timeline-items.service';
import { ChartDataManagerService } from '../../timeline-chart/timeline-chart-data-manager-service';
import { EventSearchService } from '../timeline-search-control/search/event-search.service';
import { TimelineChapter } from './timeline-chapter.class';
import { chapterConfigs } from './timeline-chapters';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timeline-chapters-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline-chapters-control.component.html',
  styleUrl: './timeline-chapters-control.component.scss'
})
export class TimelineChaptersControlComponent {
  private _chapters: TimelineChapter[] = [];
  public get chapters(): TimelineChapter[] { return this._chapters; }

  private _chaptersGroupedByYear: {year: string, chapters: TimelineChapter[]}[] = [];
  public get chaptersGroupedByYear(): {year: string, chapters: TimelineChapter[]}[] { return this._chaptersGroupedByYear; }

  public get showOverviewButton(): boolean { return this._searchService.showStoryOverviewButton; }

  constructor(private _searchService: EventSearchService,
    private _eventService: TimelineItemsService,
    private _chartService: ChartDataManagerService,
    private _settingsService: SettingsService,
    private _itemService: TimelineItemsService,
    private _dataManagerService: ChartDataManagerService) { }

  ngOnInit(): void {
    this._chapters = chapterConfigs.map(cc => new TimelineChapter(cc))
    // .sort((c1, c2)=>{
    //   if(c1.dateStartYYYYMMDD < c2.dateStartYYYYMMDD){
    //     return 1;
    //   }else if(c1.dateStartYYYYMMDD > c2.dateStartYYYYMMDD){
    //     return -1;
    //   }else{
    //     return 0;
    //   }
    // });

    const groupings = ['2020', '2021', '2022', '2023', '2024'].map(year => {
      return {year:year, chapters: new Array<TimelineChapter>}
    });

    this._chapters.forEach(chapter =>{
       groupings.forEach(year => {
        if(chapter.yearGroup === year.year){
          year.chapters.push(chapter)
        }
       })
    })
    this._chaptersGroupedByYear = groupings.sort((g1, g2)=>{
      if(g1.year < g2.year){
        return 1;
      }else if(g1.year > g2.year){
        return -1;
      }else{
        return 0;
      }
    });
  }

  public onClickChapter(chapter: TimelineChapter) {
    const today = dayjs().format('YYYY-MM-DD');
    let endDate = today;
    if(chapter.dateEndYYYYMMDD !== ''){
      endDate = chapter.dateEndYYYYMMDD
    }
    this._searchService.onClickChapter();
    const chapterEvents = this._searchService.getEventsByDates(chapter.dateStartYYYYMMDD, endDate);
    this._eventService.setDisplayedTimelineEvents(chapterEvents);
    this._chartService.updateDateRange(chapter.dateStartYYYYMMDD, chapter.dateEndYYYYMMDD);
    this._chartService.updateDisplayedEvents(chapterEvents);
  }

  public onClickOverview(){
    const startDateYYYYMMDD = '2020-07-01';
    const endDateDateYYYYMMDD = dayjs().format('YYYY-MM-DD');

    const significance = this._settingsService.significanceValue;
    this._settingsService.updateSignificanceValue(significance);
    this._dataManagerService.updateSignificanceValue(significance);
    this._itemService.updateSignificanceValue(significance);
    let overviewEvents = this._searchService.getEventsByDates(startDateYYYYMMDD, endDateDateYYYYMMDD)
    overviewEvents = overviewEvents.filter(item => item.significance >= significance);
    // const filteredEvents = overviewEvents.filter(event => event.significance >= significance);
    this._searchService.onClickStoryOverviewButton();
    this._eventService.setDisplayedTimelineEvents(overviewEvents);
    this._chartService.updateDateRange(startDateYYYYMMDD, endDateDateYYYYMMDD);
    this._chartService.updateDisplayedEvents(overviewEvents);

  }
}
