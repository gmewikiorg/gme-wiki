
import { TimelineEventType } from "../../../timeline-items/timeline-item/timeline-event-type.enum";
import { CategoryButton } from "./category-button.interface";
import { BehaviorSubject, Observable } from 'rxjs';

export class CategoryButtons {
  constructor() {
    this._buildCategoryButtons([
      TimelineEventType.CORP, TimelineEventType.SOCIAL_MEDIA, TimelineEventType.DRS, TimelineEventType.MEDIA, TimelineEventType.OTHER, TimelineEventType.RC
    ]);
    const selectedCategories: TimelineEventType[] = [];
    this._categoryButtons.forEach(item => {
      if (item.category !== 'ALL') {
        selectedCategories.push(item.category)
      }
    });
    this._selectedCategories$ = new BehaviorSubject<TimelineEventType[]>(selectedCategories);
  }

  private _categoryButtons: CategoryButton[] = [];
  private _selectedCategories$: BehaviorSubject<TimelineEventType[]>;
  public get categoryButtons(): CategoryButton[] { return this._categoryButtons; }
  public get selectedCategories$(): Observable<TimelineEventType[]> { return this._selectedCategories$.asObservable(); }
  public get selectedCategories(): TimelineEventType[] { return this._selectedCategories$.getValue(); }

  public setCategories(categories: TimelineEventType[] ){ 
    this._buildCategoryButtons(categories);
  }

  public onClickButtonCategory(button: CategoryButton) {
    if (button.category === 'ALL') {
      this._categoryButtons.forEach(categoryButton => {
        categoryButton.hideActivated = false;
        categoryButton.showActivated = true;
      });
    } else {
      this._categoryButtons.forEach(categoryButton => {
        categoryButton.hideActivated = true;
        categoryButton.showActivated = false;
      });
      button.showActivated = true;
      button.hideActivated = false;
      this._allButton.showActivated = false;
      this._allButton.hideActivated = false;
    }
    this._updateSelectedCategories();
  }
  public onClickShow(button: CategoryButton) {
    if (button.category === 'ALL') {
      this._categoryButtons.forEach(categoryButton => {
        categoryButton.hideActivated = false;
        categoryButton.showActivated = true;
      });
    } else {
      button.showActivated = true;
      button.hideActivated = false;
      if(this._allButton.hideActivated === true){
        this._allButton.hideActivated = false;
        this._allButton.showActivated = false;
      }
      let allShown: boolean = true;
      this._categoryButtons.forEach(item => {
        if(item.category !== 'ALL'){
          if(item.hideActivated === true){
            allShown = false;
          }
        }
      });
      if(allShown){
        this._allButton.showActivated = true;
      }
    }
    this._updateSelectedCategories();
  }
  public onClickHide(button: CategoryButton) {
    if (button.category === 'ALL') {
      this._categoryButtons.forEach(categoryButton => {
        categoryButton.hideActivated = true;
        categoryButton.showActivated = false;
      });
    } else {
      button.showActivated = false;
      button.hideActivated = true;
      if(this._allButton.showActivated === true){
        this._allButton.hideActivated = false;
        this._allButton.showActivated = false;
      }
      let allHidden: boolean = true;
      this._categoryButtons.forEach(item => {
        if(item.category !== 'ALL'){
          if(item.showActivated === true){
            allHidden = false;
          }
        }
      });
      if(allHidden){
        this._allButton.hideActivated = true;
      }
    }
    this._updateSelectedCategories();
  }

  private _updateSelectedCategories() {
    const selectedCategories: TimelineEventType[] = [];
    this._categoryButtons.forEach(item => {
      if (item.category !== 'ALL') {
        if(item.showActivated === true){
          selectedCategories.push(item.category)
        }
      }
    });
    this._selectedCategories$.next(selectedCategories);
  }


  private _allButton: CategoryButton = {
    category: 'ALL',
    showActivated: true,
    hideActivated: false,
  }

  
  private _buildCategoryButtons(categories: TimelineEventType[]) {
    const allCategories: TimelineEventType[] = [
      TimelineEventType.CORP, TimelineEventType.SOCIAL_MEDIA, TimelineEventType.DRS, TimelineEventType.MEDIA, TimelineEventType.OTHER, TimelineEventType.RC
    ];
    if(categories.length === allCategories.length){
      this._allButton.showActivated = true;
      this._allButton.hideActivated = false;
    }else{
      this._allButton.showActivated = false;
      this._allButton.hideActivated = false;
    }
    if(categories.length === 0){
      this._allButton.hideActivated = true;
    }


    this._categoryButtons = [
      this._allButton,
      {
        category: TimelineEventType.DRS,
        showActivated: categories.indexOf(TimelineEventType.DRS) > -1,
        hideActivated: !(categories.indexOf(TimelineEventType.DRS) > -1),
      },
      {
        category: TimelineEventType.CORP,
        showActivated: categories.indexOf(TimelineEventType.CORP) > -1,
        hideActivated: !(categories.indexOf(TimelineEventType.CORP) > -1),
      },
      {
        category: TimelineEventType.RC,
        showActivated: categories.indexOf(TimelineEventType.RC) > -1,
        hideActivated: !(categories.indexOf(TimelineEventType.RC) > -1),
      },
      {
        category: TimelineEventType.SOCIAL_MEDIA,
        showActivated: categories.indexOf(TimelineEventType.SOCIAL_MEDIA) > -1,
        hideActivated: !(categories.indexOf(TimelineEventType.SOCIAL_MEDIA) > -1),
      },
      {
        category: TimelineEventType.MEDIA,
        showActivated: categories.indexOf(TimelineEventType.MEDIA) > -1,
        hideActivated: !(categories.indexOf(TimelineEventType.MEDIA) > -1),
      },
      {
        category: TimelineEventType.OTHER,
        showActivated: categories.indexOf(TimelineEventType.OTHER) > -1,
        hideActivated: !(categories.indexOf(TimelineEventType.OTHER) > -1),
      },
    ];
  }
}