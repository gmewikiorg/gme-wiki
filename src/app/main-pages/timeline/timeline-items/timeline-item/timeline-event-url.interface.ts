export type TimelineEventUrlSrc = 
    'YOUTUBE' | 
    'REDDIT' | 
    'LEMMY' | 
    'WIKIPEDIA' | 
    'X-TWITTER' | 
    'ARCHIVE' | 
    'NEWS' | 
    'DOCUMENT' | 
    'GAMESTOP' | 
    'OTHER';

export type TimelineEventViewType = 
    'CURRENT' | 
    'CURRENT_MOBILE' | 
    'HISTORIC' | 
    'HISTORIC_MOBILE' | 
    'SNEEZE' | 
    'SNEEZE_MOBILE' | 
    '2_YEARS' | 
    '5_YEARS' | 
    'CUSTOM';


export interface TimelineEventURL{
    url: string;
    type: TimelineEventUrlSrc;
    label: string;
    archiveLink?: string;
}
