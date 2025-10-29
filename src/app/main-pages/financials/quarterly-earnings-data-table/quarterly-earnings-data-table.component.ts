import { Component, OnInit } from '@angular/core';
import { EarningsResult } from '../earnings-results/earnings-result.class';
import { Import10KDataService } from '../earnings-results/import-10k-data.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';
import { CustomDropdownMenuComponent } from '../../../shared/components/custom-dropdown-menu/custom-dropdown-menu.component';
import { CustomDropdownMenu } from '../../../shared/components/custom-dropdown-menu/custom-dropdown-menu.class';
import { ColorPicker } from '../../../shared/color-picker.class';

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

  private _mouseIsIn: boolean = false;
  public get mouseIsIn(): boolean { return this._mouseIsIn; }
  public onMouseEnter() { this._mouseIsIn = true; }
  public onMouseLeave() { this._mouseIsIn = false; }

  private _quarterlyResults: EarningsResult[] = []
  // private _annualResults: EarningsResult[] = [];
  private _tableRows: EarningsResult[][] = [];

  public get tableRows(): EarningsResult[][] { return this._tableRows; }
  private get startYear(): number { return 2018; }
  public get isMobile(): boolean { return this._screenService.isMobile; }

  public onMenuItemSelected(menuItem: string) {

  }

  private _dropdownMenuItems: string[] = [
    'Net Income',
    'Revenue',
    'Net Profit Margin',
    'Hardware Sales',
    'Hardware Sales as Percent of Total',
    'Software Sales',
    'Software Sales as Percent of Total',
    'Collectibles Sales',
    'Collectibles Sales as Percent of Total',
    'Gross Profit',
    'Gross Margin',
    'Operating Income',
    'SG&A Expense',
    'Interest Income',
    "Stockholders' Equity",
    'Earnings per Share',
    'Book Value per Share'
  ];

  private _dropdownMenu: CustomDropdownMenu = new CustomDropdownMenu(this._dropdownMenuItems);
  public get dropdownMenu(): CustomDropdownMenu { return this._dropdownMenu; }

  async ngOnInit(): Promise<void> {
    await this._loadingService.loadEarnings();
    this._quarterlyResults = this._importFinancialsService.quarterlyResults.filter(item => item.fiscalYear >= this.startYear);
    this._buildTableRows();
  }

  private _buildTableRows() {

    let currentYear = this.startYear;
    let endYear = dayjs().year();

    const tableRows: EarningsResult[][] = [];
    while (currentYear <= endYear) {
      const yearResults = this._quarterlyResults.filter(result => result.fiscalYear === currentYear).reverse();
      tableRows.push(yearResults);
      currentYear++;
    }
    this._tableRows = tableRows.reverse();
  }


  public showHideMenus: 'Show Table Menus' | 'Hide Table Menus' = 'Show Table Menus';
  public onClickShowHideMenus() {
    if (this.showHideMenus === 'Show Table Menus') {
      this.showHideMenus = 'Hide Table Menus';
    } else if (this.showHideMenus === 'Hide Table Menus') {
      this.showHideMenus = 'Show Table Menus';
    }
  }
  public get showMenus(): boolean { return this.showHideMenus === 'Hide Table Menus'; }

  public counter(limit: number): number[] {
    return Array.from({ length: limit }, (_, i) => i);
  }



  public formatter(earningsResult: EarningsResult): string {
    const currentProperty: string = this._dropdownMenu.currentMenuItem;
    if (currentProperty === 'Net Income') {
      const value = earningsResult.netEarnings;
      if (value > 0) {
        return '$' + (earningsResult.netEarnings / 1000000).toFixed(0) + 'M';
      } else {
        return '-$' + Math.abs((earningsResult.netEarnings / 1000000)).toFixed() + 'M';
      }
    } else if (currentProperty === 'Revenue') {
      return '$' + (earningsResult.revenue / 1000000000).toFixed(1) + 'B';
    } else if (currentProperty === 'Net Profit Margin') {
      return ((earningsResult.netEarnings / earningsResult.revenue) * 100).toFixed(1) + '%';
    } else if (currentProperty === 'Hardware Sales') {
      return '$' + (earningsResult.hardwareRevenue / 1000000).toFixed(0) + 'M';
    } else if (currentProperty === 'Hardware Sales as Percent of Total') {
      return ((earningsResult.hardwareRevenue / earningsResult.revenue) * 100).toFixed(0) + '%';
    } else if (currentProperty === 'Software Sales') {
      return '$' + (earningsResult.softwareRevenue / 1000000).toFixed(0) + 'M';
    } else if (currentProperty === 'Software Sales as Percent of Total') {
      return ((earningsResult.softwareRevenue / earningsResult.revenue) * 100).toFixed(0) + '%';
    } else if (currentProperty === 'Collectibles Sales') {
      return '$' + (earningsResult.collectiblesRevenue / 1000000).toFixed(0) + 'M';
    } else if (currentProperty === 'Collectibles Sales as Percent of Total') {
      return ((earningsResult.collectiblesRevenue / earningsResult.revenue) * 100).toFixed(0) + '%';
    } else if (currentProperty === 'Gross Profit') {
      return '$' + (earningsResult.grossProfit / 1000000).toFixed(0) + 'M';
    } else if (currentProperty === 'Gross Margin') {
      return ((earningsResult.grossProfit / earningsResult.revenue) * 100).toFixed(1) + '%';
    } else if (currentProperty === 'Operating Income') {
      const value = earningsResult.operatingIncome;
      if (value > 0) {
        return '$' + (value / 1000000).toFixed(0) + 'M';
      } else {
        return '-$' + Math.abs((value / 1000000)).toFixed() + 'M';
      }
    } else if (currentProperty === 'SG&A Expense') {
      return '$' + (earningsResult.sga / 1000000).toFixed(0) + 'M';
    } else if (currentProperty === 'Interest Income') {
      return '$' + (earningsResult.interestIncome / 1000000).toFixed(0) + 'M';
    } else if (currentProperty === "Stockholders' Equity") {
      return '$' + (earningsResult.stockholdersEquity / 1000000000).toFixed(1) + 'B';
    } else if (currentProperty === 'Earnings per Share') {
      const value = earningsResult.netEPS;
      if (value > 0) {
        return '$' + (earningsResult.netEPS).toFixed(2);
      } else {
        return '-$' + Math.abs(earningsResult.netEPS).toFixed(2);
      }
    } else if (currentProperty === 'Book Value per Share') {
      const value = earningsResult.stockholdersEquity / earningsResult.weightedAverageSharesOutstanding;
      if (value > 0) {
        return '$' + (value).toFixed(2);
      } else {
        return '-$' + Math.abs(value).toFixed(2);
      }
    }





    return '';
  }
  public styler(row: EarningsResult[], index: number): any {
    if (row.length >= index + 1) {
      const earningsResult = row[index];
      const currentProperty: string = this._dropdownMenu.currentMenuItem;
      if (currentProperty === 'Net Income') {
        const value = earningsResult.netEarnings;
        if (value > 0) {
          return {
            'backgroundColor': 'rgba(0, 255, 0, 0.1)',
          };
        } else {
          return {
            'backgroundColor': 'rgba(255, 0, 0, 0.1)',
          };
        }
      } else if (currentProperty === 'Revenue') {
        const revenueValues = this._quarterlyResults.filter(result => result.fiscalYear >= this.startYear).map(r => r.revenue)
        const minMax = ColorPicker.getMinMax(revenueValues);
        const revenueValue = earningsResult.revenue
        const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, revenueValue);
        return {
          'backgroundColor': color,
        };
      } else if (currentProperty === 'Net Profit Margin') {
        const value = earningsResult.netEarnings / earningsResult.revenue;
        if (value > 0) {
          return {
            'backgroundColor': 'rgba(0, 255, 0, 0.1)',
          };
        } else {
          return {
            'backgroundColor': 'rgba(255, 0, 0, 0.1)',
          };
        }
      } else if (currentProperty === 'Hardware Sales') {
        const hardwareValues = this._quarterlyResults
          .filter(result => result.fiscalYear >= this.startYear)
          .filter(result => result.reportingPeriod === earningsResult.reportingPeriod)
          .map(r => r.hardwareRevenue)
        const minMax = ColorPicker.getMinMax(hardwareValues);
        const hardwareValue = earningsResult.hardwareRevenue
        const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, hardwareValue);
        return {
          'backgroundColor': color,
        };
      } else if (currentProperty === 'Hardware Sales as Percent of Total') {
        const hardwarePercentValues = this._quarterlyResults
          .filter(result => result.fiscalYear >= this.startYear)
          .map(r => ((r.hardwareRevenue / r.revenue) * 100))
        const minMax = ColorPicker.getMinMax(hardwarePercentValues);
        const hardwareValue = ((earningsResult.hardwareRevenue / earningsResult.revenue) * 100);
        const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, hardwareValue);
        return {
          'backgroundColor': color,
        };
      } else if (currentProperty === 'Software Sales') {
        const softwareValues = this._quarterlyResults
          .filter(result => result.fiscalYear >= this.startYear)
          .filter(result => result.reportingPeriod === earningsResult.reportingPeriod)
          .map(r => r.softwareRevenue)
        const minMax = ColorPicker.getMinMax(softwareValues);
        const softwareValue = earningsResult.softwareRevenue
        const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, softwareValue);
        return {
          'backgroundColor': color,
        };
      } else if (currentProperty === 'Software Sales as Percent of Total') {
        const softwarePercentValues = this._quarterlyResults
          .filter(result => result.fiscalYear >= this.startYear)
          .map(r => ((r.softwareRevenue / r.revenue) * 100))
        const minMax = ColorPicker.getMinMax(softwarePercentValues);
        const softwareValue = ((earningsResult.softwareRevenue / earningsResult.revenue) * 100);
        const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, softwareValue);
        return {
          'backgroundColor': color,
        };
      } else if (currentProperty === 'Collectibles Sales') {
        const collectiblesValues = this._quarterlyResults
          .filter(result => result.fiscalYear >= this.startYear)
          .filter(result => result.reportingPeriod === earningsResult.reportingPeriod)
          .map(r => r.collectiblesRevenue)
        const minMax = ColorPicker.getMinMax(collectiblesValues);
        const collectiblesValue = earningsResult.collectiblesRevenue
        const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, collectiblesValue);
        return {
          'backgroundColor': color,
        };
      } else if (currentProperty === 'Collectibles Sales as Percent of Total') {
        const collectiblesPercentValues = this._quarterlyResults
          .filter(result => result.fiscalYear >= this.startYear)
          .map(r => ((r.collectiblesRevenue / r.revenue) * 100))
        const minMax = ColorPicker.getMinMax(collectiblesPercentValues);
        const collectiblesValue = ((earningsResult.collectiblesRevenue / earningsResult.revenue) * 100);
        const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, collectiblesValue);
        return {
          'backgroundColor': color,
        };
      } else if (currentProperty === 'Gross Profit') {
        const grossProfitValues = this._quarterlyResults
          .filter(result => result.fiscalYear >= this.startYear)
          .filter(result => result.reportingPeriod === earningsResult.reportingPeriod)
          .map(r => r.grossProfit)
        const minMax = ColorPicker.getMinMax(grossProfitValues);
        const grossProfitValue = earningsResult.grossProfit;
        const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, grossProfitValue);
        return {
          'backgroundColor': color,
        };
      } else if (currentProperty === 'Gross Margin') {
        const grossMarginValues = this._quarterlyResults
          .filter(result => result.fiscalYear >= this.startYear)
          .filter(result => result.reportingPeriod === earningsResult.reportingPeriod)
          .map(r => ((r.grossProfit / r.revenue) * 100))
        const minMax = ColorPicker.getMinMax(grossMarginValues);
        const grossMarginValue = (earningsResult.grossProfit / earningsResult.revenue) * 100;
        const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, grossMarginValue);
        return {
          'backgroundColor': color,
        };
      } else if (currentProperty === 'Operating Income') {
        const oiValues = this._quarterlyResults
          .filter(result => result.fiscalYear >= this.startYear)
          .map(r => r.operatingIncome)
        const minMax = ColorPicker.getMinMax(oiValues);
        const operatingIncomeValue = earningsResult.operatingIncome;
        const color = ColorPicker.getColorZeroBased(operatingIncomeValue);
        return {
          'backgroundColor': color,
        };
      } else if (currentProperty === 'SG&A Expense') {
        const sgaValues = this._quarterlyResults
          .filter(result => result.fiscalYear >= this.startYear)
          .filter(result => result.reportingPeriod === earningsResult.reportingPeriod)
          .map(r => r.sga)
        const minMax = ColorPicker.getMinMax(sgaValues);
        const sgaValue = earningsResult.sga;
        const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, sgaValue, true);
        return {
          'backgroundColor': color,
        };
      } else if (currentProperty === 'Interest Income') {
        const iiValues = this._quarterlyResults
          .filter(result => result.fiscalYear >= this.startYear)
          .map(r => r.interestIncome)
        const minMax = ColorPicker.getMinMax(iiValues);
        const interestIncomeValue = earningsResult.interestIncome;
        const color = ColorPicker.getColorZeroBased(interestIncomeValue);
        return {
          'backgroundColor': color,
        };
      } else if (currentProperty === "Stockholders' Equity") {
        const seValues = this._quarterlyResults
          .filter(result => result.fiscalYear >= this.startYear)
          .filter(result => result.reportingPeriod === earningsResult.reportingPeriod)
          .map(r => r.stockholdersEquity)
        const minMax = ColorPicker.getMinMax(seValues);
        const seValue = earningsResult.stockholdersEquity;
        const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, seValue);
        return {
          'backgroundColor': color,
        };
      } else if (currentProperty === 'Earnings per Share') {
        const value = earningsResult.netEPS;
        if (value > 0) {
          return {
            'backgroundColor': 'rgba(0, 255, 0, 0.1)',
          };
        } else {
          return {
            'backgroundColor': 'rgba(255, 0, 0, 0.1)',
          };
        }
      } else if (currentProperty === 'Book Value per Share') {
        // const value = earningsResult.stockholdersEquity / earningsResult.weightedAverageSharesOutstanding;
        // if (value > 0) {
        //   return {
        //     'backgroundColor': 'rgba(0, 255, 0, 0.05)',
        //   };
        // } else {
        //   return {
        //     'backgroundColor': 'rgba(255, 0, 0, 0.1)',
        //   };
        // }

        const bvpsValues = this._quarterlyResults
          .filter(result => result.fiscalYear >= this.startYear)
          .filter(result => result.reportingPeriod === earningsResult.reportingPeriod)
          .map(r => r.stockholdersEquity / r.weightedAverageSharesOutstanding)
        const minMax = ColorPicker.getMinMax(bvpsValues);
        const seValue = earningsResult.stockholdersEquity / earningsResult.weightedAverageSharesOutstanding;
        const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, seValue);
        return {
          'backgroundColor': color,
        };
      }






    } else {
      return {};
    }


  }

  public valueIsPositive(earningsResult: EarningsResult): boolean {

    const currentProperty: string = this._dropdownMenu.currentMenuItem;
    if (currentProperty === 'Net Income') {
      const value = earningsResult.netEarnings;
      if (value > 0) {
        return true;
      } else {
        return false;
      }
    } else if (currentProperty === 'Revenue') {
      return true;
    } else if (currentProperty === 'Net Profit Margin') {
      const value = earningsResult.netEarnings / earningsResult.revenue;
      if (value > 0) {
        return true;
      } else {
        return false;
      }
    } else if (currentProperty === 'Hardware Sales') {
      return true;
    } else if (currentProperty === 'Hardware Sales as Percent of Total') {
      return true;
    } else if (currentProperty === 'Software Sales') {
      return true;
    } else if (currentProperty === 'Software Sales as Percent of Total') {
      return true;
    } else if (currentProperty === 'Collectibles Sales') {
      return true;
    } else if (currentProperty === 'Collectibles Sales as Percent of Total') {
      return true;
    } else if (currentProperty === 'Gross Profit') {
      return true;
    } else if (currentProperty === 'Operating Income') {
      const value = earningsResult.operatingIncome;
      if (value > 0) {
        return true;
      } else {
        return false;
      }
    } else if (currentProperty === 'SG&A Expense') {
      return true;
    } else if (currentProperty === 'Interest Income') {
      const value = earningsResult.interestIncome;
      if (value > 0) {
        return true;
      } else {
        return false;
      }
    } else if (currentProperty === "Stockholders' Equity") {
      const value = earningsResult.stockholdersEquity;
      if (value > 0) {
        return true;
      } else {
        return false;
      }
    } else if (currentProperty === 'Earnings per Share') {
      const value = earningsResult.netEPS;
      if (value > 0) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }


}
