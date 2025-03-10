import { Context } from "chartjs-plugin-datalabels";
import { ScreenService } from "../../../shared/services/screen-size.service";
import { EarningsResult } from "../../../shared/services/earnings-results/earnings-result.class";
import { ChartDataset } from "chart.js";
import { EarningsChartSelection } from "../choose-earnings-chart/earnings-chart-selection.enum";
import { EARNINGS_METRIC_CONFIG, EarningsMetric, EarningsMetricConfig } from "../choose-earnings-chart/earnings-metric.enum";
import { Options } from "chartjs-plugin-datalabels/types/options";

export class EarningsDatasetBuilder {

    constructor(private _sizeService: ScreenService) { }

    public updateDatasets(results: EarningsResult[], chartSelection: EarningsChartSelection, chartPeriod: 'ANNUAL' | 'QUARTER' | 'QOVERQ', dataEntryCount: number): ChartDataset<"bar", any[]>[] {
        const revenueDataItems: number[] = results.map(r => r.revenue).reverse();
        const netIncomeDataItems: number[] = results.map(r => r.netEarnings).reverse();
        const costOfSalesDataItems: number[] = results.map(r => r.costOfSales).reverse();
        const grossProfitDataItems: number[] = results.map(r => r.grossProfit).reverse();
        const operatingIncomeDataItems: number[] = results.map(r => r.operatingIncome).reverse();
        const sgaDataItems: number[] = results.map(r => r.sga).reverse();
        const interestIncomeDataItems: number[] = results.map(r => r.interestIncome).reverse();
        const equityDataItems: number[] = results.map(r => r.stockholdersEquity).reverse();
        const storeCountDataItems: number[] = results.map(r => r.storeCount).reverse();

        const revenueDataSet = this._buildDataset(EarningsMetric.REVENUE, chartPeriod, dataEntryCount, revenueDataItems, chartSelection);
        const netIncomeDataset = this._buildDataset(EarningsMetric.NET_INCOME, chartPeriod, dataEntryCount, netIncomeDataItems, chartSelection);
        const costOfSalesProfitDataset = this._buildDataset(EarningsMetric.COST_OF_SALES, chartPeriod, dataEntryCount, costOfSalesDataItems, chartSelection);
        const grossProfitDataset = this._buildDataset(EarningsMetric.GROSS_PROFIT, chartPeriod, dataEntryCount, grossProfitDataItems, chartSelection);
        const operatingIncomeDataset = this._buildDataset(EarningsMetric.OPERATING_INCOME, chartPeriod, dataEntryCount, operatingIncomeDataItems, chartSelection);
        const sgaDataset = this._buildDataset(EarningsMetric.SGA, chartPeriod, dataEntryCount, sgaDataItems, chartSelection);
        const interestIncomeDataset = this._buildDataset(EarningsMetric.INTEREST_INCOME, chartPeriod, dataEntryCount, interestIncomeDataItems, chartSelection);
        const equityDataset = this._buildDataset(EarningsMetric.STOCKHOLDERS_EQUITY, chartPeriod, dataEntryCount, equityDataItems, chartSelection);
        const storeCountDataset = this._buildDataset(EarningsMetric.STORE_COUNT, chartPeriod, dataEntryCount, storeCountDataItems, chartSelection);

        let datasets: ChartDataset<"bar", any[]>[] = [];
        if (chartSelection === EarningsChartSelection.REVENUE_VS_NET_INCOME) {
            datasets = [revenueDataSet, netIncomeDataset];
        } else if (chartSelection === EarningsChartSelection.REVENUE_VS_COST) {
            datasets = [revenueDataSet, costOfSalesProfitDataset];
        } else if (chartSelection === EarningsChartSelection.REVENUE_VS_GROSS_PROFIT) {
            datasets = [revenueDataSet, grossProfitDataset];
        } else if (chartSelection === EarningsChartSelection.INTEREST_INCOME) {
            datasets = [interestIncomeDataset];
        } else if (chartSelection === EarningsChartSelection.STOCKHOLDERS_EQUITY) {
            datasets = [equityDataset];
        } else if (chartSelection === EarningsChartSelection.OPERATING_INCOME) {
            datasets = [operatingIncomeDataset];
        } else if (chartSelection === EarningsChartSelection.GROSS_PROFIT_VS_SGA) {
            datasets = [grossProfitDataset, sgaDataset];
        } else if (chartSelection === EarningsChartSelection.OPERATIONS_VS_SGA) {
            datasets = [operatingIncomeDataset, sgaDataset];
        } else if (chartSelection === EarningsChartSelection.REVENUE_VS_STORES) {
            datasets = [revenueDataSet, storeCountDataset];
        } else if (chartSelection === EarningsChartSelection.NET_INCOME) {
            datasets = [netIncomeDataset];
        }

        return datasets;
    }

    public chartTitle(chartOption: EarningsChartSelection, period: 'ANNUAL' | 'QUARTER' | 'QOVERQ'): string {
        let periodLabel = 'by fiscal year';
        if (period !== 'ANNUAL') {
            periodLabel = 'by fiscal quarter';
        }
        let title = '';
        if (chartOption === EarningsChartSelection.REVENUE_VS_NET_INCOME) {
            title = 'Revenue and Net Income ' + periodLabel;
        } else if (chartOption === EarningsChartSelection.REVENUE_VS_COST) {
            title = 'Revenue vs Cost of Sales ' + periodLabel;
        } else if (chartOption === EarningsChartSelection.REVENUE_VS_GROSS_PROFIT) {
            title = 'Revenue vs Gross Profit ' + periodLabel;
        } else if (chartOption === EarningsChartSelection.INTEREST_INCOME) {
            title = 'Interest Income ' + periodLabel;
        } else if (chartOption === EarningsChartSelection.STOCKHOLDERS_EQUITY) {
            title = "Stockholders' Equity " + periodLabel;
        } else if (chartOption === EarningsChartSelection.OPERATING_INCOME) {
            title = 'Operating Income ' + periodLabel;
        } else if (chartOption === EarningsChartSelection.GROSS_PROFIT_VS_SGA) {
            title = 'Gross Profit vs SG&A ' + periodLabel;
        } else if (chartOption === EarningsChartSelection.OPERATIONS_VS_SGA) {
            title = 'Operating Income vs SG&A ' + periodLabel;
        } else if (chartOption === EarningsChartSelection.REVENUE_VS_STORES) {
            title = 'Revenue vs stores ' + periodLabel;
        } else if (chartOption === EarningsChartSelection.NET_INCOME) {
            title = 'Net Income ' + periodLabel;
        }
        return title;
    }

    public getTickScale(chartOption: EarningsChartSelection, chartPeriod: 'ANNUAL' | 'QUARTER' | 'QOVERQ'): 1000 | 1000000 | 1000000000 {
        let tickScale: number = 1000000000;
        const revenueConfig = EARNINGS_METRIC_CONFIG[EarningsMetric.REVENUE];
        const netIncomeConfig = EARNINGS_METRIC_CONFIG[EarningsMetric.NET_INCOME];
        const costOfSalesConfig = EARNINGS_METRIC_CONFIG[EarningsMetric.COST_OF_SALES];
        const grossProfitConfig = EARNINGS_METRIC_CONFIG[EarningsMetric.GROSS_PROFIT];
        const interestConfig = EARNINGS_METRIC_CONFIG[EarningsMetric.INTEREST_INCOME];
        const equityConfig = EARNINGS_METRIC_CONFIG[EarningsMetric.STOCKHOLDERS_EQUITY];
        const operatingConfig = EARNINGS_METRIC_CONFIG[EarningsMetric.OPERATING_INCOME];
        const sgaConfig = EARNINGS_METRIC_CONFIG[EarningsMetric.SGA];
        const storesConfig = EARNINGS_METRIC_CONFIG[EarningsMetric.STORE_COUNT];

        if (chartPeriod === 'ANNUAL') {
            if (chartOption === EarningsChartSelection.REVENUE_VS_NET_INCOME) {
                tickScale = Math.max(revenueConfig.tickScaleAnnually, netIncomeConfig.tickScaleAnnually);
            } else if (chartOption === EarningsChartSelection.REVENUE_VS_COST) {
                tickScale = Math.max(revenueConfig.tickScaleAnnually, costOfSalesConfig.tickScaleAnnually);
            } else if (chartOption === EarningsChartSelection.REVENUE_VS_GROSS_PROFIT) {
                tickScale = Math.max(revenueConfig.tickScaleAnnually, grossProfitConfig.tickScaleAnnually);
            } else if (chartOption === EarningsChartSelection.INTEREST_INCOME) {
                tickScale = interestConfig.tickScaleAnnually;
            } else if (chartOption === EarningsChartSelection.STOCKHOLDERS_EQUITY) {
                tickScale = equityConfig.tickScaleAnnually;
            } else if (chartOption === EarningsChartSelection.OPERATING_INCOME) {
                tickScale = operatingConfig.tickScaleAnnually;
            } else if (chartOption === EarningsChartSelection.GROSS_PROFIT_VS_SGA) {
                tickScale = Math.max(grossProfitConfig.tickScaleAnnually, sgaConfig.tickScaleAnnually);
            } else if (chartOption === EarningsChartSelection.OPERATIONS_VS_SGA) {
                tickScale = Math.max(operatingConfig.tickScaleAnnually, sgaConfig.tickScaleAnnually);
            } else if (chartOption === EarningsChartSelection.REVENUE_VS_STORES) {
                tickScale = Math.max(revenueConfig.tickScaleAnnually);
            } else if (chartOption === EarningsChartSelection.NET_INCOME) {
                tickScale = Math.max(netIncomeConfig.tickScaleAnnually);
            }
        } else {
            if (chartOption === EarningsChartSelection.REVENUE_VS_NET_INCOME) {
                tickScale = Math.max(revenueConfig.tickScaleQuarterly, netIncomeConfig.tickScaleQuarterly);
            } else if (chartOption === EarningsChartSelection.REVENUE_VS_COST) {
                tickScale = Math.max(revenueConfig.tickScaleQuarterly, costOfSalesConfig.tickScaleQuarterly);
            } else if (chartOption === EarningsChartSelection.REVENUE_VS_GROSS_PROFIT) {
                tickScale = Math.max(revenueConfig.tickScaleQuarterly, grossProfitConfig.tickScaleQuarterly);
            } else if (chartOption === EarningsChartSelection.INTEREST_INCOME) {
                tickScale = interestConfig.tickScaleQuarterly;
            } else if (chartOption === EarningsChartSelection.STOCKHOLDERS_EQUITY) {
                tickScale = equityConfig.tickScaleQuarterly;
            } else if (chartOption === EarningsChartSelection.OPERATING_INCOME) {
                tickScale = operatingConfig.tickScaleQuarterly;
            } else if (chartOption === EarningsChartSelection.GROSS_PROFIT_VS_SGA) {
                tickScale = Math.max(grossProfitConfig.tickScaleQuarterly, sgaConfig.tickScaleQuarterly);
            } else if (chartOption === EarningsChartSelection.OPERATIONS_VS_SGA) {
                tickScale = Math.max(operatingConfig.tickScaleQuarterly, sgaConfig.tickScaleQuarterly);
            } else if (chartOption === EarningsChartSelection.REVENUE_VS_STORES) {
                tickScale = Math.max(revenueConfig.tickScaleAnnually);
            } else if (chartOption === EarningsChartSelection.NET_INCOME) {
                tickScale = Math.max(netIncomeConfig.tickScaleAnnually);
            }
        }
        if (tickScale === 1000000000) {
            return 1000000000;
        } else if (tickScale === 1000000) {
            return 1000000;
        } else if (tickScale === 1000) {
            return 1000;
        }
        return 1000000000;
    }

    public getMinY(chartOption: EarningsChartSelection, chartPeriod: 'ANNUAL' | 'QUARTER' | 'QOVERQ'): number {
        let minY = 0;
        const revenueConfig = EARNINGS_METRIC_CONFIG[EarningsMetric.REVENUE];
        const netIncomeConfig = EARNINGS_METRIC_CONFIG[EarningsMetric.NET_INCOME];
        const costOfSalesConfig = EARNINGS_METRIC_CONFIG[EarningsMetric.COST_OF_SALES];
        const grossProfitConfig = EARNINGS_METRIC_CONFIG[EarningsMetric.GROSS_PROFIT];
        const interestConfig = EARNINGS_METRIC_CONFIG[EarningsMetric.INTEREST_INCOME];
        const equityConfig = EARNINGS_METRIC_CONFIG[EarningsMetric.STOCKHOLDERS_EQUITY];
        const operatingConfig = EARNINGS_METRIC_CONFIG[EarningsMetric.OPERATING_INCOME];
        const sgaConfig = EARNINGS_METRIC_CONFIG[EarningsMetric.SGA]
        if (chartPeriod === 'ANNUAL') {
            if (chartOption === EarningsChartSelection.REVENUE_VS_NET_INCOME) {
                minY = Math.min(revenueConfig.minYAnnual, netIncomeConfig.minYAnnual);
            } else if (chartOption === EarningsChartSelection.REVENUE_VS_COST) {
                minY = Math.min(revenueConfig.minYAnnual, costOfSalesConfig.minYAnnual);
            } else if (chartOption === EarningsChartSelection.REVENUE_VS_GROSS_PROFIT) {
                minY = Math.min(revenueConfig.minYAnnual, grossProfitConfig.minYAnnual);
            } else if (chartOption === EarningsChartSelection.INTEREST_INCOME) {
                minY = interestConfig.minYAnnual;
            } else if (chartOption === EarningsChartSelection.STOCKHOLDERS_EQUITY) {
                minY = equityConfig.minYAnnual;
            } else if (chartOption === EarningsChartSelection.OPERATING_INCOME) {
                minY = operatingConfig.minYAnnual;
            } else if (chartOption === EarningsChartSelection.GROSS_PROFIT_VS_SGA) {
                minY = Math.min(grossProfitConfig.minYAnnual, sgaConfig.minYAnnual);
            } else if (chartOption === EarningsChartSelection.OPERATIONS_VS_SGA) {
                minY = Math.min(operatingConfig.minYAnnual, sgaConfig.minYAnnual);
            } else if (chartOption === EarningsChartSelection.NET_INCOME) {
                minY = Math.min(-800000000);
            }
        } else {
            if (chartOption === EarningsChartSelection.REVENUE_VS_NET_INCOME) {
                minY = Math.min(revenueConfig.minYQuarter, netIncomeConfig.minYQuarter);
            } else if (chartOption === EarningsChartSelection.REVENUE_VS_COST) {
                minY = Math.min(revenueConfig.minYQuarter, costOfSalesConfig.minYQuarter);
            } else if (chartOption === EarningsChartSelection.REVENUE_VS_GROSS_PROFIT) {
                minY = Math.min(revenueConfig.minYQuarter, grossProfitConfig.minYQuarter);
            } else if (chartOption === EarningsChartSelection.INTEREST_INCOME) {
                minY = interestConfig.minYQuarter;
            } else if (chartOption === EarningsChartSelection.STOCKHOLDERS_EQUITY) {
                minY = equityConfig.minYQuarter;
            } else if (chartOption === EarningsChartSelection.OPERATING_INCOME) {
                minY = operatingConfig.minYQuarter;
            } else if (chartOption === EarningsChartSelection.GROSS_PROFIT_VS_SGA) {
                minY = Math.min(grossProfitConfig.minYQuarter, sgaConfig.minYQuarter);
            } else if (chartOption === EarningsChartSelection.OPERATIONS_VS_SGA) {
                minY = Math.min(operatingConfig.minYQuarter, sgaConfig.minYQuarter);
            } else if (chartOption === EarningsChartSelection.NET_INCOME) {
                minY = Math.min(netIncomeConfig.minYQuarter)
            }
        }
        return minY;
    }


    /** Builds a single dataset.  e.g. all Revenue numbers, or all Interest income numbers, etc. */
    private _buildDataset(metric: EarningsMetric, period: 'ANNUAL' | 'QUARTER' | 'QOVERQ', dataEntryCount: number, dataItems: number[], chartSelection: EarningsChartSelection): ChartDataset<"bar", (any)[]> {


        const config: EarningsMetricConfig = EARNINGS_METRIC_CONFIG[metric];
        const datasetColorsFull = this._getDatasetColors(dataEntryCount, dataItems, config);
        const datasetColors = this.getSubsetArray(datasetColorsFull.length, datasetColorsFull);
        const dataLabelColors = datasetColors.map(color => this._setNewAlpha(color, 0.9));

        let tickScale = config.tickScaleAnnually;
        if (period !== 'ANNUAL') {
            tickScale = config.tickScaleQuarterly;
        }

        let yAxisId = "y";
        if (metric === EarningsMetric.STORE_COUNT) {
            yAxisId = "y2";
        }



        let dataLabels: Options | undefined = {
            color: function (context: Context) {
                return dataLabelColors[context.dataIndex]
            },
            listeners: {
                enter() {

                }
            },
            display(context: Context) {
                if (context.dataIndex === context.dataset.data.length - 1) {
                    return true;
                }
                return true;
            },
            align: function (context: Context) {
                let value = Number(context.dataset.data[context.dataIndex]);
                if (value > 0) {
                    return 'top';
                } else {
                    return 'bottom';
                }
                return 'bottom';
            },
            anchor: function (context: Context) {
                let value = Number(context.dataset.data[context.dataIndex]);
                if (value > 0) {
                    return 'end';
                } else {
                    return 'start';
                }
                return 'start';
            },
            backgroundColor: 'white',
            borderRadius: 5,
            borderColor: function (context: Context) {
                return 'rgba(0,0,255,0.1)';
            },
            borderWidth: 1,
            formatter: function (value: number, context: Context) {
                if (metric !== EarningsMetric.STORE_COUNT) {
                    if (tickScale === 1000000000) {
                        return '$' + (value / tickScale).toFixed(1) + " B";
                    } else {
                        return '$' + (value / tickScale).toFixed(0) + " M";
                    }
                } else {
                    return '' + (value / tickScale).toFixed(0) + " K";
                }
                return '';
            },
            font: {
                weight: 'bold',
            },
            padding: 2,
        }

        if(this._sizeService.isMobile){
            if(chartSelection === EarningsChartSelection.REVENUE_VS_STORES){
                if(metric === EarningsMetric.STORE_COUNT){
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
            backgroundColor: this.getSubsetArray(dataEntryCount, datasetColors),
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
        const sliced = colors.slice(-dataEntryCount);
        return sliced;
    }


    /** 
        * Gets an alpha value for rgba based on items position in array
        *  older items are more transparent (lower alpha), e.g. 2005.
        *  newer items are more opaque (higher alpha), e.g. 2023
        */
    private _getAlpha(index: number, totalCount: number) {
        if (totalCount <= 1) {
            return 1.0;
        }
        const minAlpha = 0.3;
        const maxAlpha = 1.0;
        const t = index / (totalCount - 1);
        return minAlpha + (maxAlpha - minAlpha) * t;
    }

    public static get mobileItemCount(): number { return 8; }
    public getSubsetArray(dataEntryCount: number, sourceArray: any[]): any[] {
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