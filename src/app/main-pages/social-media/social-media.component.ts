import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-social-media',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.scss'
})
export class SocialMediaComponent {
  constructor(private meta: Meta, private titleService: Title){
    this.titleService.setTitle('Social Media for GME Shareholders');
    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: 'Social Media for GME Shareholders' },
      { name: 'keywords', content: 'GameStop, GME, social media, X, Twitter, Reddit, fediverse, Spaces, YouTube, Roaring Kitty, DRS, Discord, X Spaces, federated apps, Lemmy, subreddits, superstonk, teddy, bluesky, github' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: 'gmewiki.org - Social Media for GME Shareholders' },
      { property: 'og:description', content: 'Links on X, Reddit, Discord, BlueSky, Github' },
      { property: 'og:url', content: 'https://gmewiki.org/social-media' },
      { property: 'og:type', content: 'website' },
    ]);
  }
  // apple-podcasts-icon.png

  private _xSpacesAccounts: string[] = [
    'peruvian_bull',
    // 'Badmojo6969',
    // 'magsonthemoon',
    // 'seymourbutts741',
    // 'squeezistChrist',
    'mikeal_man',
  ].sort(() => Math.random() - 0.5);

  public get xSpacesAccounts(): string[]{
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
