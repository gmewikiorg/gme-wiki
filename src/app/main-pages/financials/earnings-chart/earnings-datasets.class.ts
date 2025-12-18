import { Context } from "chartjs-plugin-datalabels";
import { ScreenService } from "../../../shared/services/screen-size.service";
import { EarningsResult } from "../earnings-results/earnings-result.class";
import { ChartDataset } from "chart.js";
import { Options } from "chartjs-plugin-datalabels/types/options";
import { EarningsChartPropertySelection } from "./choose-earnings-chart/earnings-chart-property-selection.enum";
import { EARNINGS_METRIC_CONFIGS, EarningsMetric, EarningsMetricConfig, SELECTION_TO_METRICS } from "./choose-earnings-chart/earnings-metric-configs";



export class EarningsDatasetBuilder {
    constructor(private _sizeService: ScreenService) { }

    public updateDatasets(results: EarningsResult[], chartSelection: EarningsChartPropertySelection, chartPeriod: 'ANNUAL' | 'QUARTER', dataEntryCount: number): ChartDataset<"bar", any[]>[] {
        const metrics = SELECTION_TO_METRICS[chartSelection] ?? [];
        return metrics.map(metric => {
            const config = EARNINGS_METRIC_CONFIGS[metric];
            const dataItems = results.map(config.value).reverse();
            return this._buildDataset(
                config.metric,
                chartPeriod,
                dataEntryCount,
                dataItems,
                chartSelection
            );
        });
    }

    public getTickScale(chartOption: EarningsChartPropertySelection, chartPeriod: 'ANNUAL' | 'QUARTER'): 100 | 1000 | 1000000 | 1000000000 | 1 {
        const metrics = SELECTION_TO_METRICS[chartOption] ?? [];
        const scales = metrics.map(metric => {
            const config = EARNINGS_METRIC_CONFIGS[metric];
            return chartPeriod === 'ANNUAL'
                ? config.tickScaleAnnually
                : config.tickScaleQuarterly;
        });
        return Math.max(...scales) as | 100 | 1000 | 1000000 | 1000000000 | 1;
    }

    public getMinY(chartOption: EarningsChartPropertySelection, chartPeriod: 'ANNUAL' | 'QUARTER'): number {
        const metrics = SELECTION_TO_METRICS[chartOption] ?? [];
        const scales = metrics.map(metric => {
            const config = EARNINGS_METRIC_CONFIGS[metric];
            return chartPeriod === 'ANNUAL'
                ? config.minYAnnual
                : config.minYQuarter;
        });
        return Math.min(...scales);
    }


    /** Builds a single dataset.  e.g. all Revenue numbers, or all Interest income numbers, etc. */
    private _buildDataset(
        metric: EarningsMetric,
        period: 'ANNUAL' | 'QUARTER',
        dataEntryCount: number,
        dataItems: number[],
        chartSelection: EarningsChartPropertySelection
    ): ChartDataset<"bar", (any)[]> {

        const config: EarningsMetricConfig = EARNINGS_METRIC_CONFIGS[metric];
        const datasetColorsFull = this._getDatasetColors(dataEntryCount, dataItems, config);
        // const datasetColors = this.getSubsetArray(datasetColorsFull.length, datasetColorsFull);
        const dataLabelColors = datasetColorsFull.map(color => this._setNewAlpha(color, 0.9));


        let tickScale = config.tickScaleAnnually;
        if (period !== 'ANNUAL') {
            tickScale = config.tickScaleQuarterly;
        }

        let yAxisId = "y";
        if (metric === EarningsMetric.STORE_COUNT) {
            yAxisId = "y2";
        }
        const isDarkMode = this._sizeService.isDarkMode;
        let backgroundColor = 'white';
        if (isDarkMode) {
            backgroundColor = 'black';
        }
        let dataLabels: Options | undefined = {
            color: function (context: Context) {
                return dataLabelColors[context.dataIndex]
            },
            listeners: {
                enter() {}
            },
            display(context: Context) {
                return (context.dataIndex >= context.dataset.data.length - 1) ? true : false;
            },
            align: function (context: Context) {
                let value = Number(context.dataset.data[context.dataIndex]);
                return ((value > 0) ? 'top' : 'bottom');
            },
            anchor: function (context: Context) {
                let value = Number(context.dataset.data[context.dataIndex]);
                return ((value > 0) ? 'end' : 'start');
            },
            backgroundColor: backgroundColor,
            borderRadius: 5,
            borderColor: function (context: Context) {
                return (isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')
            },
            borderWidth: 1,
            formatter: function (value: number, context: Context) {
                if (metric !== EarningsMetric.STORE_COUNT) {
                    if (tickScale === 1000000000) {
                        return '$' + (value / tickScale).toFixed(1) + "B";
                    } else if (tickScale === 1000000) {
                        return '$' + (value / tickScale).toFixed(0) + "M";
                    } else if (tickScale === 1000) {
                        return '$' + (value / tickScale).toFixed(0) + "K";
                    } else if (tickScale === 100) {
                        return (value).toFixed(1) + "%";
                    } else if (tickScale === 1) {
                        return '$' + (value / 100).toFixed(2);
                    }
                } else {
                    return '' + (value / tickScale).toFixed(0) + "K";
                }
                return '';
            },
            font: {
                weight: 'bold',
            },
            padding: 2,
        }

        if (this._sizeService.isMobile) {
            if (chartSelection === EarningsChartPropertySelection.REVENUE_VS_STORES) {
                if (metric === EarningsMetric.STORE_COUNT) {
                    dataLabels = {
                        display: false,
                    };
                }
            }
        }

        let dataset: ChartDataset<"bar", (any)[]> = {
            label: config.label,
            yAxisID: yAxisId,
            datalabels: dataLabels,
            backgroundColor: this.getSubsetArray(dataEntryCount, datasetColorsFull),
            data: this.getSubsetArray(dataEntryCount, dataItems),
            borderRadius: 5,
        }
        return dataset;
    }

    private _getDatasetColors(dataEntryCount: number, dataItems: number[], config: EarningsMetricConfig): string[] {
        let colors: string[] = [];
        const indexNegativeNumber = dataItems.findIndex(item => item < 0);
        if (config.colorScheme === 'BLUE') {
            colors = dataItems.map(item => ('rgba(3, 90, 252,' + String(this._getAlpha(dataItems.indexOf(item), dataItems.length)) + ')'));
        } else if (config.colorScheme === 'ORANGE') {
            colors = dataItems.map(item => ('rgba(255, 165, 0,' + String(this._getAlpha(dataItems.indexOf(item), dataItems.length)) + ')'));
        } else if (config.colorScheme === 'GREEN') {
            colors = dataItems.map(item => ('rgba(7, 145, 7,' + String(this._getAlpha(dataItems.indexOf(item), dataItems.length)) + ')'));
        } else if (config.colorScheme === 'RED_GREEN') {
            // in this case there are negative and positive numbers
            colors = dataItems.map(item => {
                // green: rgb   0, 145, 10
                // red:   rgb   227, 0, 0
                if (item >= 0) {
                    return ('rgba(0, 145, 11,' + String(this._getAlpha(dataItems.indexOf(item), dataItems.length)) + ')');
                } else {
                    return ('rgba(227, 0, 0,' + String(this._getAlpha(dataItems.indexOf(item), dataItems.length)) + ')');
                }
            });
        }
        return colors;
        const sliced = colors.slice(-dataEntryCount);
        return sliced;
    }

    /** 
        * Gets an alpha value for rgba based on items position in array
        *  older items are more transparent (lower alpha), e.g. 2005.
        *  newer items are more opaque (higher alpha), e.g. 2023
        */
    private _getAlpha(index: number, totalCount: number) {
        let minAlpha = 0.5;
        const maxAlpha = 1.0;
        const t = index / (totalCount - 1);
        if (this._sizeService.isDarkMode) {
            minAlpha = 0.65;
        }
        if (totalCount <= 1) {
            return 1.0;
        }
        return minAlpha + (maxAlpha - minAlpha) * t;
    }

    public static get mobileItemCount(): number { return 8; }
    public getSubsetArray(dataEntryCount: number, sourceArray: any[]): any[] {
        return sourceArray;
        const screenWidth = this._sizeService.screenWidth;
        if (dataEntryCount <= sourceArray.length) {
            let itemCount = dataEntryCount;
            if (screenWidth < 800) {
                const difference = 800 - screenWidth;
                itemCount = dataEntryCount - (Math.floor(difference / 45));
            }
            if (screenWidth < 480) {
                itemCount = EarningsDatasetBuilder.mobileItemCount;
            }
            const startIndex = sourceArray.length - itemCount;
            const endIndex = sourceArray.length;
            const subsetArray = sourceArray.slice(startIndex);
            return subsetArray;
        } else {
            return sourceArray;
        }
        return [];
    }

    private _setNewAlpha(rgbaString: string, newAlpha: number): string {
        // This regex will match both rgb(...) and rgba(...).
        // Capturing groups:
        //   1 => red
        //   2 => green
        //   3 => blue
        //   4 => alpha (if present)
        const regex = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/;

        const match = rgbaString.trim().match(regex);
        if (!match) {
            throw new Error('Invalid RGBA or RGB color string.');
        }

        // Destructure the captured groups.
        // "existingAlpha" may be undefined if it's just "rgb(...)".
        const [, r, g, b, existingAlpha] = match;

        // Return a proper "rgba(...)" string with the updated alpha.
        return `rgba(${r}, ${g}, ${b}, ${newAlpha})`;
    }

}