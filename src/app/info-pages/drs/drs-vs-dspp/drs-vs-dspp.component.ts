import { Component } from '@angular/core';
import { OwnershipData } from '../../../main-pages/ownership/ownership-data/ownership-data.class';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-drs-vs-dspp',
  standalone: true,
  imports: [],
  templateUrl: './drs-vs-dspp.component.html',
  styleUrl: './drs-vs-dspp.component.scss'
})
export class DrsVsDsppComponent {

  constructor(private meta: Meta,
    private titleService: Title,) {
    this.titleService.setTitle('DRS vs DSPP | gmewiki.org')
    const metaTags = this.meta.getTags('name');
    metaTags.forEach(tag => this.meta.removeTagElement(tag));
    this.meta.addTags([
      { name: 'description', content: "DRS vs DSPP: an explanation of the differences between directly registered shares (DRS / Direct Registration System) and shares held with Computershare's plan service, referred to as DSPP / Direct Stock Purchase Plan" },
      { name: 'keywords', content: 'GameStop, GME, DRS, DRS GME, DRSGME, Direct Registration System, DSPP, Computershare, transfer agent, DRSyourGME' },
      { name: 'author', content: 'GME shareholder' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { charset: 'UTF-8' }
    ]);
    this.meta.addTags([
      { property: 'og:title', content: 'DRS vs DSPP | gmewiki.org' },
      { property: 'og:description', content: "DRS vs DSPP: an explanation of the differences between directly registered shares (DRS / Direct Registration System) and shares held with Computershare's plan service, referred to as DSPP / Direct Stock Purchase Plan" },
      { property: 'og:url', content: 'https://gmewiki.org/drs-vs-dspp' },
      { property: 'og:type', content: 'website' },
    ]);
  }

  private _recentDrsUpdate = new OwnershipData();
  public get recentDrsUpdate(): OwnershipData { return this._recentDrsUpdate; }

}
