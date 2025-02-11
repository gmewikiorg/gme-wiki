import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HelpContributeComponent } from '../../shared/components/help-contribute/help-contribute.component';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from '../../layout/footer/footer.component';
import dayjs from 'dayjs';

@Component({
  selector: 'app-turnaround',
  standalone: true,
  imports: [HelpContributeComponent, RouterModule, FooterComponent],
  templateUrl: './turnaround.component.html',
  styleUrl: './turnaround.component.scss'
})
export class TurnaroundComponent implements OnInit {
  constructor(
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title) {

    this.titleService.setTitle('GameStop Turnaround');


    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: 'GameStop Turnaround' },
      { name: 'keywords', content: 'GameStop, GME, Turnaround, Ryan Cohen, Roaring Kitty, DeepFuckingValue, GameStop Turnaround, GameStop Turnaround 2021, GameStop Turnaround 2022, GameStop Turnaround 2023, GameStop Turnaround 2024' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: 'GameStop Turnaround' },
      { property: 'og:description', content: 'GameStop Turnaround' },
      { property: 'og:url', content: 'https://gmewiki.org/turnaround' },
      { property: 'og:type', content: 'website' },
    ]);
  }


  private _turnaroundDuration: string = '';
  public get turnaroundDuration(): string { return this._turnaroundDuration; }

  ngOnInit() {
    const start = dayjs('2021-06-09');
    const today = dayjs();
    const totalMonths = today.diff(start, 'months');
    const remainingMonths = totalMonths % 12;

    const monthString = remainingMonths === 1 ? '1 month' : remainingMonths + ' months';
    const totalYears = Math.floor(totalMonths / 12);
    let duratingString = ''
    if (remainingMonths < 3) {
      duratingString = totalYears + ' years';
    } else if (remainingMonths >= 3 && remainingMonths < 6) {
      duratingString = 'over ' + totalYears + ' years';
    } else if (remainingMonths >= 6 && remainingMonths < 9) {
      duratingString = totalYears + ' and a half years';
    } else if (remainingMonths >= 9) {
      duratingString = '' + (totalYears + 1) + ' years';
    }
    this._turnaroundDuration = duratingString;
  }

}
