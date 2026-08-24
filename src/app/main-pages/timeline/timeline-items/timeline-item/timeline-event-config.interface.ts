import { TimelineEventType } from "./timeline-event-type.enum";
import { TimelineEventURL, TimelineEventViewType } from "./timeline-event-url.interface";

export interface TimelineEventConfig {
    title: string,
    shortTitle: string,
    description: string,
    dateYYYYMMDD: string,
    significance: number,

    types: TimelineEventType[],
    showInViews: TimelineEventViewType[],

    urls?: TimelineEventURL[],
    imagePath?: string,
    tags?: string[],
}