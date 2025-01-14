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
    private _borderColor: string;
    private _significanceValue: number;
    private _metric: 'PRICE' | 'VOLUME' | 'EQUITY' | 'PTOB' | 'PTOS' | 'PTOE';

    public get timelineItems(): (TimelineEvent | null)[] { return this._timelineItems; }
    public get dataPoints(): (number | null)[] {
        return this._timelineItems.map((timelineItem) => {
            if (timelineItem !== null) {
                if (timelineItem.gmePriceEntry) {
                    const entry = timelineItem.gmePriceEntry;
                    const isPresplit: boolean = entry.dateYYYYMMDD < '2022-07-21';
                    if (this._metric === 'PRICE') {
                        return entry.close;
                    } else if (this._metric === 'VOLUME') {
                        return entry.volume;
                    } else if (this._metric === 'EQUITY') {
                        return entry.equity;
                    } else if (this._metric === 'PTOB') {
                        let ptob = (entry.close * entry.tso) / entry.equity
                        if(isPresplit){
                            ptob = ((entry.close*4) * entry.tso) / entry.equity
                        }
                        return ptob;
                    } else if (this._metric === 'PTOS') {
                        let ptos = (entry.close * entry.tso) / entry.trailingSales
                        if(isPresplit){
                            ptos = ((entry.close*4) * entry.tso) / entry.trailingSales
                        }
                        return ptos;
                    }
                    return entry.close;
                }
            }
            return null;
        })
    }
    public get label(): string { return this._label; }
    public get itemType(): TimelineEventType { return this._itemType; }
    public get color(): string { return this._color; }
    public get borderColor(): string { return this._borderColor; }
    public get significance(): number { return this._significanceValue; }


    constructor(timelineItems: (TimelineEvent | null)[], label: string, type: TimelineEventType, color: string, borderColor: string, significance: number, metric: 'PRICE' | 'VOLUME' | 'EQUITY' | 'PTOB' | 'PTOS' | 'PTOE') {
        this._timelineItems = timelineItems;
        this._label = label;
        this._itemType = type;
        this._color = color;
        this._borderColor = borderColor;
        this._significanceValue = significance;
        this._metric = metric;
    }

    public get eventCount(): number {
        return (this._timelineItems.filter(item => item !== null)).length;
    }

    public getIndexOfTimelineItem(checkItem: TimelineEvent): number {

        const foundIndex = this._timelineItems.findIndex(item => item?.itemIndex === checkItem.itemIndex);
        return foundIndex;
    }
}