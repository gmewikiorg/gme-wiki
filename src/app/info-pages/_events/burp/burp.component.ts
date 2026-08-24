import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { CommonModule } from '@angular/common';
import { ImportGmeDataService } from '../../../shared/services/import-gme-data.service';
import { GmePriceEntrySimple } from '../../../shared/services/gme-price-entry.interface';
import { LoadingService } from '../../../shared/services/loading.service';
import dayjs from 'dayjs';
import { BurpChartComponent } from './burp-chart/burp-chart.component';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-burp',
  standalone: true,
  imports: [RouterModule, FooterComponent, CommonModule, BurpChartComponent],
  templateUrl: './burp.component.html',
  styleUrl: './burp.component.scss'
})
export class BurpComponent implements OnInit, InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'GME Burp of 2024 | gmewiki.org',
    description: 'In May and June of 2024, GME experienced some major turbulence.  Why?',
    url: 'https://gmewiki.org/burp',
    image: 'https://gmewiki.org/assets/info-pages/burp.png',
    githubPageUrl: 'info-pages/_events/burp/burp.component.html',
  }

  constructor(private _screenService: ScreenService, private _gmeDataService: ImportGmeDataService, private _loadingService: LoadingService) {
    this._screenService.setPageInfo(this.infoPageProperties);
    this._isBrowser = this._screenService.isBrowser;
  }


  private _isBrowser: boolean;
  private _chartIsLoaded: boolean = false;
  public get chartIsLoaded(): boolean { return this._chartIsLoaded; }
  private _burpPriceEntries: GmePriceEntrySimple[] = [];
  private _gmePriceEntries: GmePriceEntrySimple[] = [];
  public get burpPriceEntries(): GmePriceEntrySimple[] { return this._burpPriceEntries; }
  public get gmePriceEntries(): GmePriceEntrySimple[] { return this._gmePriceEntries; }

  async ngOnInit() {
    await this._loadingService.loadData$();
    this._gmePriceEntries = this._gmeDataService.tradingDayPriceEntries;
    this._burpPriceEntries = this._gmePriceEntries
      .filter(item => item.dateYYYYMMDD >= '2024-03-25' && item.dateYYYYMMDD <= '2024-06-19')
      .filter(item => {
        if (item.dateYYYYMMDD >= '2024-03-28' && item.dateYYYYMMDD < '2024-04-30') {
          return false;
        } else {
          return true;
        }
      });

    this._loadingService.loadingMessage = "Building chart...";
    if (this._isBrowser) {
      await this._loadingService.loadData$();
      this._chartIsLoaded = true;
    } else {
      // console.log("Not browser")
    }
  }




  public formatDate(inputDateYYYYMMDD: string) {
    return dayjs(inputDateYYYYMMDD).format('MMMM DD');
  }
  public formatPrice(gmePrice: number) {
    return "$" + (gmePrice.toFixed(0));
  }
  public formatVolume(volume: number) {
    if (volume === 0) {
      return '';
    }
    return (volume / 1000000).toFixed(0) + "M";
    return volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  public volumeNgClass(volume: number) {
    const maxValue = Math.max(...(this.burpPriceEntries.map(e => e.volume)));


    if (volume < 20000000) {
      return 'blue-0';
    } else if (volume >= 2000000 && volume < 100000000) {
      return 'blue-1';
    } else if (volume >= 100000000) {
      return 'blue-2';
    }


    return '';
  }

  private _showHideRows: string = 'Show More Rows';
  public get showHideRows(): string { return this._showHideRows; }

  public onClickShowMoreRows() {

    if (this._showHideRows === 'Show More Rows') {
      this._showHideRows = 'Hide Extra Rows';
    } else {
      this._showHideRows = 'Show More Rows';
    }
  }



  private _articles: {
    title: string;
    url: string;
    date: string;
  }[] = [
      {
        title: 'GameStop stock soars after ‘Roaring Kitty’ who drove meme frenzy resurfaces',
        url: 'https://globalnews.ca/news/10491975/gamestop-stock-roaring-kitty-keith-gill-return/',
        date: 'May 13, 2024',
      },
      {
        title: 'The Risk Of Losing Big On GameStop And Other Meme Stocks',
        url: 'https://www.forbes.com/sites/jimosman/2024/05/13/the-risk-of-losing-big-on-gamestop-and-other-meme-stocks/',
        date: 'May 13, 2024',
      },
      {
        title: 'Meme stocks like GameStop are soaring like it’s 2021',
        url: 'https://www.vox.com/business-and-finance/2024/5/14/24156725/meme-stocks-gamestop-reddit-amc-blackberry-wallstreetbets',
        date: 'May 14, 2024',
      },
      {
        title: 'Why are meme stocks rallying again? GameStop, AMC shares surge upon ‘Roaring Kitty’ return',
        url: 'https://web.archive.org/web/20240514183835/https://www.theglobeandmail.com/investing/article-why-are-meme-stocks-rallying-again/',
        date: 'May 14, 2024',
      },
      {
        title: 'GameStop jumps for a second day, but ends session well off highs as meme enthusiasm starts to fade',
        url: 'https://www.cnbc.com/2024/05/14/gamestop-amc-shares-jump-another-40percent-in-premarket-trading-as-meme-stock-craze-returns.html',
        date: 'May 14, 2024',
      },
      {
        title: 'GameStop shares rise 21% — close well off highs — as ‘Roaring Kitty’ posts account with $116 million',
        url: 'https://www.cnbc.com/2024/06/02/gamestop-jumps-as-roaring-kitty-trader-posts-giant-116-million-stock-position.html',
        date: 'June 2, 2024',
      },
      {
        title: 'GameStop shares gain after meme stock influencer reveals $116 million bet',
        url: 'https://www.cnn.com/2024/06/03/investing/gamestop-stock-soars-meme-stock-roaring-kitty',
        date: 'June 3, 2024',
      },

      {
        title: 'GameStop shares soar as ‘Roaring Kitty’ reveals $116m bet in Reddit post',
        url: 'https://www.theguardian.com/business/article/2024/jun/03/gamestop-shares-soar-as-roaring-kitty-reveals-116m-bet-in-reddit-post',
        date: 'June 3, 2024',
      },
      {
        url: 'https://www.theglobeandmail.com/investing/article-gamestop-soars-90-after-super-bull-roaring-kittys-reddit-post-shows/',
        title: 'GameStop soars as ‘Roaring Kitty’ reveals US$116-milllion bet in Reddit post',
        date: 'June 3, 2024',
      },
      {
        title: 'GameStop shares jump after investor claims stake',
        url: 'https://www.bbc.com/news/articles/c6ppww72243o',
        date: 'June 3, 2024',
      },
      {
        title: 'How Roaring Kitty’s wealth went from $53,000 to nearly $300 million — and could one day top $1 billion',
        url: 'https://www.cnbc.com/2024/06/04/how-roaring-kittys-wealth-went-from-53000-to-nearly-300-million-and-could-one-day-top-1-billion.html',
        date: 'June 4, 2024',
      },
      {
        title: 'GameStop and 3 More Sell-Rated Stocks to Avoid, According to Analysts',
        url: 'https://www.theglobeandmail.com/investing/markets/stocks/SAVE/pressreleases/26666970/gamestop-and-3-more-sell-rated-stocks-to-avoid-according-to-analysts/',
        date: 'June 6, 2024',
      },
      {
        title: "He's ba-a-ack! Keith Gill’s YouTube return today puts billions on the line for GameStop",
        url: 'https://financialpost.com/investing/gamestop-shares-soar-keith-gill-returns-to-youtube',
        date: 'June 7, 2024',
      },
      {
        title: 'Who is Keith Gill, the online influencer sending GameStop shares soaring again?',
        url: 'https://www.reuters.com/business/finance/who-is-keith-gill-online-influencer-sending-gamestop-shares-soaring-again-2024-06-07/',
        date: 'June 7, 2024',
      },
      {
        url: 'https://www.bbc.com/news/articles/cl442gzlmego',
        title: 'GameStop raises over $2bn after Roaring Kitty rally',
        date: 'June 11, 2024',
      },
      {
        title: 'WallStreetBets, GameStop, and the “Swirl of Distrust” That’s Electrifying the Stock Market',
        url: 'https://www.vanityfair.com/news/story/wallstreetbets-gamestop-and-the-swirl-of-distrust-thats-electrifying-the-stock-market',
        date: 'June 11, 2024',
      },
      {
        title: "A Realistic Look At GameStop's Value",
        url: 'https://www.forbes.com/sites/gurufocus/2024/06/14/a-realistic-look-at-gamestops-value/',
        date: 'June 14, 2024',
      },
    ];

  public get articles(): {
    title: string;
    url: string;
    date: string;
  }[] { return this._articles; }
}
