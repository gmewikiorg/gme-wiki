export type TimelineEventUrlType = 'YOUTUBE' | 'REDDIT' | 'LEMMY' | 'WIKIPEDIA' | 'X-TWITTER' | 'ARCHIVE' | 'NEWS' | 'DOCUMENT' | 'GAMESTOP' | 'OTHER';
export type TimelineEventViewType = 'CURRENT' | 'HISTORIC' | 'CURRENT_MOBILE' | 'HISTORIC_MOBILE';
export interface TimelineEventURL{
    url: string;
    type: TimelineEventUrlType;
    label: string;
    archiveLink?: string;
}
