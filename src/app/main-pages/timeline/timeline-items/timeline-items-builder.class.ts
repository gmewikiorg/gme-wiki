import { GmePriceEntryFull, GmePriceEntrySimple } from "../../../shared/services/gme-price-entry.interface";
import { TimelineEventConfig } from "./timeline-item/timeline-event-config.interface";
import { TimelineEventOLD } from "./timeline-item/timeline-event.class";

export class TimelineItemsBuilder{
    public static getTimelineItems(configs :TimelineEventConfig[], gmeData: GmePriceEntrySimple[]): TimelineEventOLD[] {
        let allItemConfigs: TimelineEventConfig[] = [];
        allItemConfigs = configs.sort((item1, item2)=>{
            if(item1.dateYYYYMMDD < item2.dateYYYYMMDD){
                return -1;
            }else if(item1.dateYYYYMMDD > item2.dateYYYYMMDD){
                return 1;
            }else{
                return 0;
            }
        });
        let itemIndex: number = 0;
        const items = allItemConfigs.map(config => {
            const gmePriceEntry: GmePriceEntrySimple | undefined = gmeData.find(entry => entry.dateYYYYMMDD === config.dateYYYYMMDD);
            const event: TimelineEventOLD = new TimelineEventOLD(config, gmePriceEntry, itemIndex);
            itemIndex++;
            return event;
            
        });
        return items;
    }   
}