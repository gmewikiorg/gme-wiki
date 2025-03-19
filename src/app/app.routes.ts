import { Routes } from '@angular/router';

import { StartPageComponent } from './main-pages/start-page/start-page.component';
import { TimelineComponent } from './main-pages/timeline/timeline.component';
import { FinancialsComponent } from './main-pages/financials/financials.component';
import { OwnershipComponent } from './main-pages/ownership/ownership.component';
import { SocialMediaComponent } from './main-pages/social-media/social-media.component';
import { AboutComponent } from './main-pages/about/about.component';

import { ATMsComponent } from './info-pages/atms/atms.component';
import { BurpComponent } from './info-pages/burp/burp.component';
import { CNBCVsNakedShortsComponent } from './info-pages/cnbc-on-naked-shorts/cnbc-on-naked-shorts.component';
import { ConflictComponent } from './info-pages/conflict/conflict.component';
import { CompetitionComponent } from './info-pages/competition/competition.component';

import { DownfallEraComponent } from './info-pages/downfall-era/downfall-era.component';
import { DrsComponent } from './info-pages/drs/drs.component';
import { DrsFullTimelineComponent } from './info-pages/drs/drs-full-timeline/drs-full-timeline.component';
import { DrsVsDsppComponent } from './info-pages/drs/drs-vs-dspp/drs-vs-dspp.component';
import { FaqComponent } from './info-pages/faq/faq.component';
import { FtdComponent } from './info-pages/ftd/ftd.component';
import { FudComponent } from './info-pages/fud/fud.component';
import { Fy23EarningsComponent } from './info-pages/fy23-earnings/fy23-earnings.component';
import { Fy24EarningsComponent } from './info-pages/fy24-earnings/fy24-earnings.component';
import { InvestorsComponent } from './info-pages/investors/investors.component';
import { KeithGillComponent } from './info-pages/keith-gill/keith-gill.component';
import { MediaComponent } from './info-pages/media/media.component';
import { MediaOmitsDrsComponent } from './info-pages/media-omits-drs/media-omits-drs.component';

import { MoassComponent } from './info-pages/moass/moass.component';
import { NakedShortSellingComponent } from './info-pages/naked-short-selling/naked-short-selling.component';
import { RedditComponent } from './info-pages/reddit/reddit.component';
import { RyanCohenComponent } from './info-pages/ryan-cohen/ryan-cohen.component';
import { RcInterview2022Component } from './info-pages/rc-interview-2022/rc-interview-2022.component';
import { SneezeComponent } from './info-pages/sneeze/sneeze.component';
import { SneezeVsSqueezeComponent } from './info-pages/sneeze/sneeze-vs-squeeze/sneeze-vs-squeeze.component';
import { StoresComponent } from './info-pages/stores/stores.component';
import { TPlusThirtyFiveComponent } from './info-pages/t-plus-thirty-five/t-plus-thirty-five.component';
import { TradingCardsComponent } from './info-pages/trading-cards/trading-cards.component';
import { TurnaroundComponent } from './info-pages/turnaround/turnaround.component';
import { ShortInterestComponent } from './info-pages/short-interest/short-interest.component';
import { BearCaseComponent } from './info-pages/bear-case/bear-case.component';
import { BullCaseComponent } from './info-pages/bull-case/bull-case.component';



export const routes: Routes = [


    // { path: '', component: StartPageComponent },
    { path: 'start', component: StartPageComponent},
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
    { path: 'bull-case', component: BullCaseComponent },

    { path: 'burp', component: BurpComponent },
    { path: 'burp-may-2024', component: BurpComponent },

    { path: 'cnbc-naked-shorts', component: CNBCVsNakedShortsComponent },
    { path: 'conflict', component: ConflictComponent },
    { path: 'competition', component: CompetitionComponent },
    

    { path: 'downfall', component: DownfallEraComponent },
    { path: 'downfall-era', component: DownfallEraComponent },

    { path: 'drs', component: DrsComponent },
    { path: 'drs-timeline', component: DrsFullTimelineComponent },
    { path: 'drs-vs-dspp', component: DrsVsDsppComponent },

    { path: 'faq', component: FaqComponent },

    { path: 'fy23', component: Fy23EarningsComponent },
    { path: 'FY23', component: Fy23EarningsComponent },
    { path: 'fy23-earnings', component: Fy23EarningsComponent },
    { path: 'fy23-profitability', component: Fy23EarningsComponent },
    
    { path: 'fy24', component: Fy24EarningsComponent },
    { path: 'FY24', component: Fy24EarningsComponent },
    { path: 'fy24-earnings', component: Fy24EarningsComponent },
    { path: 'fy24-profitability', component: Fy24EarningsComponent },
    
    { path: 'ftd', component: FtdComponent },
    { path: 'ftds', component: FtdComponent },
    { path: 'failure-to-deliver', component: FtdComponent },
    { path: 'fud', component: FudComponent },

    { path: 'investors', component: InvestorsComponent },

    { path: 'media', component: MediaComponent },
    { path: 'media-vs-naked-shorts', component: CNBCVsNakedShortsComponent },
    { path: 'media-omits-drs', component: MediaOmitsDrsComponent },
    { path: 'propaganda', component: MediaComponent },

    { path: 'moass', component: MoassComponent },

    { path: 'naked-short-selling', component: NakedShortSellingComponent },

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
    { path: 'sneeze', component: SneezeComponent },
    { path: 'squeeze', component: SneezeComponent },
    { path: 'sneeze-january-2021', component: SneezeComponent },
    { path: 'squeeze-january-2021', component: SneezeComponent },
    { path: 'sneeze-vs-squeeze', component: SneezeVsSqueezeComponent },

    { path: 'stores', component: StoresComponent },

    { path: 'trading-cards', component: TradingCardsComponent },
    { path: 'turnaround', component: TurnaroundComponent },

    { path: 't-plus-35', component: TPlusThirtyFiveComponent },
    { path: 't-plus-thirty-five', component: TPlusThirtyFiveComponent },


    {
        path: '**', // Wildcard to match any route
        redirectTo: '/start', // Redirects to the root path
        pathMatch: 'full', // Ensures the whole path matches 
    },
];
