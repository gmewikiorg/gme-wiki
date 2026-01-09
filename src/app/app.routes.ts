import { Routes } from '@angular/router';

import { StartPageComponent } from './main-pages/start-page/start-page.component';
import { TimelineComponent } from './main-pages/timeline/timeline.component';
import { FinancialsComponent } from './main-pages/financials/financials.component';
import { OwnershipComponent } from './main-pages/ownership/ownership.component';
import { SocialMediaComponent } from './main-pages/social-media/social-media.component';
import { AboutComponent } from './main-pages/about/about.component';

import { ATMsComponent } from './info-pages/_corporate/atms/atms.component';
import { BurpComponent } from './info-pages/_events/burp/burp.component';
import { CNBCVsNakedShortsComponent } from './info-pages/media/cnbc-on-naked-shorts/cnbc-on-naked-shorts.component';
import { ConflictComponent } from './info-pages/_concepts/conflict/conflict.component';
import { CompetitionComponent } from './info-pages/competition/competition.component';

import { DownfallEraComponent } from './info-pages/_events/downfall-era/downfall-era.component';
import { DrsComponent } from './info-pages/_concepts/drs/drs.component';
import { DrsFullTimelineComponent } from './info-pages/_concepts/drs/drs-full-timeline/drs-full-timeline.component';
import { DrsVsDsppComponent } from './info-pages/_concepts/drs/drs-vs-dspp/drs-vs-dspp.component';
import { FtdComponent } from './info-pages/_concepts/ftd/ftd.component';
import { FudComponent } from './info-pages/_concepts/fud/fud.component';
import { Fy23EarningsComponent } from './info-pages/_events/fy23-earnings/fy23-earnings.component';
import { Fy24EarningsComponent } from './info-pages/_events/fy24-earnings/fy24-earnings.component';
import { KeithGillComponent } from './info-pages/_people/keith-gill/keith-gill.component';
import { MediaOmitsDrsComponent } from './info-pages/_concepts/drs/media-omits-drs/media-omits-drs.component';

import { MoassComponent } from './info-pages/_concepts/moass/moass.component';
import { NakedShortSellingComponent } from './info-pages/_concepts/naked-short-selling/naked-short-selling.component';
import { RedditComponent } from './info-pages/reddit/reddit.component';
import { RyanCohenComponent } from './info-pages/_people/ryan-cohen/ryan-cohen.component';
import { RcInterview2022Component } from './info-pages/_people/ryan-cohen/rc-interview-2022/rc-interview-2022.component';
import { SneezeComponent } from './info-pages/_events/sneeze/sneeze.component';
import { SneezeVsSqueezeComponent } from './info-pages/_events/sneeze/sneeze-vs-squeeze/sneeze-vs-squeeze.component';
import { StoresComponent } from './info-pages/_corporate/stores/stores.component';
import { TPlusThirtyFiveComponent } from './info-pages/_concepts/t-plus-thirty-five/t-plus-thirty-five.component';
import { TradingCardsComponent } from './info-pages/_corporate/trading-cards/trading-cards.component';
import { TurnaroundComponent } from './info-pages/_corporate/turnaround/turnaround.component';
import { ShortInterestComponent } from './info-pages/_concepts/short-interest/short-interest.component';
import { BearCaseComponent } from './info-pages/_concepts/conflict/bear-case/bear-case.component';
import { BullCaseComponent } from './info-pages/_concepts/conflict/bull-case/bull-case.component';
import { InvestmentPolicyComponent } from './info-pages/_corporate/investment-policy/investment-policy.component';
import { CnbcVsGmeComponent } from './info-pages/media/cnbc-vs-gme/cnbc-vs-gme.component';
import { EquityComponent } from './info-pages/_corporate/equity/equity.component';
import { MediaVsGmeComponent } from './info-pages/media/media-vs-gme/media-vs-gme.component';
import { DirectoryComponent } from './info-pages/_gmewiki/directory/directory.component';
import { BbbyComponent } from './info-pages/_concepts/meme-stock/bbby/bbby.component';
import { TeddyComponent } from './info-pages/teddy/teddy.component';


import { MemeStockComponent } from './info-pages/_concepts/meme-stock/meme-stock.component';
import { MarketTacticsComponent } from './info-pages/_concepts//market-tactics/market-tactics.component';
import { SuperstonkComponent } from './info-pages/reddit/superstonk/superstonk.component';
import { MichaelBurryComponent } from './info-pages/_people/michael-burry/michael-burry.component';
import { BearFactionComponent } from './info-pages/_concepts/conflict/bear-faction/bear-faction.component';
import { BullFactionComponent } from './info-pages/_concepts/conflict/bull-faction/bull-faction.component';
import { ShortsNeverClosedComponent } from './info-pages/_concepts/shorts-never-closed/shorts-never-closed.component';
import { Fy25EarningsComponent } from './info-pages/_events/fy25-earnings/fy25-earnings.component';
import { ConvertibleNotesComponent } from './info-pages/_corporate/convertible-notes/convertible-notes.component';



export const routes: Routes = [


    // { path: '', component: StartPageComponent },
    { path: 'start', component: StartPageComponent },
    { path: 'timeline', component: TimelineComponent },
    { path: 'ownership', component: OwnershipComponent },
    { path: 'earnings', component: FinancialsComponent },
    { path: 'financials', component: FinancialsComponent },
    { path: 'social-media', component: SocialMediaComponent },
    { path: 'about', component: AboutComponent },


    /** Info pages / articles  */
    { path: 'atm', component: ATMsComponent },
    { path: 'atms', component: ATMsComponent },
    { path: '2021-atms', component: ATMsComponent },
    { path: '2024-atms', component: ATMsComponent },


    { path: 'bear-case', component: BearCaseComponent },
    { path: 'bear-faction', component: BearFactionComponent },
    { path: 'bull-case', component: BullCaseComponent },
    { path: 'bull-faction', component: BullFactionComponent },

    { path: 'burp', component: BurpComponent },
    { path: 'burp-may-2024', component: BurpComponent },

    { path: 'bbby', component: BbbyComponent },

    { path: 'conflict', component: ConflictComponent },
    { path: 'competition', component: CompetitionComponent },
    { path: 'convertible-notes', component: ConvertibleNotesComponent },


    { path: 'directory', component: DirectoryComponent },

    { path: 'downfall', component: DownfallEraComponent },
    { path: 'downfall-era', component: DownfallEraComponent },

    { path: 'drs', component: DrsComponent },
    { path: 'drs-timeline', component: DrsFullTimelineComponent },
    { path: 'drs-vs-dspp', component: DrsVsDsppComponent },

    { path: 'equity', component: EquityComponent },

    { path: 'fy23', component: Fy23EarningsComponent },
    { path: 'FY23', component: Fy23EarningsComponent },
    { path: 'fy23-earnings', component: Fy23EarningsComponent },

    { path: 'fy24', component: Fy24EarningsComponent },
    { path: 'FY24', component: Fy24EarningsComponent },
    { path: 'fy24-earnings', component: Fy24EarningsComponent },

    { path: 'fy25', component: Fy25EarningsComponent },
    { path: 'FY25', component: Fy25EarningsComponent },
    { path: 'fy25-earnings', component: Fy25EarningsComponent },

    { path: 'ftd', component: FtdComponent },
    { path: 'ftds', component: FtdComponent },
    { path: 'failure-to-deliver', component: FtdComponent },
    { path: 'fud', component: FudComponent },

    { path: 'investment-policy', component: InvestmentPolicyComponent },
    { path: 'bitcoin-policy', component: InvestmentPolicyComponent },

    { path: 'market-tactics', component: MarketTacticsComponent },

    { path: 'media-vs-gme', component: MediaVsGmeComponent },

    { path: 'media-omits-drs', component: MediaOmitsDrsComponent },


    { path: 'meme-stock', component: MemeStockComponent },
    { path: 'meme-stocks', component: MemeStockComponent },

    { path: 'moass', component: MoassComponent },

    { path: 'michael-burry', component: MichaelBurryComponent },

    { path: 'naked-short-selling', component: NakedShortSellingComponent },
    { path: 'naked-shorts-cnbc', component: CNBCVsNakedShortsComponent },
    { path: 'cnbc-naked-shorts', component: CNBCVsNakedShortsComponent },
    { path: 'cnbc-vs-gme', component: CnbcVsGmeComponent },
    { path: 'media-vs-naked-shorts', component: CNBCVsNakedShortsComponent },

    { path: 'rc-interview', component: RcInterview2022Component },
    { path: 'rc-interview-november-2022', component: RcInterview2022Component },
    { path: 'ryan-cohen', component: RyanCohenComponent },
    { path: 'rc', component: RyanCohenComponent },

    { path: 'reddit', component: RedditComponent },

    { path: 'DeepFuckingValue', component: KeithGillComponent },
    { path: 'dfv', component: KeithGillComponent },
    { path: 'keith-gill', component: KeithGillComponent },
    { path: 'roaring-kitty', component: KeithGillComponent },

    { path: 'short-interest', component: ShortInterestComponent },
    { path: 'shorts-never-closed', component: ShortsNeverClosedComponent },
    { path: 'sneeze', component: SneezeComponent },
    { path: 'squeeze', component: SneezeComponent },
    { path: 'sneeze-january-2021', component: SneezeComponent },
    { path: 'squeeze-january-2021', component: SneezeComponent },
    { path: 'sneeze-vs-squeeze', component: SneezeVsSqueezeComponent },

    { path: 'stores', component: StoresComponent },
    { path: 'superstonk', component: SuperstonkComponent },

    { path: 'teddy', component: TeddyComponent },

    { path: 'trading-cards', component: TradingCardsComponent },
    { path: 'turnaround', component: TurnaroundComponent },
    { path: 'transformation', component: TurnaroundComponent },

    { path: 't-plus-35', component: TPlusThirtyFiveComponent },
    { path: 't-plus-thirty-five', component: TPlusThirtyFiveComponent },


    {
        path: '**', // Wildcard to match any route
        redirectTo: '/start', // Redirects to the root path
        pathMatch: 'full', // Ensures the whole path matches 
    },
];
