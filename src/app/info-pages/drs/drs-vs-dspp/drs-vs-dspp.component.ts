import { Component } from '@angular/core';
import { OwnershipData } from '../../../main-pages/ownership/ownership-data.class';

@Component({
  selector: 'app-drs-vs-dspp',
  standalone: true,
  imports: [],
  templateUrl: './drs-vs-dspp.component.html',
  styleUrl: './drs-vs-dspp.component.scss'
})
export class DrsVsDsppComponent {

    private _recentDrsUpdate = new OwnershipData();
    public get recentDrsUpdate(): OwnershipData { return this._recentDrsUpdate; }

}
