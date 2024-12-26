import { Routes } from '@angular/router';


import { TimelineComponent } from './main-pages/timeline/timeline.component';
import { OwnershipComponent } from './main-pages/ownership/ownership.component';
import { AboutComponent } from './main-pages/about/about.component';
import { SocialMediaComponent } from './main-pages/social-media/social-media.component';
import { FinancialsComponent } from './main-pages/financials/financials.component';


import { DrsComponent } from './info-pages/drs/drs.component';
import { Fy23ProfitabilityComponent } from './info-pages/fy23-profitability/fy23-profitability.component';
import { Atms2024Component } from './info-pages/atms-2024/atms-2024.component';
import { DrsFullTimelineComponent } from './info-pages/drs/drs-full-timeline/drs-full-timeline.component';
import { SummaryGuideComponent } from './info-pages/summary-guide/summary-guide.component';
import { MediaComponent } from './info-pages/media/media.component';
import { MoassComponent } from './info-pages/moass/moass.component';
import { RcInterview2022Component } from './info-pages/rc-interview-2022/rc-interview-2022.component';
import { RedditComponent } from './info-pages/reddit/reddit.component';
import { RoaringKittyComponent } from './info-pages/roaring-kitty/roaring-kitty.component';
import { SneezeComponent } from './info-pages/sneeze/sneeze.component';
import { TurnaroundComponent } from './info-pages/turnaround/turnaround.component';
import { NakedShortSellingComponent } from './info-pages/naked-short-selling/naked-short-selling.component';
import { MediaVsNakedShortsComponent } from './info-pages/media-vs-naked-shorts/media-vs-naked-shorts.component';
import { FudComponent } from './info-pages/fud/fud.component';
import { DrsVsDsppComponent } from './info-pages/drs/drs-vs-dspp/drs-vs-dspp.component';



export const routes: Routes = [


    { path: '*', component: TimelineComponent },
    { path: 'timeline', component: TimelineComponent },
    { path: 'ownership', component: OwnershipComponent },
    { path: 'earnings', component: FinancialsComponent },
    { path: 'financials', component: FinancialsComponent },
    { path: 'social-media', component: SocialMediaComponent },
    { path: 'about', component: AboutComponent },


    /** Info pages / articles  */
    { path: '2024-atms', component: Atms2024Component },

    { path: 'drs', component: DrsComponent },
    { path: 'drs-timeline', component: DrsFullTimelineComponent },
    { path: 'drs-vs-dspp', component: DrsVsDsppComponent },
    
    { path: 'fy23-profitability', component: Fy23ProfitabilityComponent },
    { path: 'fud', component: FudComponent },

    { path: 'guide', component: SummaryGuideComponent },

    { path: 'media', component: MediaComponent },
    { path: 'propaganda', component: MediaComponent },
    { path: 'media-vs-naked-shorts', component: MediaVsNakedShortsComponent },
    
    { path: 'moass', component: MoassComponent },

    { path: 'naked-short-selling', component: NakedShortSellingComponent },


    { path: 'rc-interview', component: RcInterview2022Component },
    { path: 'rc-interview-november-2022', component: RcInterview2022Component },
    { path: 'reddit', component: RedditComponent },
    
    { path: 'DeepFuckingValue', component: RoaringKittyComponent },
    { path: 'dfv', component: RoaringKittyComponent },
    { path: 'keith-gill', component: RoaringKittyComponent },
    { path: 'roaring-kitty', component: RoaringKittyComponent },

    { path: 'sneeze', component: SneezeComponent },
    { path: 'sneeze-january-2021', component: SneezeComponent },

    { path: 'turnaround', component: TurnaroundComponent },



    { path: '**', redirectTo: 'timeline' }
];
