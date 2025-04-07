import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScreenService } from '../../shared/services/screen-size.service';

@Component({
  selector: 'app-social-media',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.scss'
})
export class SocialMediaComponent {
  constructor(private _screenService: ScreenService) {
    const title = 'Social Media for GME Shareholders | gmewiki.org';
    const description = 'Directory of places for GME shareholders on X, Reddit, Discord, BlueSky, Github'
    const url = 'https://gmewiki.org/social-media';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }
  // apple-podcasts-icon.png

  private _xSpacesAccounts: string[] = [
    // 'peruvian_bull',
    // 'Badmojo6969',
    // 'magsonthemoon',
    // 'seymourbutts741',
    // 'squeezistChrist',
    'mikeal_man',
  ].sort(() => Math.random() - 0.5);

  public get xSpacesAccounts(): string[] {
    return this._xSpacesAccounts;
  }


}


/**
 * 
 * function shuffleArray(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
}

const names = ["Alice", "Bob", "Charlie", "David", "Eve"];
const shuffledNames = shuffleArray(names);

console.log(shuffledNames);

 */
