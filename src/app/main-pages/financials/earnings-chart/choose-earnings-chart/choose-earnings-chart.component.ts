import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartSimple, faX } from '@fortawesome/free-solid-svg-icons';
import { FinancialChartService } from './earnings-chart.service';
import { EarningsChartSelection } from './earnings-chart-selection.enum';
import { Subscription, timer } from 'rxjs';
import { EarningsChartComponent } from '../earnings-chart.component';
import { CustomDropdownMenu } from '../../../../shared/components/custom-dropdown-menu/custom-dropdown-menu.class';
import { CustomDropdownMenuComponent } from '../../../../shared/components/custom-dropdown-menu/custom-dropdown-menu.component';
import { ScreenService } from '../../../../shared/services/screen-size.service';


@Component({
  selector: 'app-choose-earnings-chart',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, EarningsChartComponent, CustomDropdownMenuComponent],
  templateUrl: './choose-earnings-chart.component.html',
  styleUrl: './choose-earnings-chart.component.scss'
})
export class ChooseEarningsChartComponent implements OnInit, OnDestroy {
  public earningsChartSelection = EarningsChartSelection;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, 
    private _financialsService: FinancialChartService,
    private _screenService: ScreenService) {
    this._isBrowser = isPlatformBrowser(this.platformId);
  }
  public get faChartSimple() { return faChartSimple; }
  public get faX() { return faX; }

  public get isMobile(): boolean { return this._screenService.isMobile; }

  private _chartMenu: CustomDropdownMenu = new CustomDropdownMenu([
    'Revenue and Net Income',
    'Net Profit Margin',
    'Revenue vs Cost of Sales',
    'Revenue vs Store Count',
    'Revenue per Store',
    'Revenue by Category',
    'Revenue by Category as Percent of Total',
    'Revenue vs Gross Profit',
    'Operating Income',
    'Operating Income vs SG&A Expense',
    'Gross Profit vs SG&A Expense',
    'Interest Income',
    "Stockholders' Equity"
  ]);
  private _periodMenu: CustomDropdownMenu = new CustomDropdownMenu(['Fiscal Year', 'Fiscal Quarter']);

  public get chartMenu(): CustomDropdownMenu { return this._chartMenu; }
  public get periodMenu(): CustomDropdownMenu { return this._periodMenu; }

  private _showMoreChartOptions: boolean = false;
  public get showMoreChartOptions(): boolean { return this._showMoreChartOptions; }
  private _isBrowser: boolean = false;
  private _isLoading: boolean = false;
  public get isBrowser(): boolean { return this._isBrowser; }

  private _chartTitle: string = 'Revenue and Net Income by fiscal year';
  public get chartTitle(): string { return this._chartTitle; }
  public get isLoading(): boolean { return this._isLoading; }

  private _subscription: Subscription | null = null;

  ngOnInit() {
    this._chartTitle = this._financialsService.chartTitle;
    timer(0).subscribe(() => {
      this._isLoading = false;
      this._subscription = this._financialsService.chartTitle$.subscribe((title) => {
        this._chartTitle = title;
      })
    })
  }

  ngOnDestroy() {
    this._subscription?.unsubscribe();
  }

  onClickMoreCharts() {
    this._showMoreChartOptions = !this._showMoreChartOptions;
  }

  public get menuIsHidden(): boolean { return this.hideShowMenus === 'Show';}

  public onClickHideChartMenus(){
    if(this.hideShowMenus === 'Hide'){
      this.hideShowMenus = 'Show';
    }else if(this.hideShowMenus === 'Show'){
      this.hideShowMenus = 'Hide';
    }
  }
  public hideShowMenus: 'Hide' | 'Show' = 'Show';
  public onSelectPeriod(period: string){
    if(period === 'Fiscal Year'){
      this._financialsService.setChartPeriod('ANNUAL');
    }else if(period === 'Fiscal Quarter'){
      this._financialsService.setChartPeriod('QUARTER');
    }
  }
  public onSelectChartMenuItem(item: string){
    if(item === 'Revenue and Net Income'){
      this._financialsService.setChartOption(EarningsChartSelection.REVENUE_VS_NET_INCOME);
    }else if(item === 'Net Profit Margin'){
      this._financialsService.setChartOption(EarningsChartSelection.NET_PROFIT_MARGIN);
    }else if(item === 'Revenue vs Cost of Sales'){
      this._financialsService.setChartOption(EarningsChartSelection.REVENUE_VS_COST);
    }else if(item === 'Revenue vs Store Count'){
      this._financialsService.setChartOption(EarningsChartSelection.REVENUE_VS_STORES);
    }else if(item === 'Revenue per Store'){
      this._financialsService.setChartOption(EarningsChartSelection.REVENUE_PER_STORES);
    }else if(item === 'Revenue by Category'){
      this._financialsService.setChartOption(EarningsChartSelection.REVENUE_TYPE);
    }else if(item === 'Revenue by Category as Percent of Total'){
      this._financialsService.setChartOption(EarningsChartSelection.REVENUE_TYPE_PERCENTAGE);
    }else if(item === 'Revenue vs Gross Profit'){
      this._financialsService.setChartOption(EarningsChartSelection.REVENUE_VS_GROSS_PROFIT);
    }else if(item === 'Operating Income'){
      this._financialsService.setChartOption(EarningsChartSelection.OPERATING_INCOME);
    }else if(item === 'Operating Income vs SG&A Expense'){
      this._financialsService.setChartOption(EarningsChartSelection.OPERATIONS_VS_SGA);
    }else if(item === 'Gross Profit vs SG&A Expense'){
      this._financialsService.setChartOption(EarningsChartSelection.GROSS_PROFIT_VS_SGA);
    }else if(item === 'Interest Income'){
      this._financialsService.setChartOption(EarningsChartSelection.INTEREST_INCOME);
    }else if(item === "Stockholders' Equity"){
      this._financialsService.setChartOption(EarningsChartSelection.STOCKHOLDERS_EQUITY);
    }
  }

}
