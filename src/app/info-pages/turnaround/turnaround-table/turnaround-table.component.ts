import { Component } from '@angular/core';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { CommonModule } from '@angular/common';
import { Import10KDataService } from '../../../shared/services/earnings-results/import-10k-data.service';
import { EarningsResult } from '../../../shared/services/earnings-results/earnings-result.class';
import { ColorPicker } from '../../../shared/color-picker.class';

export type TurnaroundTableOption = 'FY_VALUE' | 'YoY_CHANGE' | 'YoY_PERCENTAGE';
export type TurnaroundTableRowProperty = 'STORE_COUNT' | 'REVENUE' | 'ASSETS' | 'LIABILITIES' | 'EQUITY' | 'OP_INCOME' | 'INT_INCOME' | 'NET_INCOME';

@Component({
  selector: 'app-turnaround-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './turnaround-table.component.html',
  styleUrl: './turnaround-table.component.scss'
})
export class TurnaroundTableComponent {

  constructor(private _screenService: ScreenService, private _10kService: Import10KDataService) {

  }

  public get annual10KData(): EarningsResult[] { return this._10kService.annualResults; }
  private _currentTableOption: TurnaroundTableOption = 'FY_VALUE';
  public get isMobile(): boolean { return this._screenService.isMobile; }
  public get currentOptionType(): TurnaroundTableOption { return this._currentTableOption; }
  public get optionIsFyVal(): boolean { return this.currentOptionType === 'FY_VALUE'; }
  public get optionIsYoY(): boolean { return this.currentOptionType === 'YoY_CHANGE'; }
  public get optionIsYoYPercentage(): boolean { return this.currentOptionType === 'YoY_PERCENTAGE'; }

  public get yearsRangeStart(): number { return this.yearsRange[0]; }
  public get yearsRangeEnd(): number { return this.yearsRange[this.yearsRange.length-1]; }
  // public get yearsRange(): number[] { return [2020, 2021, 2022, 2023, 2024]; }
  public get yearsRange(): number[] { return [2020, 2021, 2022, 2023]; }

  public getColor(valueProperty: TurnaroundTableRowProperty, fiscalYear: number): string {
    return this._getPropertyColor(fiscalYear, valueProperty);
  }


  private _getPropertyColor(fiscalYear: number, property: TurnaroundTableRowProperty): string {
    let reverse = false;
    if (property === 'LIABILITIES') {
      reverse = true;
    }
    if (this.optionIsFyVal) {
      let values: number[] = [];
      if (property === 'LIABILITIES') {
        values = this.annual10KData.filter(item => item.fiscalYear >= this.yearsRangeStart && item.fiscalYear <= this.yearsRangeEnd).map(item => item.totalLiabilities);
      } else if (property === 'ASSETS') {
        values = this.annual10KData.filter(item => item.fiscalYear >= this.yearsRangeStart && item.fiscalYear <= this.yearsRangeEnd).map(item => item.totalAssets);
      } else if (property === 'STORE_COUNT') {
        values = this.annual10KData.filter(item => item.fiscalYear >= this.yearsRangeStart && item.fiscalYear <= this.yearsRangeEnd).map(item => item.storeCount);
      } else if (property === 'EQUITY') {
        values = this.annual10KData.filter(item => item.fiscalYear >= this.yearsRangeStart && item.fiscalYear <= this.yearsRangeEnd).map(item => item.stockholdersEquity);
      } else if (property === 'REVENUE') {
        values = this.annual10KData.filter(item => item.fiscalYear >= this.yearsRangeStart && item.fiscalYear <= this.yearsRangeEnd).map(item => item.revenue);
      }else if (property === 'OP_INCOME') {
        values = this.annual10KData.filter(item => item.fiscalYear >= this.yearsRangeStart && item.fiscalYear <= this.yearsRangeEnd).map(item => item.operatingIncome);
        const minMax = ColorPicker.getMinMax(values);
        const value = this._getValue(property, fiscalYear, this.currentOptionType);
        return ColorPicker.getColor(minMax.min, minMax.max, value, reverse);
      }else if (property === 'INT_INCOME') {
        values = this.annual10KData.filter(item => item.fiscalYear >= this.yearsRangeStart && item.fiscalYear <= this.yearsRangeEnd).map(item => item.interestIncome);
        const minMax = ColorPicker.getMinMax(values);
        const value = this._getValue(property, fiscalYear, this.currentOptionType);
        return ColorPicker.getColor(minMax.min, minMax.max, value, reverse);
      }else if (property === 'NET_INCOME') {
        values = this.annual10KData.filter(item => item.fiscalYear >= this.yearsRangeStart && item.fiscalYear <= this.yearsRangeEnd).map(item => item.netEarnings);
        const minMax = ColorPicker.getMinMax(values);
        const value = this._getValue(property, fiscalYear, this.currentOptionType);
        return ColorPicker.getColor(minMax.min, minMax.max, value, reverse);
      }
      const minMax = ColorPicker.getMinMax(values);
      const value = this._getValue(property, fiscalYear, this.currentOptionType);
      return ColorPicker.getNonRedColor(minMax.min, minMax.max, value, reverse);
    } else {
      const yearValues: number[] = [];
      this.yearsRange.forEach(year => {
        let yearValue = this._getValue(property, year, this.currentOptionType);
        yearValues.push(yearValue);
      })
      const minMax = ColorPicker.getMinMax(yearValues);
      const value = this._getValue(property, fiscalYear, this.currentOptionType);
      return ColorPicker.getNonRedColor(minMax.min, minMax.max, value, reverse);
    }

  }

  private _getValue(valueProperty: TurnaroundTableRowProperty, fiscalYear: number, option: TurnaroundTableOption): number {
    const foundItem: EarningsResult | undefined = this.annual10KData.find(item => item.fiscalYear === fiscalYear);
    let value: number = 0;
    if (foundItem) {
      if (option === 'FY_VALUE') {
        if (valueProperty === 'STORE_COUNT') {
          value = foundItem.storeCount;
        } else if (valueProperty === 'REVENUE') {
          value = foundItem.revenue;
        } else if (valueProperty === 'ASSETS') {
          value = foundItem.totalAssets;
        } else if (valueProperty === 'LIABILITIES') {
          value = foundItem.totalLiabilities;
        } else if (valueProperty === 'EQUITY') {
          value = foundItem.stockholdersEquity;
        } else if (valueProperty === 'OP_INCOME') {
          value = foundItem.operatingIncome;
        } else if (valueProperty === 'INT_INCOME') {
          value = foundItem.interestIncome;
        } else if (valueProperty === 'NET_INCOME') {
          value = foundItem.netEarnings;
        }
      } else {
        const foundPrevYearItem: EarningsResult | undefined = this.annual10KData.find(item => item.fiscalYear === (fiscalYear - 1));
        if (foundPrevYearItem) {
          if (option === 'YoY_CHANGE') {

            if (valueProperty === 'STORE_COUNT') {
              const storeDiff = foundItem.storeCount - foundPrevYearItem.storeCount;
              value = storeDiff;
            } else if (valueProperty === 'REVENUE') {
              value = foundItem.revenue - foundPrevYearItem.revenue;
            } else if (valueProperty === 'ASSETS') {
              value = foundItem.totalAssets - foundPrevYearItem.totalAssets;
            } else if (valueProperty === 'LIABILITIES') {
              value = foundItem.totalLiabilities - foundPrevYearItem.totalLiabilities;
            } else if (valueProperty === 'EQUITY') {
              value = foundItem.stockholdersEquity - foundPrevYearItem.stockholdersEquity;
            } else if (valueProperty === 'OP_INCOME') {
              value = foundItem.operatingIncome - foundPrevYearItem.operatingIncome;
            } else if (valueProperty === 'INT_INCOME') {
              value = foundItem.interestIncome - foundPrevYearItem.interestIncome;
            } else if (valueProperty === 'NET_INCOME') {
              value = foundItem.netEarnings - foundPrevYearItem.netEarnings;
            }
          } else if (option === 'YoY_PERCENTAGE') {
            if (valueProperty === 'STORE_COUNT') {
              value = getPercentDifference(foundPrevYearItem.storeCount, foundItem.storeCount);
            } else if (valueProperty === 'REVENUE') {
              value = getPercentDifference(foundPrevYearItem.revenue, foundItem.revenue);
            } else if (valueProperty === 'ASSETS') {
              value = getPercentDifference(foundPrevYearItem.totalAssets, foundItem.totalAssets);
            } else if (valueProperty === 'LIABILITIES') {
              value = getPercentDifference(foundPrevYearItem.totalLiabilities, foundItem.totalLiabilities);
            } else if (valueProperty === 'EQUITY') {
              value = getPercentDifference(foundPrevYearItem.stockholdersEquity, foundItem.stockholdersEquity);
            } else if (valueProperty === 'OP_INCOME') {
              value = getPercentDifference(foundPrevYearItem.operatingIncome, foundItem.operatingIncome);
            } else if (valueProperty === 'INT_INCOME') {
              value = getPercentDifference(foundPrevYearItem.interestIncome, foundItem.interestIncome);
            } else if (valueProperty === 'NET_INCOME') {
              value = getPercentDifference(foundPrevYearItem.netEarnings, foundItem.netEarnings);
            }
          }
        }
      }
    }
    return value;
  }

  public getValueString(valueProperty: TurnaroundTableRowProperty, fiscalYear: number): string {
    const numValue = this._getValue(valueProperty, fiscalYear, this.currentOptionType);
    let stringValue: string = '';
    if (this.optionIsFyVal) {
      if (valueProperty === 'STORE_COUNT') {
        stringValue = (numValue).toLocaleString('en-US');
      } else {
        stringValue = formatCurrency(numValue);
      }
    } else if (this.optionIsYoY) {
      if (valueProperty === 'STORE_COUNT') {
        stringValue = (numValue).toLocaleString('en-US');
      } else {
        stringValue = formatCurrency(numValue, true);
      }
    } else if (this.optionIsYoYPercentage) {
      stringValue = formatPercentage(numValue);
    }
    return stringValue;
  }
  public onClickOption(option: TurnaroundTableOption) {
    this._currentTableOption = option;
  }
}



function getPercentDifference(prevYearval: number, currentYearVal: number) {
  const diff = currentYearVal - prevYearval;
  const absolutePerctentsge = (Math.abs(diff) / Math.abs(prevYearval) * 100);
  let value = absolutePerctentsge;
  if (diff < 0) {
    value = value * -1;
  }
  return value;
}
function formatPercentage(percentage: number): string {
  if (percentage < 0) {
    return percentage.toFixed(0) + '%';
  } else {
    return '+' + percentage.toFixed(0) + '%';
  }
}

function formatCurrency(value: number, showPlusSign: boolean = false): string {
  const absValue = Math.abs(value);
  let formattedValue: string;

  if (absValue >= 1_000_000_000) {
    formattedValue = `$${(value / 1_000_000_000).toFixed(1)} B`;
  } else if (absValue >= 1_000_000) {
    formattedValue = `$${(value / 1_000_000).toFixed(0)} M`;
  } else {
    formattedValue = `$${value.toLocaleString()}`;
  }

  // Ensure negative sign appears before the dollar sign
  formattedValue = formattedValue.replace(/\$-/, '-$');

  // Add plus sign if required and value is positive
  if (showPlusSign && value > 0) {
    formattedValue = `+${formattedValue}`;
  }

  return formattedValue;
}