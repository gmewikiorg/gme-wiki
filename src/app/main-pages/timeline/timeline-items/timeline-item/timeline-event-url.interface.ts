export type urlType = 'YOUTUBE' | 'REDDIT' | 'LEMMY' | 'WIKIPEDIA' | 'X-TWITTER' | 'ARCHIVE' | 'NEWS' | 'DOCUMENT' | 'GAMESTOP' | 'OTHER';

export interface TimelineEventURL{
    url: string;
    type: urlType;
    label: string;
    archiveLink?: string;
}
