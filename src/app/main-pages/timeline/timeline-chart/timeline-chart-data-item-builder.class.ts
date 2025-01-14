import { ChartDataItem } from "./timeline-chart-data-item.class";
import { TimelineEventType } from "../timeline-items/timeline-item/timeline-event-type.enum";
import { TimelineEvent } from "../timeline-items/timeline-item/timeline-event.class";
import { DatasetConfig } from "./timeline-chart-dataset-config.class";
import { ChartDataset, ScatterDataPoint } from "chart.js";
import { GmePriceEntry } from "../../../shared/services/gme-price-entry.interface";
import dayjs from "dayjs";

/** This class has static methods to be used by chart-dataset-manager.classs.ts */
export class ChartDataItemBuilder {

    public static get maxChartItems(): number { return 5000; }

    public static buildChartDataItems(
        startDateYYYYMMDD: string,
        endDateYYYYMMDD: string,
        metric: 'PRICE' | 'VOLUME' | 'EQUITY' | 'PTOB' | 'PTOS' | 'PTOE',
        period: '2_YEARS' | '5_YEARS' | 'CURRENT' | 'HISTORIC' | 'CUSTOM',
        gmePriceEntries: GmePriceEntry[],
        timelineEvents: TimelineEvent[],
        currentSignificanceValue: number,
        currentCategoriesValue: TimelineEventType[],
        isDarkMode: boolean): {
            datasets: ChartDataset<"line", (number | ScatterDataPoint | null)[]>[],
            datasetConfigs: DatasetConfig[],
            labels: string[]
        } {
        /**
         * Build one ChartDataItem per day for each day from start date to end date
         */

        // console.log("*** buildChartDataItems()", startDateYYYYMMDD, endDateYYYYMMDD, gmePriceEntries, timelineEvents, currentCategoriesValue, currentCategoriesValue)
        // console.log("*** gmePriceEntries", gmePriceEntries)

        const items: ChartDataItem[] = [];
        const foundStartIndex = gmePriceEntries.findIndex(item => item.dateYYYYMMDD === startDateYYYYMMDD);
        let foundEndIndex = gmePriceEntries.findIndex(item => item.dateYYYYMMDD === endDateYYYYMMDD);
        if (foundEndIndex === -1) {
            foundEndIndex = gmePriceEntries.length - 1;
        }
        if (foundStartIndex > -1) {
            for (let i = foundStartIndex; i <= foundEndIndex; i++) {
                const timelineEventsForDate = timelineEvents.filter(item => item.dateYYYYMMDD === gmePriceEntries[i].dateYYYYMMDD);
                const chartDataItem: ChartDataItem = new ChartDataItem(gmePriceEntries[i].dateYYYYMMDD, [gmePriceEntries[i]], timelineEventsForDate);
                items.push(chartDataItem);
            }
        } else {
            // console.log("Could not find GME Price Entry")
        }
        // console.log("** Items " , items)
        /**
         *  Of all those ChartDataItems created, condense them into a new array of ChartDataItems, of reduced size, 
         *  with respect to this.maxChartItems
         */
        let condensedItems: ChartDataItem[] = [];
        if (items.length > this.maxChartItems) {
            let reduceByFactor = items.length / this.maxChartItems;
            if (reduceByFactor >= 2) {
                reduceByFactor = Math.round(reduceByFactor);
                condensedItems = this._condenseItems(items, reduceByFactor);
            } else {
                condensedItems = items;
            }
        } else {
            condensedItems = items;
        }

        // console.log("CONDENSED ITEMS", condensedItems)



        const closePrices: number[] = [];
        const chartLabels: string[] = [];
        condensedItems
            .filter(entry => entry.date.format('YYYY-MM-DD') >= startDateYYYYMMDD && entry.date.format('YYYY-MM-DD') <= endDateYYYYMMDD)
            .forEach(condensedItem => {
                if (metric === 'PRICE') {
                    closePrices.push(condensedItem.finalClose);
                } else if (metric === 'VOLUME') {
                    closePrices.push(condensedItem.volume);
                } else if (metric === 'EQUITY') {
                    closePrices.push(condensedItem.equity);
                } else if (metric === 'PTOB') {
                    closePrices.push(condensedItem.pToB);
                } else if (metric === 'PTOS') {
                    closePrices.push(condensedItem.pToS);
                } else if (metric === 'PTOE') {
                    closePrices.push(condensedItem.pToE);
                }
                if (period === 'CURRENT') {
                    chartLabels.push(dayjs(condensedItem.dateYYYYMMDD).format('MMM YYYY'));
                } else if (period === 'HISTORIC') {
                    chartLabels.push(dayjs(condensedItem.dateYYYYMMDD).format('YYYY'));
                } else {
                    chartLabels.push(dayjs(condensedItem.dateYYYYMMDD).format('MMM YYYY'));
                }

            });

        const datasets: ChartDataset<"line", (number | ScatterDataPoint | null)[]>[] = [];

        let gmeBorderColor = 'green';
        let gmeBackgroundColor = 'rgba(0,255,0,0.075)';
        let pointHoverBorderColor = 'black';
        if (isDarkMode) {
            gmeBorderColor = 'rgba(0, 255, 0, 0.6)';
            gmeBackgroundColor = 'rgba(0, 255, 0, 0.05)';
            pointHoverBorderColor = 'white';
        }



        datasets.push({
            data: closePrices,
            label: 'GME price $ ',
            fill: true,
            tension: 0.5,
            borderColor: gmeBorderColor,
            backgroundColor: gmeBackgroundColor,
            borderWidth: 1.3,
            pointRadius: 0,
            pointHitRadius: 0,
            pointHoverRadius: 0,
        });

        let datasetConfigs = this._getDatasetConfigs(metric, currentSignificanceValue, currentCategoriesValue, condensedItems);
        if (period === 'CURRENT') {
            if (true) {
                datasetConfigs.forEach(datasetConfig => {
                    datasets.push({
                        data: datasetConfig.dataPoints,
                        label: datasetConfig.label,
                        fill: true,
                        tension: 0.5,

                        pointBackgroundColor: datasetConfig.color,
                        pointBorderColor: datasetConfig.color,
                        pointBorderWidth: 3,

                        pointHoverBorderColor: datasetConfig.borderColor,
                        pointHoverBackgroundColor: datasetConfig.borderColor,
                        pointHoverBorderWidth: 5,


                        pointRadius: this._getPointRadius(datasetConfig.significance),
                        pointHitRadius: this._getPointHitRadius(datasetConfig.significance),
                        pointHoverRadius: 5 + (4 * datasetConfig.significance),
                        pointStyle: 'circle',
                    })
                });
            }
        }


        if (period === 'CURRENT') {
            /** change every second label to "" value */
            // for (let i = 1; i < chartLabels.length; i++) {
            //     chartLabels[i] = "";
            //     i++
            // }
        } else if (period === 'HISTORIC') {
            /**
             * In this case we only add the first instance of each year, so that the year label is shown where the first occurrence of that year happens, 
             * and not some automatically chosen spot.
             * 
             * in the chart settings, scales.x.ticks.autoskip must be false in this case.
             */
            let years:string[] = [];
            for (let i = 0; i < chartLabels.length; i++) {
                if (!years.includes(chartLabels[i])) {
                    if(chartLabels[i] !== '2002'){
                        years.push(chartLabels[i]);
                    }else{
                        chartLabels[i] = "";
                    }
                } else {
                    chartLabels[i] = "";
                }
            }
        }

        const returnValue = {
            datasets: datasets,
            datasetConfigs: datasetConfigs,
            labels: chartLabels,
        }
        // console.log("RETURN VALUE: " , returnValue)
        return returnValue;
    }

    /** if there are more items than maxChartItems, then condense them so that they are reduced to approximately that maxChartItems value */
    private static _condenseItems(items: ChartDataItem[], reduceByFactor: number): ChartDataItem[] {
        const finalItemCount = Math.floor(items.length / reduceByFactor);
        const includedItemsCount = finalItemCount * reduceByFactor;
        const startIndex = (items.length - includedItemsCount);
        const condensedItems: ChartDataItem[] = [];
        let itemCount = 0;
        let itemsToMerge: ChartDataItem[] = [];
        for (let currentItemIndex = startIndex; currentItemIndex < items.length; currentItemIndex++) {
            itemsToMerge.push(items[currentItemIndex]);
            itemCount++;
            if (itemCount === reduceByFactor) {
                itemCount = 0;
                const mergedItem = this._buildCondensedItem(itemsToMerge);
                condensedItems.push(mergedItem);
                itemsToMerge = [];
            }
        }
        return condensedItems;
    }

    /** Take multiple ChartDataItems and merge them into 1 */
    private static _buildCondensedItem(itemsToMerge: ChartDataItem[]): ChartDataItem {
        let highestGmeHighValue: number = 0;
        itemsToMerge.forEach(item => {
            item.gmePriceEntries.forEach(priceEntry => {
                if (priceEntry.high > highestGmeHighValue) {
                    highestGmeHighValue = priceEntry.high;
                }
            });
        });
        const finalItem = itemsToMerge[itemsToMerge.length - 1];
        const priceEntries = itemsToMerge.flatMap(item => item.gmePriceEntries);
        const timelineEvents = itemsToMerge.flatMap(item => item.events);
        const finalClose = priceEntries[priceEntries.length - 1].close;
        const chartDataItem: ChartDataItem = new ChartDataItem(finalItem.dateYYYYMMDD, priceEntries, timelineEvents, highestGmeHighValue, finalClose);
        return chartDataItem;
    }

    /**
     * Build each datapoint configuration, a unique set based on significance + type combination.
     */
    private static _getDatasetConfigs(
        metric: 'PRICE' | 'VOLUME' | 'EQUITY' | 'PTOB' | 'PTOS' | 'PTOE',
        currentSignificanceValue: number,
        currentCategoriesValue: TimelineEventType[],
        condensedItems: ChartDataItem[]): DatasetConfig[] {
        const datapointSets: {
            type: TimelineEventType,
            significance: number,
            datapoints: (TimelineEvent | null)[]
        }[] = [];
        const allSignificances: number[] = this._getSignificances(currentSignificanceValue);
        currentCategoriesValue.forEach(eventType => {
            allSignificances.forEach(significanceValue => {
                const datapointSet = {
                    type: eventType,
                    significance: significanceValue,
                    datapoints: [],
                }
                datapointSets.push(datapointSet);
            });
        });
        /** 
         * for each 1 condensed Item, update ALL datapointSet.datapoints values  
         * every value should be null except for the cases where the priority event matches the set type and significance value
         * 
        */
        condensedItems.forEach(condensedItem => {
            const priorityEvent = condensedItem.getPriorityEvent(allSignificances, currentCategoriesValue);
            // console.log("Priority Event, ", priorityEvent)
            datapointSets.forEach(datapointSet => {
                if (priorityEvent.event === null) {
                    datapointSet.datapoints.push(null);
                } else {
                    const isMatch: boolean = datapointSet.significance === priorityEvent.significance && datapointSet.type === priorityEvent.type;
                    if (isMatch) {
                        datapointSet.datapoints.push(priorityEvent.event);
                        // console.log("pushing event", priorityEvent.event)
                    } else {
                        datapointSet.datapoints.push(null);
                    }
                }
            });
        });
        /**
         * for each datapointSet, if there are any sets with purely null values and no events, remove that set
         */
        let setIndex = 0;
        // console.log("DATAPOINT SETS:", datapointSets)
        while (setIndex < datapointSets.length) {
            const datapoints = datapointSets[setIndex].datapoints;
            let foundEventIndex: number = datapoints.findIndex(dataPoint => dataPoint !== null);
            if (foundEventIndex === -1) {
                // console.log("NO EVENTS")
                datapointSets.splice(setIndex, 1);
                setIndex--;
            } else {
            }
            setIndex++;
        }
        const configs = datapointSets.map(set => {
            return new DatasetConfig(set.datapoints, set.type, set.type, this.getTypeColor(set.type, 0.5), this.getTypeColor(set.type), set.significance, metric);
        });
        return configs
    }

    public static getTypeColor(type: TimelineEventType, transparency?: number): string {
        if (!transparency) {
            transparency = 0.8;
        }
        if (type === TimelineEventType.CORP) {
            return 'rgba(128,0,0,' + String(transparency) + ')';
        } else if (type === TimelineEventType.MEDIA) {
            return 'rgba(230,110,0,' + String(transparency) + ')';
        } else if (type === TimelineEventType.RC) {
            return 'rgba(0,0,255,' + String(transparency) + ')';
        } else if (type === TimelineEventType.SOCIAL_MEDIA) {
            return 'rgba(255,0,0,' + String(transparency) + ')';
        } else if (type === TimelineEventType.OTHER) {
            return 'rgba(128,128,128,' + String(transparency) + ')';
        } else if (type === TimelineEventType.DRS) {
            return 'rgba(148,23,106,' + String(transparency) + ')';
        } else {
            return 'black';
        }
    }

    private static _getSignificances(currentValue: number): number[] {
        let value = currentValue;
        const maxSignificanceValue = 5;
        let significances: number[] = [];
        for (let i = maxSignificanceValue; i >= value; i--) {
            significances.push(i);
        }
        return significances;
    }

    private static _getPointRadius(significance: number): number {
        if (significance === 0) {
            return 2;
        } else if (significance === 1) {
            return 4;
        } else if (significance === 2) {
            return 6;
        } else if (significance === 3) {
            return 9;
        } else if (significance === 4) {
            return 13;
        } else if (significance === 5) {
            return 18;
        }
        return 1;
    }

    private static _getPointHitRadius(significance: number): number {
        if (significance === 0) {
            return 2;
        } else if (significance === 1) {
            return 4;
        } else if (significance === 2) {
            return 5;
        } else if (significance === 3) {
            return 7;
        } else if (significance === 4) {
            return 10;
        } else if (significance === 5) {
            return 15;
        }
        return 1;
    }
}