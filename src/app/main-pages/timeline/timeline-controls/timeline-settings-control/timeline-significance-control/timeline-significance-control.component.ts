import { Component } from '@angular/core';
import { ChartDataManagerService } from '../../../timeline-chart/timeline-chart-data-manager-service';
import { TimelineItemsService } from '../../../timeline-items/timeline-items.service';
import { SettingsService } from '../../../../../shared/services/settings.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timeline-significance-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline-significance-control.component.html',
  styleUrl: './timeline-significance-control.component.scss'
})
export class TimelineSignificanceControlComponent {
  constructor(
    private _dataManagerService: ChartDataManagerService, 
    private _itemService: TimelineItemsService,
    private _settingsService: SettingsService,
    ){
    
    const initialValue = this._settingsService.significanceValue;
    this._controlButtons = [
      // {value:0, isSelected: false},
      {value:1, isSelected: false},
      {value:2, isSelected: false},
      {value:3, isSelected: false},
      {value:4, isSelected: false},
      {value:5, isSelected: false},
    ];
    const foundItem = this._controlButtons.find(item => item.value === initialValue);
    if(foundItem){
      foundItem.isSelected = true;
    }
  }
  private _controlButtons: {value:number, isSelected: boolean}[] = [];
  public get controlButtons():  {value:number, isSelected: boolean}[] { return this._controlButtons; }

  public onClickButton(value: number){
    const foundItem = this._controlButtons.find(item => item.value === value);
    if(foundItem){
      this.controlButtons.forEach(item => item.isSelected = false);
      foundItem.isSelected = true;
      this._settingsService.updateSignificanceValue(value);
      this._dataManagerService.updateSignificanceValue(value);
      this._itemService.updateSignificanceValue(value);
    }
  }

  public ngStyle(button:  {value:number, isSelected: boolean}){
    let radius = (button.value+1) * 4;
    let isSelected = this._settingsService.significanceValue <= button.value;
    let backgroundColor = 'white';
    if(isSelected){
      backgroundColor = 'rgba(204, 82, 165, 0.325)';
    }
    return {
      'min-width': radius + 'px',
      'max-width': radius + 'px',
      'width': radius + 'px',
      'min-height': radius + 'px',
      'max-height': radius + 'px',
      'height': radius + 'px',
      'background-color': backgroundColor,
    }
  }
}
