import { Component } from '@angular/core';
import { EarningsTableRow } from './earnings-table-row.class';
import { EarningsResult } from '../earnings-results/earnings-result.class';
import { IconDefinition, faNoteSticky, faSquareMinus, faSquarePlus, faLink, faFile } from '@fortawesome/free-solid-svg-icons';
import { EarningsResultInterface } from '../earnings-results/earnings-result.interface';
import dayjs from 'dayjs';
import { Import10KDataService } from '../earnings-results/import-10k-data.service';
import { releaseOverviews } from './release-overview/release-overviews';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../shared/services/loading.service';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { ColorPicker } from '../../../shared/color-picker.class';
@Component({
  selector: 'app-earnings-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './earnings-table.component.html',
  styleUrl: './earnings-table.component.scss'
})
export class EarningsTableComponent {
  constructor(
    private _importFinancialsService: Import10KDataService,
    private _loadingService: LoadingService,
    private _screenService: ScreenService) {
  }

  public get faNoteSticky(): IconDefinition { return faNoteSticky; }
  public get faSquarePlus(): IconDefinition { return faSquarePlus; }
  public get faSquareMinus(): IconDefinition { return faSquareMinus; }
  public get faLink(): IconDefinition { return faLink; }
  public get faFile(): IconDefinition { return faFile; }

  private _displayMode: 'QUARTER' | 'ANNUAL' = 'ANNUAL';
  private _timePeriod: string = "Fiscal Year";
  private _tableRows: EarningsTableRow[] = [];
  private _quarterlyResults: EarningsResult[] = []
  private _annualResults: EarningsResult[] = [];
  private _columnCount: number = 9;
  private _pageWidth: number = 0;
  private _fontSize: string = "0.9em";

  public get displayMode(): 'QUARTER' | 'ANNUAL' { return this._displayMode; }
  public get timePeriod(): string { return this._timePeriod; }
  public get displayIsAnnual(): boolean { return this._displayMode === 'ANNUAL'; }
  public get displayIsQuarter(): boolean { return this._displayMode === 'QUARTER'; }
  public get tableRows(): EarningsTableRow[] { return this._tableRows; }
  public get columnCount(): number { return this._columnCount; }
  public get fontSize(): string { return this._fontSize; }
  public get pageWidth(): number { return this._pageWidth; }

  async ngOnInit() {
    await this._loadingService.loadEarnings();
    this._quarterlyResults = this._importFinancialsService.quarterlyResults.filter(item => item.fiscalYear >= 2020);
    // this._annualResults = this._importFinancialsService.annualResults.filter(item => item.fiscalYear >= 2005);
    this._annualResults = this._importFinancialsService.annualResults.filter(item => item.fiscalYear >= 2005);
    this._tableRows = this._buildTableRows();
    this._screenService.screenDimensions$.subscribe({
      next: (dimensions) => {
        const width = dimensions.width;
        this._pageWidth = width;
        this._columnCount = 9;
        this._fontSize = "0.9em";
        if (width < 750) {
          this._columnCount = 8;
        }
        if (width < 655) {
          this._columnCount = 7;
        }
        if (width < 620) {
          this._columnCount = 6;
        }
        if (width < 520) {
          this._fontSize = "0.8em";
        }
        if (width < 450) {
          this._columnCount = 4;
        }
      }
    });
  }


  private _showMoreRows: boolean = false;
  private _showButton: boolean = true;
  public get showButton(): boolean  {return this._showButton; }
  public get showMoreRows(): boolean { return this._showMoreRows; }
  public onClickShowMoreRows(){ 
    this._showMoreRows = true; 
    this._tableRows = this._buildTableRows();
    this._showButton = false;
  }

  private _buildTableRows(): EarningsTableRow[] {
    let tableRows: EarningsTableRow[] = [];
    if (this._displayMode === 'QUARTER') {
      tableRows = this._quarterlyResults.map(result => new EarningsTableRow(result, releaseOverviews));
    } else {
      tableRows = this._annualResults.map(result => new EarningsTableRow(result, releaseOverviews));
    }
    if(!this._showMoreRows){
      tableRows = tableRows.slice(0, 8);
    }
    return tableRows;
  }

  public onClickQuartersYears(value: 'QUARTERS' | 'YEARS') {
    if (value === 'QUARTERS') {
      this._displayMode = 'QUARTER';
      this._timePeriod = 'Fiscal Quarter';
      // this._importFinancialsService.load10QData();
    } else {
      this._displayMode = 'ANNUAL';
      this._timePeriod = 'Fiscal Year';
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

  public columnWidth(): string {
    return (100 / this.columnCount) + "%";
  }

  public backgroundColor(
    quarterResult: EarningsResult | EarningsResultInterface,
    column: 'REVENUE' | 'NETINCOME' | 'ASSETS' | 'LIABILITIES' | 'EQUITY' | 'OPERATINGLOSSGAIN' | 'EPS' | 'DRS'
  ): string {
    let propertyValue = quarterResult.revenue;
    let minMax: { min: number, max: number } = { min: 0, max: 0 };

    const results: (EarningsResult | EarningsResultInterface)[] = this.tableRows.map(row => row.earningsResult);

    let backgroundColor: string = '';

    /** Get a color between red --> yellow --> green */
    if (column === 'REVENUE') {
      propertyValue = quarterResult.revenue;
      minMax = ColorPicker.getMinMax(results.map(item => item.revenue));
      backgroundColor = ColorPicker.getNonRedBGColor(0, minMax.max, propertyValue);
    } else if (column === 'NETINCOME') {
      propertyValue = quarterResult.netEarnings;
      backgroundColor = ColorPicker.getColorZeroBased(propertyValue);
    } else if (column === 'ASSETS') {
      propertyValue = quarterResult.totalAssets / 1000000;
      minMax = ColorPicker.getMinMax(results.map(item => item.totalAssets / 1000000));
      backgroundColor = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, propertyValue);
    } else if (column === 'LIABILITIES') {
      propertyValue = quarterResult.totalLiabilities / 1000000;
      minMax = ColorPicker.getMinMax(results.map(item => item.totalLiabilities / 1000000));
      backgroundColor = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, propertyValue, true);
    } else if (column === 'EQUITY') {
      propertyValue = quarterResult.stockholdersEquity / 1000000;
      minMax = ColorPicker.getMinMax(results.map(item => item.stockholdersEquity / 1000000));
      backgroundColor = ColorPicker.getNonRedBGColor(0, minMax.max, propertyValue);
    } else if (column === 'OPERATINGLOSSGAIN') {
      propertyValue = quarterResult.operatingIncome / 1000000;
      backgroundColor = ColorPicker.getColorZeroBased(propertyValue);
    } else if (column === 'EPS') {
      propertyValue = quarterResult.netEPS / 1000000;
      backgroundColor = ColorPicker.getColorZeroBased(propertyValue);
    }

    /** Create a gradient on the table to fade out the lower rows from time past */
    const tableRowsCount = this.tableRows.length;
    const indexSegment0 = tableRowsCount * (3 / 8);
    const indexSegment1 = tableRowsCount * (4 / 8);
    const indexSegment2 = tableRowsCount * (5 / 8);
    const indexSegment3 = tableRowsCount * (6 / 8);
    const indexSegment4 = tableRowsCount * (7 / 8);

    const thisResultRowIndex = results.findIndex(result => {
      const sameDate = result.reportingPeriod === quarterResult.reportingPeriod && result.fiscalYear === quarterResult.fiscalYear;
      return sameDate;
    })

    if (thisResultRowIndex >= indexSegment0 && thisResultRowIndex < indexSegment1) {
      backgroundColor = ColorPicker.setAlpha(backgroundColor, 0.08);
    } else if (thisResultRowIndex >= indexSegment1 && thisResultRowIndex < indexSegment2) {
      backgroundColor = ColorPicker.setAlpha(backgroundColor, 0.06);
    } else if (thisResultRowIndex >= indexSegment2 && thisResultRowIndex < indexSegment3) {
      backgroundColor = ColorPicker.setAlpha(backgroundColor, 0.04);
    } else if (thisResultRowIndex >= indexSegment3 && thisResultRowIndex < indexSegment4) {
      backgroundColor = ColorPicker.setAlpha(backgroundColor, 0.03);
    } else if (thisResultRowIndex >= indexSegment4) {
      backgroundColor = ColorPicker.setAlpha(backgroundColor, 0.02);
    }
    return backgroundColor;
  }




}
