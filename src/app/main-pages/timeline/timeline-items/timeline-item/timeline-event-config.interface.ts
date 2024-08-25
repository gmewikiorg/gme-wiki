import { TimelineEventType } from "./timeline-event-type.enum";
import { TimelineEventURL } from "./timeline-event-url.interface";

export interface TimelineEventConfig{
    title: string;
    dateYYYYMMDD: string;
    urls: TimelineEventURL[]; 
    description: string;
    types: TimelineEventType[];
    significance: number;
    imgSrc?: string;
    specialIdentifier?: string;
    tags: string[];
    localArticle?: TimelineEventURL | null;
    expandedUrls: TimelineEventURL[];
}