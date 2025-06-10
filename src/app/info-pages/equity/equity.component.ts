import { Component } from '@angular/core';

@Component({
  selector: 'app-equity',
  standalone: true,
  imports: [],
  templateUrl: './equity.component.html',
  styleUrl: './equity.component.scss'
})
export class EquityComponent {

  public get gmeShareValue(): number { return 30; }
  // public get assetsValue(): number { return }

}
