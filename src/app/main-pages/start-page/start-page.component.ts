import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { OwnershipData } from '../ownership/ownership-data/ownership-data.class';
import { CommonModule } from '@angular/common';
import { ScreenService } from '../../shared/services/screen-size.service';
import { StartPageService } from './start-page.service';
import { TurnaroundTableComponent } from '../../info-pages/_corporate/turnaround/turnaround-table/turnaround-table.component';
import { EarningsChartConfig } from '../financials/earnings-chart/earnings-chart-config.interface';
import { EarningsChartPropertySelection } from '../financials/earnings-chart/choose-earnings-chart/earnings-chart-property-selection.enum';
import { EarningsChartComponent } from '../financials/earnings-chart/earnings-chart.component';
import { InfoPage, InfoPageProperties } from '../../shared/components/information-page.interface';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [RouterModule, FooterComponent, CommonModule, TurnaroundTableComponent, EarningsChartComponent],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent implements OnInit, AfterViewInit, InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: 'Welcome to gmewiki.org - an information tool all about GME and GameStop',
    description: 'gmewiki.org - a community-driven information tool all about GME and GameStop',
    url: 'https://gmewiki.org/start',
    image: 'https://gmewiki.org/assets/main-pages/gamestop-background.png',
    githubPageUrl: 'main-pages/start-page/start-page.component.html',
  }


  constructor(private _screenService: ScreenService, private _startPageService: StartPageService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

  private _ownershipData: OwnershipData = new OwnershipData();
  private _registeredPercent = (this._ownershipData.totalRegistered / this._ownershipData.tso) * 100;
  public get registeredPercent(): string { return this._registeredPercent.toFixed(0); }

  public get isDarkMode(): boolean { return this._screenService.isDarkMode; }
  public get isMobile(): boolean { return this._screenService.isMobile; }

  private _gapSectionNgStyle: any = {
    height: '700px',
    'backgroundColor': 'transparent',
    'margin-top': '100px',
    // 'border': '1px solid red'
  };
  private _mainMenuLabelNgStyle: any = {
    'font-size': '0.9em',
  }
  private _subtitleNgStyle: any = {
    'font-size': '0.9em',
  }
  private _backgroundNgStyle: any = {
    'background-position': 'center calc(0px - 75px)',
  }

  public get backgroundNgStyle(): any { return this._backgroundNgStyle; }

  ngOnInit(): void {

    this._updateNgStyle(this._screenService.screenDimensions)
    this._screenService.screenDimensions$.subscribe(dimensions => {
      this._updateNgStyle(dimensions)
    })
    this._afterViewInit = true;
  }

  private _afterViewInit: boolean = false;
  public get afterViewInit(): boolean { return this._afterViewInit; }
  ngAfterViewInit() {

  }

  private _updateNgStyle(dimensions: { width: number, height: number }) {
    const width = dimensions.width;
    if (width > 800) {
      this._subtitleNgStyle = {
        'font-size': '0.9em',
      }
      // this._mainMenuLabelNgStyle = {
      //   'font-size': '0.9em',
      // }
    }
    else if (width <= 800 && width > 760) {
      this._subtitleNgStyle = {
        'font-size': '0.8em',
      }
    } else if (width <= 760) {
      this._subtitleNgStyle = {
        'font-size': '0.7em',
      }
    }

    this._gapSectionNgStyle = {
      height: (width / 3).toFixed(0) + "px",
      'backgroundColor': 'transparent',
      'margin-top': '100px',
      // 'border': '1px solid red'
    };

    if (width < 800 && width > 600) {
      this._backgroundNgStyle = {
        'background-position': 'center calc(0px)',
      }
    } else if (width >= 800) {
      this._backgroundNgStyle = {
        'background-position': 'center calc(0px - 75px)',
      }
    } else if (width <= 600) {
      this._backgroundNgStyle = {
        'background-position': 'center calc(0px + 75px)',
      }
    }
  }

  public get isBrowser(): boolean { return this._screenService.isBrowser; }
  public get screenWidth(): number { return this._screenService.screenWidth; }

  public get gapSectionNgStyle(): any { return this._gapSectionNgStyle; }
  public get mainMenuLabelNgStyle(): any { return this._mainMenuLabelNgStyle; }
  public get subtitleNgStyle(): any { return this._subtitleNgStyle; }

  public onMouseEnterMainMenu() {
    this._startPageService.onMouseEnterMainMenu();
  }


  public get collectiblesConfig(): EarningsChartConfig {
    return {
      period: 'QUARTER',
      startYear: 2020,
      endYear: 2026,
      selectedProperty: EarningsChartPropertySelection.REVENUE_TYPE_PERCENTAGE_COLLECTIBLES,
      menuLabel: 'Collectibles Revenue: Increasing',
      showCustomLegend: false,
    }
  }
}
