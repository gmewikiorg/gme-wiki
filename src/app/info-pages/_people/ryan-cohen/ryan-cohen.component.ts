import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ImageCarouselComponent } from '../../../shared/components/image-carousel/image-carousel.component';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { ImageCarouselItem } from '../../../shared/components/image-carousel/image-carousel-item.interface';
import { ImageCarousel } from '../../../shared/components/image-carousel/image-carousel.class';
import { EbayInterviewsComponent } from '../../_corporate/mergers-acquisitions/ebay/ebay-interviews/ebay-interviews.component';
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-ryan-cohen',
  standalone: true,
  imports: [FooterComponent, CommonModule, ImageCarouselComponent, RouterModule, EbayInterviewsComponent],
  templateUrl: './ryan-cohen.component.html',
  styleUrl: './ryan-cohen.component.scss'
})
export class RyanCohenComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'Ryan Cohen: GameStop CEO and Chairman | gmewiki.org',
    description: 'Ryan Cohen: GameStop CEO and Chairman, largest individual GME shareholder | gmewiki.org',
    url: 'https://gmewiki.org/ryan-cohen',
    image: '',
    githubPageUrl: 'info-pages/_people/ryan-cohen/ryan-cohen.component.html',
  }

  constructor(private _screenService: ScreenService, private meta: Meta,
    private titleService: Title,) {
    this._rcCarousel = new ImageCarousel(this.carouselItems);
    this._isBrowser = _screenService.isBrowser;
    this._screenService.setPageInfo(this.infoPageProperties);
  }

  carouselItems: ImageCarouselItem[] = [
    {
      description: 'Ryan Cohen',
      imagePath: 'assets/ryan-cohen/rc_wikipedia.jpg',
      imageUrl: '',
    },
    {
      description: 'Ryan Cohen',
      imagePath: 'assets/ryan-cohen/rc_chess.jpg',
      imageUrl: '',
    },
    {
      description: 'Ryan Cohen',
      imagePath: 'assets/ryan-cohen/rc_dark.avif',
      imageUrl: '',
    },
    {
      description: 'Ryan Cohen - "Florida", October 2021',
      imagePath: 'assets/ryan-cohen/rc_gamestop.jpg',
      imageUrl: 'https://x.com/ryancohen/status/1447407898905268225',
    },
    {
      description: 'Ryan Cohen - "Lurking…", May 2022',
      imagePath: 'assets/ryan-cohen/rc_gamestop_2.jpg',
      imageUrl: 'https://x.com/ryancohen/status/1530266772317917185',
    },
    {
      description: 'Ryan Cohen',
      imagePath: 'assets/ryan-cohen/rc_laptop.webp',
      imageUrl: '',
    },
    {
      description: 'Ryan Cohen and Larry Cheng',
      imagePath: 'assets/ryan-cohen/rc_lc.jpg',
      imageUrl: '',
    },
    {
      description: 'Ryan Cohen and Carl Icahn, October 2022',
      imagePath: 'assets/ryan-cohen/rc_icahn.jpg',
      imageUrl: 'https://x.com/ryancohen/status/1582212373985005569',
    },
    {
      description: 'Ryan Cohen and Javier Milei, April 2024',
      imagePath: 'assets/ryan-cohen/rc_milei.jpeg',
      imageUrl: 'https://x.com/ryancohen/status/1778239568824705428',
    },
    {
      description: 'Ryan Cohen and Michael Saylor, February 2025',
      imagePath: 'assets/ryan-cohen/rc_saylor.jpg',
      imageUrl: 'https://x.com/ryancohen/status/1888098643732811864',
    },
    {
      description: 'Ryan Cohen with Donald Trump and Bill Pulte, November 2024',
      imagePath: 'assets/ryan-cohen/rc_trump_pulte.jpg',
      imageUrl: '',
    },
    {
      description: 'Ryan Cohen and Tylee',
      imagePath: 'assets/ryan-cohen/rc_tylee.webp',
      imageUrl: '',
    },
    {
      description: 'Ryan Cohen in 2026',
      imagePath: 'assets/ryan-cohen/rc_2026.jpg',
      imageUrl: '',
    },
  ].sort(() => Math.random() - 0.5);





  private _isBrowser: boolean = false;
  public get isBrowser(): boolean { return this._isBrowser; }
  private _rcCarousel: ImageCarousel;
  public get rcCarousel(): ImageCarousel { return this._rcCarousel; }

  public get isMobile(): boolean { return this._screenService.isMobile; }
  public get screenWidth(): number { return this._screenService.screenWidth; }
}
