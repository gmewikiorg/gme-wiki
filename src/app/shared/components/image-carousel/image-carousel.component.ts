import { Component, Input, OnInit } from '@angular/core';
import { ImageCarousel } from './image-carousel.class';
import { CommonModule } from '@angular/common';
import { ImageCarouselItem } from './image-carousel-item.interface';
import { ScreenService } from '../../services/screen-size.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.scss'
})
export class ImageCarouselComponent implements OnInit {

  constructor(private _screenService: ScreenService) { }

  private _isBrowser = false;
  public get isBrowser(): boolean { return this._isBrowser; }
  public get faChevronLeft() { return faChevronLeft; }
  public get faChevronRight() { return faChevronRight; }

  ngOnInit(): void {

    if (this._screenService.isBrowser) {
      if (this.carousel) {
        if (this.carousel.items.length > 0) {
          this._currentIndex = Math.floor(Math.random() * this.carousel.items.length);
          this._currentItem = this.carousel.items[this._currentIndex];
          this._isBrowser = true;
        }
      }
    }
    // this._isMobile = ;

  }


  // private _isMobile: boolean = false;
  private _currentIndex: number = -1;
  private _currentItem: ImageCarouselItem | null = null;
  private _maxWidth: number = 400;
  private _maxHeight: number = 400;

  private _carousel: ImageCarousel | undefined;
  public get carousel(): ImageCarousel | undefined { return this._carousel; }
  public get currentIndex(): number { return this._currentIndex; }
  public get currentItem(): ImageCarouselItem | null { return this._currentItem; }
  public get maxWidth(): number { return this._maxWidth; }
  public get maxHeight(): number { return this._maxHeight; }
  public get maxWidthPx(): string { return this._maxWidth + 'px';}
  public get maxHeightPx(): string { return this._maxHeight + 'px';}
  public get isMobile(): boolean { return this._screenService.isMobile; }

  @Input() public set carousel(carousel: ImageCarousel) { this._carousel = carousel; }
  @Input() public set maxWidth(width: number) { this._maxWidth = width; }
  @Input() public set maxHeight(height: number) { this._maxHeight = height; }

  public get items(): ImageCarouselItem[] {
    if (this.carousel) {
      return this.carousel.items;
    }
    return [];
  }





  public onClickImageIndex(index: number) {
    if (index > this.items.length - 1) {
      index = 0;
    }
    this._currentIndex = index;
    this._currentItem = this.items[this._currentIndex];
  }
}
