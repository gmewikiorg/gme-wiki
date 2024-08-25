import { TimelineEventType } from "../timeline-items/timeline-item/timeline-event-type.enum";
import { TimelineEvent } from "../timeline-items/timeline-item/timeline-event.class";
/** This class is used to configure a dataset.  each significance value and event type value combination has its own dataset. 
 *  
*/
export class DatasetConfig {

    private _timelineItems: (TimelineEvent | null)[];
    private _label: string;
    private _itemType: TimelineEventType;
    private _color: string;
    private _significanceValue: number;

    public get timelineItems(): (TimelineEvent | null)[] { return this._timelineItems; }
    public get dataPoints(): (number | null)[] {
        return this._timelineItems.map((timelineItem) => {
            if (timelineItem !== null) {
                if (timelineItem.gmePriceEntry) {
                    return timelineItem.gmePriceEntry.close;
                }
            }
            return null;
        })
    }
    public get label(): string { return this._label; }
    public get itemType(): TimelineEventType { return this._itemType; }
    public get color(): string { return this._color; }
    public get significance(): number { return this._significanceValue; }


    constructor(timelineItems: (TimelineEvent | null)[], label: string, type: TimelineEventType, color: string, significance: number) {
        this._timelineItems = timelineItems;
        this._label = label;
        this._itemType = type;
        this._color = color;
        this._significanceValue = significance;
    }

    public get eventCount(): number {
        return (this._timelineItems.filter(item => item !== null)).length;
    }

    public getIndexOfTimelineItem(checkItem: TimelineEvent): number {

        const foundIndex = this._timelineItems.findIndex(item => item?.itemIndex === checkItem.itemIndex);
        return foundIndex;
    }
}