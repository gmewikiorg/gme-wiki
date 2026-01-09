import { ChartOptions, TooltipItem } from "chart.js";
import { EarningsDatasetBuilder } from "./earnings-datasets.class";
import { EarningsChartPropertySelection } from "./choose-earnings-chart/earnings-chart-property-selection.enum";
import { earningsChartLabelContext } from "./earnings-chart-label-context";

export function setChartOptions(
    datasetBuilder: EarningsDatasetBuilder,
    chartSelectedProperty: EarningsChartPropertySelection,
    chartPeriod: 'ANNUAL' | 'QUARTER',
    xAxisLabels: string[],
    isDarkMode: boolean,
): ChartOptions<'bar'> {

    const datasets = datasetBuilder.datasets;
    const tickScale: 1 | 100 | 1000 | 1000000 | 1000000000 = datasetBuilder.getTickScale(chartSelectedProperty, chartPeriod);
    type TickScale = 1 | 100 | 1000 | 1000000 | 1000000000;
    const TICK_LABELS: Record<TickScale, string> = {
        1: '',
        100: 'hundred',
        1000: 'thousand',
        1000000: 'million',
        1000000000: 'billion',
    };
    const tickLabel = TICK_LABELS[tickScale];

    const minY = datasetBuilder.getMinY(chartSelectedProperty, chartPeriod);
    let maxY = undefined;

    if (chartSelectedProperty === EarningsChartPropertySelection.STOCKHOLDERS_EQUITY) {
        maxY = 6000000000
    }
    const isRevenueTypePercent = chartSelectedProperty === EarningsChartPropertySelection.REVENUE_TYPE_PERCENTAGE;
    const isNetProfitMarginPercent = chartSelectedProperty === EarningsChartPropertySelection.NET_PROFIT_MARGIN;

    const tooltipCallbacks = {
        label: (context: TooltipItem<"bar">) => { return labelContext(context, chartSelectedProperty) },
        footer: (context: TooltipItem<"bar">[]) => { return footerContext(context) },
        title: (context: TooltipItem<"bar">[]) => { return titleContext(context, xAxisLabels) }
    };

    let color = 'rgba(0,0,0,0.1)';
    const darkMode = isDarkMode;
    if (darkMode) {
        color = 'rgba(255,255,255,0.15)';
    }

    const yScale = {
        min: minY,
        max: maxY,
        title: {},
        grid: {
            color: function (context: any) {
                return color;
            },
        },
        ticks: {
            backdropColor: 'black',
            // Include a dollar sign in the ticks
            callback: function (value: any, index: any, ticks: any) {
                if (isRevenueTypePercent || isNetProfitMarginPercent) {
                    return Number(value) + "%";
                } else {
                    const numVal = Number(value);
                    if (tickScale === 1) {
                        // e.g. in case of EPS, BVPS
                        if (numVal >= 0) {
                            if (numVal === 0) {
                                return '$0'
                            } else {
                                return '$' + (numVal / 100) + '.00 ';
                            }
                        } else {
                            return '$' + (numVal / 100) + '.00 ';
                        }
                    } else {
                        if (numVal >= 0) {
                            if (numVal === 0) {
                                return '$0'
                            } else {
                                return '$' + (numVal / tickScale) + ' ' + tickLabel;
                            }
                        } else {
                            return '$' + (numVal / tickScale) + ' ' + tickLabel;
                        }
                    }
                }
            }
        }
    }

    const y2Scale = {
        min: minY,
        type: "linear",
        position: "right",
        beginAtZero: true,
        grid: {
            drawOnChartArea: false, // Prevents overlapping grid lines
        },
        title: {
            display: true,
            text: "Store count",
        },
    }

    const xScale = {
        grid: {
            color: function (context: any) {
                // const xAxisLabel = xAxisLabels[context.index];
                // if (xAxisLabel) {
                //     if (xAxisLabel.startsWith("Q1")) {
                //         if (isDarkMode) {
                //             return 'rgba(255,255,255,0.3)';
                //         }else{
                //             return 'rgba(0,0,0,0.3)';
                //         }
                //     }
                // }

                return color;
            },
            lineWidth: function (context: any) {
                // const xAxisLabel = xAxisLabels[context.index];
                // if (xAxisLabel) {
                //     if (xAxisLabel.startsWith("Q1")) {
                //         return 2;
                //     }
                // }
                return 1;
            }
        }
    }

    let scales: any = {
        x: xScale,
        y: yScale,
    }

    if (chartSelectedProperty === EarningsChartPropertySelection.REVENUE_VS_STORES) {
        yScale.title = {
            display: true,
            text: "Revenue",
        },
            scales = {
                x: xScale,
                y: yScale,
                y2: y2Scale,
            }
    }

    let chartOptions: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        scales: scales,
        layout: {
            padding: {
                right: 10
            }
        },
        plugins: {
            datalabels: {
            },
            legend: {
                onClick: (event, array) => {
                },
                position: 'top',
                labels: {
                    padding: 20,
                    boxWidth: 12,
                    boxHeight: 12,
                },
                display: false,
            },
            tooltip: {
                callbacks: tooltipCallbacks
            },
        },
    }
    return chartOptions;
}

function labelContext(context: TooltipItem<"bar">, chartSelectedProperty: EarningsChartPropertySelection): string {
    return earningsChartLabelContext(context, chartSelectedProperty);
}
function footerContext(context: TooltipItem<"bar">[]): string {
    const item = context[0];
    return '';
}
function titleContext(context: TooltipItem<"bar">[], xAxisLabels: string[]): string {
    return xAxisLabels[context[0].dataIndex];
}
