import { Component } from '@angular/core';
import { EarningsTableRow } from './earnings-table-row.class';
import { EarningsResult } from '../earnings-results/earnings-result.class';
import { IconDefinition, faNoteSticky, faSquareMinus, faSquarePlus, faLink, faFile } from '@fortawesome/free-solid-svg-icons';
import { EarningsResultInterface } from '../earnings-results/earnings-result.interface';
import dayjs from 'dayjs';
import { Import10KDataService } from '../../../shared/services/import-10k-data.service';
import { releaseOverviews } from './release-overview/release-overviews';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../shared/services/loading.service';
import { ScreenService } from '../../../shared/services/screen-size.service';

@Component({
  selector: 'app-earnings-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './earnings-table.component.html',
  styleUrl: './earnings-table.component.scss'
})
export class EarningsTableComponent {
  constructor(
    private _financialsService: Import10KDataService, 
    private _loadingService: LoadingService, 
    private _screenService: ScreenService) { 
  }


  public get faNoteSticky(): IconDefinition { return faNoteSticky; }
  public get faSquarePlus(): IconDefinition { return faSquarePlus; }
  public get faSquareMinus(): IconDefinition { return faSquareMinus; }
  public get faLink(): IconDefinition { return faLink; }
  public get faFile(): IconDefinition { return faFile; }

  private _displayMode: 'QUARTER' | 'ANNUAL' = 'ANNUAL';
  public get displayMode(): 'QUARTER' | 'ANNUAL' { return this._displayMode; }
  public get displayIsAnnual(): boolean { return this._displayMode === 'ANNUAL'; }
  public get displayIsQuarter(): boolean { return this._displayMode === 'QUARTER'; }

  private _tableRows: EarningsTableRow[] = [];
  public get tableRows(): EarningsTableRow[] { return this._tableRows; }

  private _quarterlyResults: EarningsResult[] = []
  private _annualResults: EarningsResult[] = [];

  private _columnCount: number = 9;
  public get columnCount(): number { return this._columnCount; }
  private _fontSize: string = "0.9em";
  public get fontSize(): string { return this._fontSize; }

  async ngOnInit() {
    await this._loadingService.loadEarnings();
    this._quarterlyResults = this._financialsService.quarterlyResults.filter(item => item.fiscalYear >= 2020);
    this._annualResults = this._financialsService.annualResults.filter(item => item.fiscalYear >= 2005);
    this._tableRows = this._buildTableRows();

    this._screenService.screenDimensions$.subscribe({
      next: (dimensions)=> {
        const width = dimensions.width;
        this._columnCount = 9;
        this._fontSize = "0.9em";
        if(width < 750){
          this._columnCount = 8;
        }
        if(width < 655){
          this._columnCount = 7;
        }
        if(width < 620){
          this._columnCount = 6;
        }
        if(width < 520){
          this._fontSize = "0.8em";
        }
        if(width < 450){
          this._columnCount = 4;
        }
      }
    })
  }

  private _buildTableRows(): EarningsTableRow[] {
    let tableRows: EarningsTableRow[] = [];
    if (this._displayMode === 'QUARTER') {
      tableRows  = this._quarterlyResults.map(result => new EarningsTableRow(result, releaseOverviews));
    } else {
      tableRows = this._annualResults.map(result => new EarningsTableRow(result, releaseOverviews));
    }


    return tableRows;
  }

  

  // private _buildQuarterlyResults() {
  //   let quarterlyResults: EarningsResult[] = Object.assign([], this._financialsService.quarterlyResults);
  //   quarterlyResults = quarterlyResults.sort((item1, item2) => {
  //     if (item1.filingDateYYYYMMDD > item2.filingDateYYYYMMDD) {
  //       return -1;
  //     } else if (item1.filingDateYYYYMMDD < item2.filingDateYYYYMMDD) {
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   });
  //   return quarterlyResults;
  // }

  // private _buildYearlyResults(): EarningsResultInterface[] {
  //   let quarterlyResults: EarningsResult[] = this._buildQuarterlyResults();
  //   let years: number[] = [];
  //   const yearlyResults: EarningsResultInterface[] = [];
  //   quarterlyResults.map(result => result.fiscalYear).forEach(year => {
  //     if (years.indexOf(year) === -1) {
  //       years.push(year);
  //     }
  //   });
  //   years.forEach(year => {
  //     let yearQuarters = quarterlyResults.filter(result => result.fiscalYear === year)
  //     console.log("Warning - failure to build FY resuls here.")
  //     // const fullYear = new FYResult(yearQuarters);
  //     // yearlyResults.push(fullYear);
  //   });
  //   return yearlyResults;
  // }

  public onClickQuartersYears(value: 'QUARTERS' | 'YEARS') {
    if (value === 'QUARTERS') {
      this._displayMode = 'QUARTER';
      this._financialsService.load10QData$();
    } else {
      this._displayMode = 'ANNUAL';
    }
    this._tableRows = this._buildTableRows();
  }

  public date(dateYYYYMMDD: string): string {
    return dayjs(dateYYYYMMDD).format('MMM D, YYYY');
  }
  public trimmedYear(year: number): string {
    const date = String(year) + '-01-01';
    return dayjs(date).format('YY');
  }

  public backgroundColor(
    quarterResult: EarningsResult | EarningsResultInterface,
    column: 'REVENUE' | 'NETINCOME' | 'ASSETS' | 'LIABILITIES' | 'EQUITY' | 'OPERATINGLOSSGAIN' | 'EPS' | 'DRS'
  ): string {
    let propertyValue = quarterResult.revenue;
    let minMax: { min: number, max: number } = { min: 0, max: 0 };

    const results: (EarningsResult | EarningsResultInterface)[] = this.tableRows.map(row => row.earningsResult);

    if (column === 'REVENUE') {
      propertyValue = quarterResult.revenue;
      minMax = this._getMinMax(results.map(item => item.revenue));
      return this._getColor(0, minMax.max, propertyValue);
    } else if (column === 'NETINCOME') {
      propertyValue = quarterResult.netEarnings;
      return this._getColorZeroBased(propertyValue);
    } else if (column === 'ASSETS') {
      propertyValue = quarterResult.totalAssets/1000000;
      minMax = this._getMinMax(results.map(item => item.totalAssets/1000000));
      return this._getColor(minMax.min, minMax.max, propertyValue);
    } else if (column === 'LIABILITIES') {
      propertyValue = quarterResult.totalLiabilities/1000000;
      minMax = this._getMinMax(results.map(item => item.totalLiabilities/1000000));
      return this._getColor(minMax.min, minMax.max, propertyValue, true);
    } else if (column === 'EQUITY') {
      propertyValue = quarterResult.stockholdersEquity/1000000;
      minMax = this._getMinMax(results.map(item => item.stockholdersEquity/1000000));
      return this._getColor(0, minMax.max, propertyValue);
    } else if (column === 'OPERATINGLOSSGAIN') {
      propertyValue = quarterResult.operatingExpenses/1000000;
      return this._getColorZeroBased(propertyValue);
    } else if (column === 'EPS') {
      propertyValue = quarterResult.netEPS/1000000;
      return this._getColorZeroBased(propertyValue);
    } else if (column === 'DRS') {
      return this._getDRSColor(quarterResult.drs/1000000, quarterResult.weightedAverageSharesOutstanding/1000000);
    }
    return '';
  }

  private _getDRSColor(DRSMillions: number, sharesTotal: number): string {
    const percentage = (DRSMillions / sharesTotal) * 100;
    if (percentage === 0) {
      return 'rgba(148,23,106,0.00)';
    } else if (percentage > 0 && percentage < 20) {
      return 'rgba(148,23,106,0.2)';
    } else if (percentage >= 20 && percentage < 40) {
      return 'rgba(148,23,106,0.4)';
    } else if (percentage >= 40 && percentage < 60) {
      return 'rgba(148,23,106,0.6)';
    } else if (percentage >= 60 && percentage < 80) {
      return 'rgba(148,23,106,0.8)';
    } else {
      return 'rgba(148,23,106,0.00)';
    }
    return 'rgba(148,23,106,0.00)';
  }

  private _getMinMax(values: number[]): { min: number, max: number } {
    let min = values[0];
    let max = 0;
    values.forEach(value => {
      if (value > max) {
        max = value;
      }
      if (value < min) {
        min = value;
      }
    });
    return { min: min, max: max };;
  }

  private _getColorZeroBased(value: number) {
    /**
     *  negative numbers: red
     * 
     *  zero: white
     * 
     *  positive numbers: green
     * 
     */
    if (value < 0) {
      return 'rgba(255, 0, 0, 0.07)';
    } else if (value === 0) {
      return 'rgb(255, 255, 255)';
    } else if (value > 0) {
      return 'rgba(44, 186, 0, 0.07)';
    }
    return 'rgb(255, 255, 255)';

  }

  private _getColor(min: number, max: number, value: number, reverse: boolean = false): string {
    let scale = [
      'rgba(255, 0, 0, 0.07)',
      'rgba(255, 167, 0, 0.07)',
      'rgba(255, 244, 0, 0.07)',
      'rgba(163, 255, 0, 0.07)',
      'rgba(44, 186, 0, 0.07)'
    ];
    if (reverse === true) {
      scale = [
        'rgba(44, 186, 0, 0.07)',
        'rgba(163, 255, 0, 0.07)',
        'rgba(255, 244, 0, 0.07)',
        'rgba(255, 167, 0, 0.07)',
        'rgba(255, 0, 0, 0.07)',
      ];
    }
    const scales = scale.length;
    const range = max - min;
    const scaleSize = range / scales;
    const valueDiff = value - min;
    let valueScale = Math.round(valueDiff / scaleSize);
    valueScale--;
    if (valueScale < 0) {
      valueScale = 0;
    }

    if(value === 0){
      return 'rgba(0,0,0,0)';
    }

    return scale[valueScale];
  }

}
