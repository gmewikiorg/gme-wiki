import { Component } from '@angular/core';

@Component({
  selector: 'app-competition',
  standalone: true,
  imports: [],
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.scss'
})
export class CompetitionComponent {


  private _measureProperty: 'REVENUE' | 'NET_INCOME' | 'EQUITY' = 'EQUITY';

  public getRadius(company: 'GAMESTOP' | 'WALMART' | 'AMAZON' | 'BESTBUY' | 'TARGET'): string{
    let radius = 1;


    if(company === 'GAMESTOP'){
      const revenue = 5.3;  
      const equity = 4.8;
      // circle area = pi * r * r
      // find r
      radius = Math.sqrt(revenue/Math.PI);
      radius = Math.sqrt(equity/Math.PI);
    }
    if(company === 'WALMART'){
      const revenue = 680;  
      const equity = 98;
      // circle area = pi * r * r
      // find r
      radius = Math.sqrt(revenue/Math.PI);
      radius = Math.sqrt(equity/Math.PI);
    }
    if(company === 'AMAZON'){
      const revenue = 637;  
      const equity = 285;
      // circle area = pi * r * r
      // find r
      radius = Math.sqrt(revenue/Math.PI);
      radius = Math.sqrt(equity/Math.PI);
    }
    if(company === 'BESTBUY'){
      const revenue = 43;  
      const equity = 3.1;
      // circle area = pi * r * r
      // find r
      radius = Math.sqrt(revenue/Math.PI);
      radius = Math.sqrt(equity/Math.PI);
    }
    if(company === 'TARGET'){
      const revenue = 25.6;  
      const equity = 13.4;
      // circle area = pi * r * r
      // find r
      radius = Math.sqrt(revenue/Math.PI);
      radius = Math.sqrt(equity/Math.PI);
    }

    radius = radius * 25;
    return radius + 'px';
  }
}
