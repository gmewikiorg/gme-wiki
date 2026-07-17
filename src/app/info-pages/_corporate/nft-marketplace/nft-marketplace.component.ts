import { Component } from '@angular/core';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';
import { RouterLink } from "@angular/router";
import { InfoPage, InfoPageProperties } from '../../../shared/components/information-page.interface';

@Component({
  selector: 'app-nft-marketplace',
  standalone: true,
  imports: [FooterComponent, RouterLink],
  templateUrl: './nft-marketplace.component.html',
  styleUrl: './nft-marketplace.component.scss'
})
export class NftMarketplaceComponent implements InfoPage {

  infoPageProperties: InfoPageProperties = {
    title: "GameStop's NFT Marketplace | gmewiki.org",
    description: 'From 2022 to 2024, GameStop operated a beta NFT marketplace which never left beta stage',
    url: 'https://gmewiki.org/nft-marketplace',
    image: '',
    githubPageUrl: 'info-pages/_corporate/nft-marketplace/nft-marketplace.component.html',
  }

  constructor(private _screenService: ScreenService) {
    this._screenService.setPageInfo(this.infoPageProperties);
  }

}
