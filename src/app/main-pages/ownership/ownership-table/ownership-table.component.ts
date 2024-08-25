import { Component } from '@angular/core';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { OwnershipData } from '../ownership-data.class';
import dayjs from 'dayjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ownership-table',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './ownership-table.component.html',
  styleUrl: './ownership-table.component.scss'
})
export class OwnershipTableComponent {
  constructor(
    private _screenService: ScreenService
  ){}

  public get isMobile(): boolean { return this._screenService.isMobile; }

  public get data(): OwnershipData { return new OwnershipData(); }

  public get lastUpdated(): string { 
    return dayjs((new OwnershipData()).lastUpdateYYYYMMDD).format('MMMM D, YYYY')
  }

  public get tso(): string { return (this.data.tso / 1000000).toFixed(1); }

  public get drsNumber(): number { return this.data.drs.value / 1000000; }
  public get dsppNumber(): number { return this.data.dspp.value / 1000000; }
  public get totalRegistered(): number { return this.drsNumber + this.dsppNumber; }

  public get rkNumber(): number { return this.data.rk.value / 1000000; }

  public get rcNumber(): number { return this.data.rc.value / 1000000; }
  public get otherInsiders(): number { return this.data.otherInsiders.value / 1000000; }
  public get insidersTotal(): number { return this.rcNumber + this.otherInsiders; }

  public get vanguard(): number { return this.data.vanguard.value / 1000000; }
  public get blackrock(): number { return this.data.blackrock.value / 1000000; }
  public get statestreet(): number { return this.data.statestreet.value / 1000000; }
  public get otherInst(): number { return this.data.otherInstitutional.value / 1000000; }
  public get instTotal(): number { return this.vanguard + this.blackrock + this.statestreet + this.otherInst; }

  public get remainderTotal(): number { return this.data.remainderTotal;  }
  public get beneficial(): number { return this.data.totalBeneficial; }
  
  private _showSources: boolean = false;
  private _buttonLabel: string = 'Show data sources'
  public get showSources(): boolean { return this._showSources; }
  public get buttonLabel(): string { return this._buttonLabel; }

  public get recent10Q10Kurl(): string { return 'https://www.sec.gov/Archives/edgar/data/1326380/000132638024000030/gme-20240504.htm'; }


  public percent(section: number): string{
    return ((section / (this.data.tso/1000000)) * 100).toFixed(1);
  }

  public onClickShowDataSource(){
    this._showSources = !this._showSources;
    if(this._showSources === true){
      this._buttonLabel = 'Hide data sources';
    }else{
      this._buttonLabel = 'Show data sources';
    }
  }
}
