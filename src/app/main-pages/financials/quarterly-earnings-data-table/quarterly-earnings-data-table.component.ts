import { Component, OnInit } from '@angular/core';
import { EarningsResult } from '../earnings-results/earnings-result.class';
import { Import10KDataService } from '../earnings-results/import-10k-data.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';

@Component({
  selector: 'app-quarterly-earnings-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quarterly-earnings-data-table.component.html',
  styleUrl: './quarterly-earnings-data-table.component.scss'
})
export class QuarterlyEarningsDataTableComponent implements OnInit {
  constructor(
    private _importFinancialsService: Import10KDataService,
    private _loadingService: LoadingService,
    private _screenService: ScreenService) {
  }


  private _quarterlyResults: EarningsResult[] = []
  private _annualResults: EarningsResult[] = [];
  private _tableRows: EarningsResult[][] = [];

  public get tableRows(): EarningsResult[][] { return this._tableRows; }
  private get startYear(): number { return 2020; }
  public get isMobile(): boolean { return this._screenService.isMobile; }

  async ngOnInit(): Promise<void> {
    await this._loadingService.loadEarnings();
    this._quarterlyResults = this._importFinancialsService.quarterlyResults.filter(item => item.fiscalYear >= 2020);
    // this._annualResults = this._importFinancialsService.annualResults.filter(item => item.fiscalYear >= 2005);
    this._annualResults = this._importFinancialsService.annualResults.filter(item => item.fiscalYear >= 2005);
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

  public counter(limit: number): number[] {
    return Array.from({ length: limit }, (_, i) => i);
  }

  public formatter(earningsResult: EarningsResult): string {
    const value = earningsResult.netEarnings;
    if (value > 0) {
      return '$' + (earningsResult.netEarnings / 1000000).toFixed(0);
    } else {
      return '-$' + Math.abs((earningsResult.netEarnings / 1000000)).toFixed(0);
    }
    return '';
  }
  public styler(row: EarningsResult[], index: number): any {
    if (row.length >= index + 1) {
      const earningsResult = row[index];
      const value = earningsResult.netEarnings;
      if (value > 0) {
        return {
          'backgroundColor': 'rgba(0, 255, 0, 0.1)',
          // 'color': 'rgb(0, 134, 0)',
        };
      } else {
        return {
          'backgroundColor': 'rgba(255, 0, 0, 0.1)',
                    // 'color': 'rgb(185, 0, 0)',
        };
      }
    } else {
      return {};
    }


  }

  public valueIsPositive(earningsResult: EarningsResult): boolean {
    if (earningsResult.netEarnings > 0) {
      return true;
    } else {
      return false;
    }
  }


}
