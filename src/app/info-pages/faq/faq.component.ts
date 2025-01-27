import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';
import { Meta, Title } from '@angular/platform-browser';
import { fromEvent, Subscription } from 'rxjs';
import { ScreenService } from '../../shared/services/screen-size.service';
import { CommonModule } from '@angular/common';
import { FAQ } from './faq.interface';
import { faqs } from './faqs';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [FooterComponent, CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent implements OnInit {
  constructor(
    // private _loadingService: LoadingService, 
    private _screenService: ScreenService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta,
    private titleService: Title,
  ) {
    this.titleService.setTitle('gmewiki.org - GME FAQ')
    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: 'Explore our comprehensive FAQ page about GameStop (GME) to find answers to your most pressing questions. From stock performance and corporate history to key figures like Ryan Cohen and Keith Gill, we cover everything you need to know. Dive into topics such as revenue, financials, DRS, and the pivotal events that shaped GME’s story.' },
      {
        name: 'keywords',
        content: 'GME, GameStop, GameStop stock, GME stock, buy GME, invest in GME, GameStop FAQ, GME FAQ, GameStop stock price, GME stock price, GameStop history, GME short squeeze, GME Reddit, GME investment, GameStop company info, GameStop revenue, GME stock analysis, GameStop leadership, GME dividend, GME stock split, GME market cap, GameStop competitors, GameStop e-commerce, GME short interest, GameStop trading volume, GME stock performance, GameStop CEO, GameStop major shareholders, GameStop quarterly earnings, GME stock risks, GameStop retail stores, GameStop trade-in program, GameStop pre-orders, GameStop loyalty program, GameStop legal issues, GME SEC response, GameStop stock controversy, DRS, Ryan Cohen, Keith Gill, Roaring Kitty, Larry Cheng, GameStop DRS, GME DRS, GameStop Ryan Cohen, GME Ryan Cohen, GameStop Keith Gill, GME Keith Gill, GameStop Roaring Kitty, GME Roaring Kitty, GameStop Larry Cheng, GME Larry Cheng, GameStop revenue, GME revenue, GameStop earnings, GME earnings, GameStop financials, GME financials, GameStop history, GME history, GameStop equity, GME equity, GameStop debt, GME debt, GameStop assets, GME assets, GME stockholders, GameStop shareholder equity, GameStop quarterly earnings, GME balance sheet, GameStop financial reports, GME stock analysis, GME investment, GameStop cash flow, GME debt analysis, GameStop financial health, GameStop revenue growth, GME financial performance, Ryan Cohen leadership, GameStop board members, GameStop strategy, GME direct registration, GameStop short interest, GameStop investor relations, GME earnings report'
      },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: 'gmewiki.org - GME FAQ' },
      { property: 'og:description', content: 'Explore our comprehensive FAQ page about GameStop (GME) to find answers to your most pressing questions. From stock performance and corporate history to key figures like Ryan Cohen and Keith Gill, we cover everything you need to know. Dive into topics such as revenue, financials, DRS, and the pivotal events that shaped GME’s story.' },
      { property: 'og:url', content: 'https://gmewiki.org/faq' },
      { property: 'og:type', content: 'website' },
    ]);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    // this.currentScrollY = window.scrollY;
    // this.applyStylesBasedOnScroll(this.currentScrollY);
  }


  private scrollSubscription!: Subscription;

  currentPosition: string = '';
  private _isBrowser: boolean = false;
  public get isBrowser(): boolean { return this._isBrowser; }

  private _width: number = 800;
  public get width(): number { return this._width; }
  public get minSidebarWidth(): number { return 700; }

  ngOnInit() {
    this._isBrowser = this._screenService.isBrowser;
    if (this.isBrowser) {
      this.scrollSubscription = fromEvent(window, 'scroll').subscribe(() => {
        // this.updateRelativePosition();
        this.updateCurrentItem();
      });
    }
    this._screenService.screenDimensions$.subscribe(() => {
      this._width = this._screenService.screenWidth;
    })
  }

  public get faqSections(): string[] {
    return [
      'General questions about GameStop',
      'Corporate Information',
      'Stock Performance and Investment',
      'Financial and Operational Details',
      'Retail Presence',
      'Legal and Controversy',
    ];
  }
  public showSectionFAQs(section: string): boolean {
    const sectionIndex = this.faqSections.indexOf(section);
    if (this.currentItemId !== null) {
      const foundItem = faqs.find(item => item.id === this.currentItemId);
      if (foundItem) {
        if(foundItem.section === 'GENERAL' && sectionIndex === 0){
          return true;
        }else if(foundItem.section === 'CORPORATE' && sectionIndex === 1){
          return true;
        }else if(foundItem.section === 'STOCK' && sectionIndex === 2){
          return true;
        }else if(foundItem.section === 'FINANCIAL' && sectionIndex === 3){
          return true;
        }else if(foundItem.section === 'RETAIL' && sectionIndex === 4){
          return true;
        }else if(foundItem.section === 'LEGAL' && sectionIndex === 5){
          return true;
        }
      }
    }
    return false;
  }
  public sectionFaqs(section: string): FAQ[] {
    let sectionLabel = 'GENERAL';
    const sectionIndex = this.faqSections.indexOf(section);
    if (sectionIndex === 0) {
      sectionLabel = 'GENERAL';
    } else if (sectionIndex === 1) {
      sectionLabel = 'CORPORATE';
    } else if (sectionIndex === 2) {
      sectionLabel = 'STOCK';
    } else if (sectionIndex === 3) {
      sectionLabel = 'FINANCIAL';
    } else if (sectionIndex === 4) {
      sectionLabel = 'RETAIL';
    } else if (sectionIndex === 5) {
      sectionLabel = 'LEGAL';
    }
    const sectionFaqs = faqs.filter(faq => faq.section === sectionLabel);
    return sectionFaqs;
  }
  currentItemId: number | null = 0;
  updateCurrentItem() {
    let foundItemId: number | null = null;

    faqs.forEach((faq) => {
      const htmlElement = document.getElementById(`faq-id-${faq.id}`);
      if (htmlElement) {
        const rect = htmlElement.getBoundingClientRect();
        // Check if the item is visible in the viewport
        // console.log("rect.top, rec.bot, window.innerheight, ", rect.top.toFixed(0), rect.bottom.toFixed(0), window.innerHeight)
        // if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        if(rect.bottom > 0 && rect.top < 30){
          foundItemId = faq.id;
        }
      }
    });
    if(foundItemId === null){
      if(this.currentItemId !== null){
        foundItemId = this.currentItemId;
      }
    }
    this.currentItemId = foundItemId;
  }

  public scrollToSection(section: string){
    const sectionFAQs = this.sectionFaqs(section);
    const scrollToElementId = 'faq-id-'+sectionFAQs[0].id;
    this.scrollToElement(scrollToElementId);
  }
  scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


  ngOnDestroy() {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }
}
