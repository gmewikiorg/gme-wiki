import { Component } from '@angular/core';
import { FooterComponent } from '../../../layout/footer/footer.component';
import { ScreenService } from '../../../shared/services/screen-size.service';

@Component({
  selector: 'app-nft-marketplace',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './nft-marketplace.component.html',
  styleUrl: './nft-marketplace.component.scss'
})
export class NftMarketplaceComponent {
constructor(private _screenService: ScreenService) {
    const title = "GameStop's NFT Marketplace | gmewiki.org";
    const description = 'From 2022 to 2024, GameStop operated a beta NFT marketplace which never left beta stage';
    const url = 'https://gmewiki.org/nft-marketplace';
    const image = '';
    this._screenService.setPageInfo(title, description, url, image);
  }
}
