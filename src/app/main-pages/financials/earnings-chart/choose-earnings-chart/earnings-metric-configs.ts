import { EarningsResult } from "../../earnings-results/earnings-result.class";
import { EarningsChartPropertySelection } from "./earnings-chart-property-selection.enum";

/** a single metric */
export enum EarningsMetric {
    REVENUE = 'REVENUE',
    NET_INCOME = 'NET_INCOME',
    NET_PROFIT_MARGIN = 'NET_PROFIT_MARGIN',

    COST_OF_SALES = 'COST_OF_SALES',
    GROSS_PROFIT = 'GROSS_PROFIT',

    STORE_COUNT = 'STORE_COUNT',
    REVENUE_PER_STORE = 'REVENUE_PER_STORE',

    OPERATING_INCOME = 'OPERATING_INCOME',
    SGA = 'SGA',

    INTEREST_INCOME = 'INTEREST_INCOME',
    STOCKHOLDERS_EQUITY = 'STOCKHOLDERS_EQUITY',

    HARDWARE_REVENUE = 'HARDWARE_REVENUE',
    SOFTWARE_REVENUE = 'SOFTWARE_REVENUE',
    COLLECTIBLES_REVENUE = 'COLLECTIBLES_REVENUE',

    HARDWARE_REVENUE_PERCENTAGE = 'HARDWARE_REVENUE_PERCENTAGE',
    SOFTWARE_REVENUE_PERCENTAGE = 'SOFTWARE_REVENUE_PERCENTAGE',
    COLLECTIBLES_REVENUE_PERCENTAGE = 'COLLECTIBLES_REVENUE_PERCENTAGE',

    EPS = 'EPS',
    BOOK_VALUE_PER_SHARE = 'BOOK_VALUE_PER_SHARE',
}


export const SELECTION_TO_METRICS: Record<EarningsChartPropertySelection, EarningsMetric[]> = {
    [EarningsChartPropertySelection.REVENUE]: [EarningsMetric.REVENUE,],
    [EarningsChartPropertySelection.REVENUE_VS_NET_INCOME]: [EarningsMetric.REVENUE, EarningsMetric.NET_INCOME,],
    [EarningsChartPropertySelection.REVENUE_VS_COST]: [EarningsMetric.REVENUE, EarningsMetric.COST_OF_SALES,],
    [EarningsChartPropertySelection.NET_PROFIT_MARGIN]: [EarningsMetric.NET_PROFIT_MARGIN],
    [EarningsChartPropertySelection.REVENUE_VS_GROSS_PROFIT]: [EarningsMetric.REVENUE, EarningsMetric.GROSS_PROFIT,],
    [EarningsChartPropertySelection.REVENUE_VS_STORES]: [EarningsMetric.REVENUE, EarningsMetric.STORE_COUNT],
    [EarningsChartPropertySelection.REVENUE_PER_STORES]: [EarningsMetric.REVENUE_PER_STORE,],
    [EarningsChartPropertySelection.REVENUE_TYPE]: [
        EarningsMetric.HARDWARE_REVENUE,
        EarningsMetric.SOFTWARE_REVENUE,
        EarningsMetric.COLLECTIBLES_REVENUE],
    [EarningsChartPropertySelection.REVENUE_TYPE_PERCENTAGE]: [
        EarningsMetric.HARDWARE_REVENUE_PERCENTAGE,
        EarningsMetric.SOFTWARE_REVENUE_PERCENTAGE,
        EarningsMetric.COLLECTIBLES_REVENUE_PERCENTAGE,],
    [EarningsChartPropertySelection.NET_INCOME]: [EarningsMetric.NET_INCOME],
    [EarningsChartPropertySelection.INTEREST_INCOME]: [EarningsMetric.INTEREST_INCOME],
    [EarningsChartPropertySelection.STOCKHOLDERS_EQUITY]: [EarningsMetric.STOCKHOLDERS_EQUITY],
    [EarningsChartPropertySelection.OPERATING_INCOME]: [EarningsMetric.OPERATING_INCOME],
    [EarningsChartPropertySelection.GROSS_PROFIT_VS_SGA]: [EarningsMetric.GROSS_PROFIT, EarningsMetric.SGA],
    [EarningsChartPropertySelection.OPERATIONS_VS_SGA]: [EarningsMetric.OPERATING_INCOME, EarningsMetric.SGA],
    [EarningsChartPropertySelection.EPS]: [EarningsMetric.EPS],
    [EarningsChartPropertySelection.BOOK_VALUE_PER_SHARE]: [EarningsMetric.BOOK_VALUE_PER_SHARE]
};


export type EarningsMetricConfig = {
    metric: EarningsMetric;
    colorScheme: 'BLUE' | 'RED_GREEN' | 'ORANGE' | 'GREEN';
    label: string;
    labelNegative: string;
    tickScaleAnnually: 1000000000 | 1000000 | 1000 | 100 | 1;
    tickScaleQuarterly: 1000000000 | 1000000 | 1000 | 100 | 1;
    minYAnnual: number;
    minYQuarter: number;
    value: (r: EarningsResult) => number;
}

// Create a lookup, keyed by enum, returning the config
export const EARNINGS_METRIC_CONFIGS: Record<EarningsMetric, EarningsMetricConfig> = {
    [EarningsMetric.REVENUE]: {
        metric: EarningsMetric.REVENUE,
        colorScheme: 'BLUE',
        label: 'Revenue',
        labelNegative: 'Revenue',
        tickScaleAnnually: 1000000000,
        tickScaleQuarterly: 1000000000,
        minYAnnual: 0,
        minYQuarter: 0,
        value: r => r.revenue,
    },
    [EarningsMetric.NET_INCOME]: {
        metric: EarningsMetric.NET_INCOME,
        colorScheme: 'RED_GREEN',
        label: 'Net Income',
        labelNegative: 'Net Loss',
        tickScaleAnnually: 1000000,
        tickScaleQuarterly: 1000000,
        minYAnnual: -1000000000,
        minYQuarter: -500000000,
        value: r => r.netEarnings,
    },
    [EarningsMetric.NET_PROFIT_MARGIN]: {
        metric: EarningsMetric.NET_PROFIT_MARGIN,
        colorScheme: 'RED_GREEN',
        label: 'Net Profit Margin',
        labelNegative: 'Net Loss Margin',
        tickScaleAnnually: 100,
        tickScaleQuarterly: 100,
        minYAnnual: -10,
        minYQuarter: -35,
        value: r => (r.netEarnings / r.revenue) * 100,
    },
    [EarningsMetric.COST_OF_SALES]: {
        metric: EarningsMetric.COST_OF_SALES,
        colorScheme: 'ORANGE',
        label: 'Cost of Sales',
        labelNegative: 'Cost of Sales',
        tickScaleAnnually: 1000000000,
        tickScaleQuarterly: 1000000000,
        minYAnnual: 0,
        minYQuarter: 0,
        value: r => r.costOfSales,
    },
    [EarningsMetric.GROSS_PROFIT]: {
        metric: EarningsMetric.GROSS_PROFIT,
        colorScheme: 'GREEN',
        label: 'Gross Profit',
        labelNegative: 'Gross Profit',
        tickScaleAnnually: 1000000000,
        tickScaleQuarterly: 1000000,
        minYAnnual: 0,
        minYQuarter: 0,
        value: r => r.grossProfit,
    },
    [EarningsMetric.OPERATING_INCOME]: {
        metric: EarningsMetric.OPERATING_INCOME,
        colorScheme: 'RED_GREEN',
        label: 'Operating Income',
        labelNegative: 'Operating Loss',
        tickScaleAnnually: 1000000,
        tickScaleQuarterly: 1000000,
        minYAnnual: -800000000,
        minYQuarter: -500000000,
        value: r => r.operatingIncome,
    },
    [EarningsMetric.SGA]: {
        metric: EarningsMetric.SGA,
        colorScheme: 'ORANGE',
        label: 'SG&A Expenses',
        labelNegative: 'SG&A Expenses',
        tickScaleAnnually: 1000000000,
        tickScaleQuarterly: 1000000,
        minYAnnual: 0,
        minYQuarter: 0,
        value: r => r.sga,
    },
    [EarningsMetric.INTEREST_INCOME]: {
        metric: EarningsMetric.INTEREST_INCOME,
        colorScheme: 'RED_GREEN',
        label: 'Interest Income',
        labelNegative: 'Interest Expense',
        tickScaleAnnually: 1000000,
        tickScaleQuarterly: 1000000,
        minYAnnual: -80000000,
        minYQuarter: -30000000,
        value: r => r.interestIncome,

    },
    [EarningsMetric.STOCKHOLDERS_EQUITY]: {
        metric: EarningsMetric.STOCKHOLDERS_EQUITY,
        colorScheme: 'BLUE',
        label: "Stockholders' Equity",
        labelNegative: "Stockholders' Equity",
        tickScaleAnnually: 1000000000,
        tickScaleQuarterly: 1000000000,
        minYAnnual: 0,
        minYQuarter: 0,
        value: r => r.stockholdersEquity
    },
    [EarningsMetric.STORE_COUNT]: {
        metric: EarningsMetric.STORE_COUNT,
        colorScheme: 'ORANGE',
        label: "Store Count",
        labelNegative: "Store Count",
        tickScaleAnnually: 1000,
        tickScaleQuarterly: 1000,
        minYAnnual: 0,
        minYQuarter: 0,
        value: r => r.storeCount,
    },
    [EarningsMetric.REVENUE_PER_STORE]: {
        metric: EarningsMetric.REVENUE_PER_STORE,
        colorScheme: 'BLUE',
        label: "Revenue per store",
        labelNegative: "Reveue per store",
        tickScaleAnnually: 1000000,
        tickScaleQuarterly: 1000,
        minYAnnual: 0,
        minYQuarter: 0,
        value: r => r.revenue / r.storeCount,
    },

    [EarningsMetric.HARDWARE_REVENUE]: {
        metric: EarningsMetric.HARDWARE_REVENUE,
        colorScheme: 'BLUE',
        label: 'Hardware Revenue',
        labelNegative: 'Hardware Revenue',
        tickScaleAnnually: 1000000000,
        tickScaleQuarterly: 1000000,
        minYAnnual: 0,
        minYQuarter: 0,
        value: r => r.hardwareRevenue,
    },
    [EarningsMetric.HARDWARE_REVENUE_PERCENTAGE]: {
        metric: EarningsMetric.HARDWARE_REVENUE_PERCENTAGE,
        colorScheme: 'BLUE',
        label: 'Hardware Revenue %',
        labelNegative: 'Hardware Revenue %',
        tickScaleAnnually: 100,
        tickScaleQuarterly: 100,
        minYAnnual: 0,
        minYQuarter: 0,
        value: r => ((r.hardwareRevenue / r.revenue) * 100)
    },

    [EarningsMetric.SOFTWARE_REVENUE]: {
        metric: EarningsMetric.SOFTWARE_REVENUE,
        colorScheme: 'ORANGE',
        label: 'Software Revenue',
        labelNegative: 'Software Revenue',
        tickScaleAnnually: 1000000000,
        tickScaleQuarterly: 1000000,
        minYAnnual: 0,
        minYQuarter: 0,
        value: r => r.softwareRevenue,
    },
    [EarningsMetric.SOFTWARE_REVENUE_PERCENTAGE]: {
        metric: EarningsMetric.SOFTWARE_REVENUE_PERCENTAGE,
        colorScheme: 'ORANGE',
        label: 'Software Revenue %',
        labelNegative: 'Software Revenue %',
        tickScaleAnnually: 100,
        tickScaleQuarterly: 100,
        minYAnnual: 0,
        minYQuarter: 0,
        value: r => ((r.softwareRevenue / r.revenue) * 100)
    },

    [EarningsMetric.COLLECTIBLES_REVENUE]: {
        metric: EarningsMetric.COLLECTIBLES_REVENUE,
        colorScheme: 'GREEN',
        label: 'Collectibles Revenue',
        labelNegative: 'Collectibles Revenue',
        tickScaleAnnually: 1000000000,
        tickScaleQuarterly: 1000000,
        minYAnnual: 0,
        minYQuarter: 0,
        value: r => r.collectiblesRevenue,
    },
    [EarningsMetric.COLLECTIBLES_REVENUE_PERCENTAGE]: {
        metric: EarningsMetric.COLLECTIBLES_REVENUE_PERCENTAGE,
        colorScheme: 'GREEN',
        label: 'Collectibles Revenue %',
        labelNegative: 'Collectibles Revenue %',
        tickScaleAnnually: 100,
        tickScaleQuarterly: 100,
        minYAnnual: 0,
        minYQuarter: 0,
        value: r => ((r.collectiblesRevenue / r.revenue) * 100)
    },
    [EarningsMetric.EPS]: {
        metric: EarningsMetric.EPS,
        colorScheme: 'RED_GREEN',
        label: 'Earnings per Share',
        labelNegative: 'Loss per Share',
        tickScaleAnnually: 1,
        tickScaleQuarterly: 1,
        minYAnnual: -700,
        minYQuarter: -500,
        value: r => r.netEPS*100,
    },
    [EarningsMetric.BOOK_VALUE_PER_SHARE]: {
        metric: EarningsMetric.BOOK_VALUE_PER_SHARE,
        colorScheme: 'BLUE',
        label: 'Book Value per Share',
        labelNegative: 'Book Value per Share',
        tickScaleAnnually: 1,
        tickScaleQuarterly: 1,
        minYAnnual: 0,
        minYQuarter: 0,
        value: r => ((r.stockholdersEquity / r.weightedAverageSharesOutstanding) * 100)
    },
};