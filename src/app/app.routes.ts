import { Routes } from '@angular/router';
import { TimelineComponent } from './main-pages/timeline/timeline.component';
import { OwnershipComponent } from './main-pages/ownership/ownership.component';
import { AboutComponent } from './main-pages/about/about.component';
import { SocialMediaComponent } from './main-pages/social-media/social-media.component';
import { FinancialsComponent } from './main-pages/financials/financials.component';
import { DrsComponent } from './info-pages/drs/drs.component';

export const routes: Routes = [
    { path: '*', component: TimelineComponent },
    { path: 'timeline', component: TimelineComponent },
    { path: 'ownership', component: OwnershipComponent},
    { path: 'earnings', component: FinancialsComponent},
    { path: 'financials', component: FinancialsComponent},
    { path: 'social-media', component: SocialMediaComponent},
    { path: 'about', component: AboutComponent },

    { path: 'drs', component: DrsComponent },

    


    { path: '**', redirectTo: 'timeline' }
];
