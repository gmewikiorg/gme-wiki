import { TimelineEvent } from "../timeline-items/timeline-item/timeline-event.class";
import { TimelineEventType } from "../timeline-items/timeline-item/timeline-event-type.enum";
import { GmePriceEntry } from "../../../shared/services/gme-price-entry.interface";
import dayjs from "dayjs";

export class ChartDataItem {

    /** the chart ultimately just maps single values (Number), e.g. GME close price
     *  the X axis is time, with space evenly divided per item.  if each item represents an appropriately spaced date, then it is to scale.
     * 
     *  this class is to manage the data (GME price values, events) as items associated with dates to be usable for the chart.
     * 
     */
    constructor(dateYYYYMMDD: string, gmePriceEntries: GmePriceEntry[], events: TimelineEvent[], highestGmeHighValue?: number, finalClose?: number) {
        this._dateYYYYMMDD = dateYYYYMMDD;
        this._gmePriceEntries = gmePriceEntries;
        this._events = events;
        if (highestGmeHighValue !== undefined) {
            this._highPriceValue = highestGmeHighValue;
        }
        if (finalClose !== undefined) {
            this._finalClose = finalClose;
        }
        if(this._gmePriceEntries.length > 0){
            const finalItem = this._gmePriceEntries[this._gmePriceEntries.length-1];
            this._finalClose = finalItem.close;
            this._tso = finalItem.tso;
            this._trailingSales = finalItem.trailingSales;
            this._equity = finalItem.equity;
            this._pToS = (finalItem.close * finalItem.tso) / finalItem.trailingSales;
            this._pToB = (finalItem.close * finalItem.tso) / finalItem.equity;
            if(finalItem.dateYYYYMMDD < '2022-07-21'){
                this._pToS = ((finalItem.close*4) * finalItem.tso) / finalItem.trailingSales;
                this._pToB = ((finalItem.close*4) * finalItem.tso) / finalItem.equity;
            }
            this._volume = finalItem.volume;
        }
    }

    private _dateYYYYMMDD: string;
    private _gmePriceEntries: GmePriceEntry[];
    private _events: TimelineEvent[];
    private _highPriceValue: number = -1;
    private _finalClose: number = -1;
    private _tso: number = -1;
    private _trailingSales: number = -1;
    private _equity: number = 1;
    private _pToB: number = 0;
    private _pToS: number = 0;
    private _volume: number = 0;

    public get date(): dayjs.Dayjs { return dayjs(this._dateYYYYMMDD); }
    public get dateYYYYMMDD(): string { return this._dateYYYYMMDD; }
    public get gmePriceEntries(): GmePriceEntry[] { return this._gmePriceEntries; }
    public get events(): TimelineEvent[] { return this._events; }
    public get highPriceValue(): number { return this._highPriceValue; }
    public get finalClose(): number { return this._finalClose; }
    public get tso(): number { return this._tso; }
    public get trailingSales(): number { return this._trailingSales; }
    public get equity(): number { return this._equity; }
    public get pToB(): number { return this._pToB; }
    public get pToS(): number { return this._pToS; }
    public get volume(): number { return this._volume; } 

    public getPriorityEvent(allSignificances: number[], currentCategoriesValue: TimelineEventType[]): {
        event: TimelineEvent | null,
        type: TimelineEventType,
        significance: number
    } {
        let filteredEvents = this.events.filter(event => {
            const isSignificantEnough: boolean = allSignificances.includes(event.significance);
            let hasCategory: boolean = false;
            event.types.forEach(type => {
                if (currentCategoriesValue.includes(type)) {
                    hasCategory = true;
                }
            });
            return isSignificantEnough && hasCategory;
        });
        if (filteredEvents.length === 0) {
            return {
                event: null,
                type: TimelineEventType.OTHER,
                significance: 0
            };
        } else if (filteredEvents.length === 1) {
            const foundEvent = filteredEvents[0];
            const foundPriorityType = this._getPriorityType(foundEvent, currentCategoriesValue);
            return {
                event: foundEvent,
                type: foundPriorityType,
                significance: foundEvent.significance,
            };
        } else {
            // more than 1 event;
            const priorityEvent = this._getHigherPriorityEvent(filteredEvents, currentCategoriesValue);
            const foundPriorityType = this._getPriorityType(priorityEvent, currentCategoriesValue);
            return {
                event: priorityEvent,
                type: foundPriorityType,
                significance: priorityEvent.significance
            };
        }
    }


    public get priorityTypes(): TimelineEventType[] {
        return [TimelineEventType.DRS,
        TimelineEventType.CORP,
        TimelineEventType.RC,
        TimelineEventType.MEDIA,
        TimelineEventType.SOCIAL_MEDIA,
        TimelineEventType.OTHER];
    }

    private _getPriorityType(event: TimelineEvent, currentCategoriesValue: TimelineEventType[]): TimelineEventType{
        let foundPriorityType: TimelineEventType = event.mainType;
        if (!currentCategoriesValue.includes(foundPriorityType)) {
            let availableTypes = this.priorityTypes.filter(type => currentCategoriesValue.includes(type));
            for (let i = 0; i < availableTypes.length; i++) {
                if (event.types.includes(availableTypes[i])) {
                    foundPriorityType = availableTypes[i];
                    i = availableTypes.length + 1;
                }
            }
        }
        return foundPriorityType;
    }
    private _getPriorityTypeIndex(event: TimelineEvent, currentCategoriesValue: TimelineEventType[]): number{
        const index = this.priorityTypes.indexOf(this._getPriorityType(event, currentCategoriesValue));
        return index;
    }

    private _getHigherPriorityEvent(events: TimelineEvent[], currentCategoriesValue: TimelineEventType[]): TimelineEvent{
        let prioritizedEvents = events.sort((event1, event2)=>{
            let priorityType1index = this._getPriorityTypeIndex(event1, currentCategoriesValue);
            let priorityType2index = this._getPriorityTypeIndex(event2, currentCategoriesValue);
            if(event1.significance > event2.significance){
                return -1;
            }else if(event1.significance < event2.significance){
                return 1;
            }else{
                // same significance value
                if(priorityType1index < priorityType2index){
                    return -1;
                }else if(priorityType1index > priorityType2index){
                    return 1;
                }else{
                    return 0;
                }
            }
        });
        return prioritizedEvents[0];
    }

}