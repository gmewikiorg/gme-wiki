import { Component, HostListener, OnInit, } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';
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
  constructor(    private _screenService: ScreenService,  ) {

    const title = 'GME FAQ | gmewiki.org';
    const description = 'Information for common and generic questions pertaining to GME and GameStop';
    const url = 'https://gmewiki.org/faq';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);

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
  public get isDarkMode(): boolean { return this._screenService.isDarkMode; }

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
        if (foundItem.section === 'GENERAL' && sectionIndex === 0) {
          return true;
        } else if (foundItem.section === 'CORPORATE' && sectionIndex === 1) {
          return true;
        } else if (foundItem.section === 'STOCK' && sectionIndex === 2) {
          return true;
        } else if (foundItem.section === 'FINANCIAL' && sectionIndex === 3) {
          return true;
        } else if (foundItem.section === 'RETAIL' && sectionIndex === 4) {
          return true;
        } else if (foundItem.section === 'LEGAL' && sectionIndex === 5) {
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
        if (rect.bottom > 0 && rect.top < 30) {
          foundItemId = faq.id;
        }
      }
    });
    if (foundItemId === null) {
      if (this.currentItemId !== null) {
        foundItemId = this.currentItemId;
      }
    }
    this.currentItemId = foundItemId;
  }

  public scrollToSection(section: string) {
    const sectionFAQs = this.sectionFaqs(section);
    const scrollToElementId = 'faq-id-' + sectionFAQs[0].id;
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
