import { Component, OnInit } from '@angular/core';
import { EarningsResult } from '../earnings-results/earnings-result.class';
import { Import10KDataService } from '../earnings-results/import-10k-data.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';
import { CustomDropdownMenuComponent } from '../../../shared/components/custom-dropdown-menu/custom-dropdown-menu.component';
import { CustomDropdownMenu } from '../../../shared/components/custom-dropdown-menu/custom-dropdown-menu.class';
import { QuarterlyEarningsSummaryRow } from './quarterly-earnings-summary-row.class';
import { MetricFormatter, quarterlyResultsProperties, QuarterlyEarningsMetricResult } from './quarterly-earnings-metric-result';
import { QuarterlyEarningsSummaryCell } from './quarterly-earnings-summary-cell.class';
import { aggregateEarningsResult } from './aggregate-earnings-result';

@Component({
  selector: 'app-quarterly-earnings-data-table',
  standalone: true,
  imports: [CommonModule, CustomDropdownMenuComponent],
  templateUrl: './quarterly-earnings-data-table.component.html',
  styleUrl: './quarterly-earnings-data-table.component.scss'
})
export class QuarterlyEarningsDataTableComponent implements OnInit {
  constructor(
    private _importFinancialsService: Import10KDataService,
    private _loadingService: LoadingService,
    private _screenService: ScreenService) {
  }

  private _showAggregateMessage: boolean = false;
  private _mouseIsIn: boolean = false;

  public get mouseIsIn(): boolean { return this._mouseIsIn; }
  public onMouseEnter() { this._mouseIsIn = true; }
  public onMouseLeave() { this._mouseIsIn = false; }

  public get showAggregateMessage(): boolean { return this._showAggregateMessage; }

  private _quarterlyResults: EarningsResult[] = []
  // private _annualResults: EarningsResult[] = [];
  private _tableRows: QuarterlyEarningsSummaryRow[] = [];

  public get tableRows(): QuarterlyEarningsSummaryRow[] { return this._tableRows; }
  private get startYear(): number { return 2018; }
  public get isMobile(): boolean { return this._screenService.isMobile; }

  public onMenuItemSelected(menuItem: string) {
    this._buildTableRows();
  }

  private _dropdownMenuItems: string[] = [
    'Net Income',
    'Revenue',
    'Net Profit Margin',
    'Gross Profit',
    'Gross Margin',
    'Operating Income',
    'SG&A Expenses',
    'Interest Income',
    "Stockholders' Equity",
    'Earnings per Share',
    'Book Value per Share',
    'Hardware Sales',
    'Hardware Sales as Percent of Total',
    'Software Sales',
    'Software Sales as Percent of Total',
    'Collectibles Sales',
    'Collectibles Sales as Percent of Total',
  ];

  private _dropdownMenu: CustomDropdownMenu = new CustomDropdownMenu(this._dropdownMenuItems);
  public get dropdownMenu(): CustomDropdownMenu { return this._dropdownMenu; }
  public get currentMenuItem(): string { return this.dropdownMenu.currentMenuItem; }
  public get currentMetricResults(): MetricFormatter { return quarterlyResultsProperties[this.currentMenuItem]; }

  async ngOnInit(): Promise<void> {
    await this._loadingService.loadEarnings();
    this._quarterlyResults = this._importFinancialsService.quarterlyResults.filter(item => item.fiscalYear >= this.startYear);
    this._buildTableRows();
  }

  public getCurrentMetricResults(cell: QuarterlyEarningsSummaryCell): QuarterlyEarningsMetricResult {
    if (cell.earningsResult) {
      const results = this.currentMetricResults(cell.earningsResult, this._quarterlyResults);
      return results
    }
    return {
      raw: 0,
      formatted: '',
      isPositive: true,
      background: '',
    }
  }

  private _buildTableRows() {

    let currentYear = this.startYear;
    const endYear = Math.max(...this._quarterlyResults.map(item => item.fiscalYear));
    const allFYAggregateResults: EarningsResult[] = [];
    while (currentYear <= endYear) {
      let quartersForYear = this._quarterlyResults.filter(item => item.fiscalYear === currentYear).reverse();
      const aggregateResult = aggregateEarningsResult(quartersForYear);
      allFYAggregateResults.push(aggregateResult);
      currentYear++;
    }



    currentYear = this.startYear;



    const tableRows: QuarterlyEarningsSummaryRow[] = [];
    while (currentYear <= endYear) {
      const thisYearResults = this._quarterlyResults.filter(result => result.fiscalYear === currentYear);
      if(currentYear === endYear){
        if(thisYearResults.length < 4){
          this._showAggregateMessage = true;
        }
      }
      const tableRow: QuarterlyEarningsSummaryRow = new QuarterlyEarningsSummaryRow(currentYear, this._quarterlyResults, allFYAggregateResults, this.currentMenuItem);
      tableRows.push(tableRow);
      currentYear++;
    }
    this._tableRows = tableRows.reverse();
  }


  public showHideMenus: 'Show Table Menus' | 'Hide Table Menus' = 'Hide Table Menus';
  public onClickShowHideMenus() {
    if (this.showHideMenus === 'Show Table Menus') {
      this.showHideMenus = 'Hide Table Menus';
    } else if (this.showHideMenus === 'Hide Table Menus') {
      this.showHideMenus = 'Show Table Menus';
    }
  }
  public get showMenus(): boolean { return this.showHideMenus === 'Hide Table Menus'; }







}
