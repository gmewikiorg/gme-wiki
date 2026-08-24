import { ChartOptions, TooltipItem } from "chart.js";
import { getAnnotationConfig } from "../timeline-controls/chart-options/annotations-historic";
import { TimelineEventViewType } from "../timeline-items/timeline-item/timeline-event-url.interface";
import { TimelineChartDataManagerService } from "./timeline-chart-data-manager-service";
import { TimelineControlsService } from "../timeline-controls/timeline-controls.service";
import { ScreenService } from "../../../shared/services/screen-size.service";
import { Router } from "@angular/router";
import dayjs from "dayjs";
import { TimelineEventOLD } from "../timeline-items/timeline-item/timeline-event.class";

export function setTimelineChartOptions(
    isDarkMode: boolean,
    isMobile: boolean,
    timePeriod: TimelineEventViewType,
    chartDataService: TimelineChartDataManagerService,
    controlsService: TimelineControlsService,
    cursorNgStyle: any,
    screenService: ScreenService,
    router: Router,
    tooltipBackgroundColor: string,
): ChartOptions<'line'> {
    let scaleColor = 'rgba(128,128,128,0.2)';
    if (isDarkMode) { scaleColor = 'rgba(255,255,255,0.15)'; }
    // const img = new Image();
    // img.src = 'assets/icons/bluesky-logo.png';

    const period = timePeriod;
    let annotation: any = {}
    let maxTicksLimit = 9;
    if (period === 'CURRENT') {
        maxTicksLimit = 9;

    } else if (period === 'HISTORIC') {
        maxTicksLimit = 23;
        annotation = getAnnotationConfig(isDarkMode);
    } else if (period === '2_YEARS') {
    }


    return {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,

        onHover: (event, array) => {
            cursorNgStyle = { cursor: 'default' }
            if (array.length > 0) {
                const timelineItem = chartDataService.lookupEventByIndex(array[0].datasetIndex, array[0].index);
                if (timelineItem) {
                    controlsService.setTimelineAnnotation(timelineItem);
                    if (timelineItem.hasLocalArticle || timelineItem.hasUrls) {
                        cursorNgStyle = { cursor: 'pointer' }
                    }
                }

            }
        },
        onClick: (event, array) => {
            if (array.length > 0) {
                const timelineItem = chartDataService.lookupEventByIndex(array[0].datasetIndex, array[0].index);
                if (timelineItem) {
                    if (timelineItem.hasLocalArticle && !screenService.isMobile && !screenService.isTouchDevice) {
                        router.navigate([timelineItem.localArticle!.url]);
                    } else if (timelineItem.hasUrls && !screenService.isMobile && !screenService.isTouchDevice) {
                        window.open(timelineItem.urls[0].url, '_blank');
                    }
                }
            }
        },
        layout: {
            padding: 0,

        },
        scales: {
            x: {
                grid: {
                    color: scaleColor,
                },
                ticks: {
                    // autoSkip: period === 'HISTORIC' ? false : true,
                    autoSkip: false,
                    // autoSkip: () => { if (period === 'HISTORIC') { return false; } return true; },
                    maxTicksLimit: maxTicksLimit,
                }
            },
            y: {
                grid: {
                    color: scaleColor // Change the color of the lines along the Y axis
                },
                min: 0,
            }
        },
        plugins: {
            annotation: annotation,
            tooltip: {
                backgroundColor: (context) => {
                    if (context.tooltipItems.length > 0) {
                        getTooltipBackgroundColor(context.tooltipItems[0], chartDataService)
                    }
                    return tooltipBackgroundColor;
                },

                borderColor: 'black',
                borderWidth: 1,
                displayColors: false,
                bodyFont: {
                    size: 16,
                    weight: 'bold',
                },
                titleFont: {
                    weight: 'normal',
                },
                footerFont: {
                    weight: 'normal',
                },
                callbacks: {
                    title: (context) => { return titleContext(context, chartDataService, isMobile) },
                    label: (context) => { return labelContext(context, chartDataService, isMobile) },
                    // footer: (context) => { return this._footerContext(context) },
                },
            },

        },
    };

}


function labelContext(context: TooltipItem<"line">, chartDataService: TimelineChartDataManagerService, isMobile: boolean) {
    const event = chartDataService.lookupEventByIndex(context.datasetIndex, context.dataIndex)
    let label = '';

    if (isMobile) {
        if (event?.hasShortTitle) {
            label += event.shortTitle;
        }
    } else {
        if (event?.hasLocalArticle) {
            label += '📰';
        }
        label += event?.title
    }


    return label;
}
// private _footerContext(context: TooltipItem<"line">[]) {
//   return '';
// }
function titleContext(context: TooltipItem<"line">[], chartDataService: TimelineChartDataManagerService, isMobile: boolean) {
    const event = chartDataService.lookupEventByIndex(context[0].datasetIndex, context[0].dataIndex)
    let title = '' + dayjs(event?.dateYYYYMMDD).format('MMMM D, YYYY') + " - GME share price: $" + Number(context[0].raw).toFixed(2)

    if (isMobile) {
        title = '' + dayjs(event?.dateYYYYMMDD).format('MMMM D, YYYY')
    }

    return title;
}


function getTooltipBackgroundColor(context: TooltipItem<"line">, chartDataService: TimelineChartDataManagerService) {
    const foundEvent = chartDataService.lookupEventByIndex(context.datasetIndex, context.dataIndex);
    const dataset = chartDataService.lookupDataset(context.datasetIndex);
    let tooltipBackgroundColor: string = '';
    if (foundEvent) {
        tooltipBackgroundColor = TimelineEventOLD.getTypeColor(foundEvent.mainType, 0.8);
    }
    return tooltipBackgroundColor;
}