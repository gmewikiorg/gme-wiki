import { TimelineEventType } from "../../../timeline-items/timeline-item/timeline-event-type.enum";


export interface CategoryButton{
    category: TimelineEventType | 'ALL',
    showActivated: boolean,
    hideActivated: boolean,
}