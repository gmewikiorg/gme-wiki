import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-help-contribute',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './help-contribute.component.html',
  styleUrl: './help-contribute.component.scss'
})
export class HelpContributeComponent {
  public get faTriangle() { return faTriangleExclamation; }
  private _isExpanded: boolean = false;
  public get isExpanded(): boolean { return this._isExpanded; }

  public onClickContainer() {
    this._isExpanded = !this._isExpanded;
  }

}
