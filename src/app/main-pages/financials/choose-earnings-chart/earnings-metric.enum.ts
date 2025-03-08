
/** a single metric */
export enum EarningsMetric {
    REVENUE = 'REVENUE',
    NET_INCOME = 'NET_INCOME',
    COST_OF_SALES = 'COST_OF_SALES',
    GROSS_PROFIT = 'GROSS_PROFIT',

    STORE_COUNT = 'STORE_COUNT',

    OPERATING_INCOME = 'OPERATING_INCOME',
    SGA = 'SGA',

    INTEREST_INCOME = 'INTEREST_INCOME',
    STOCKHOLDERS_EQUITY = 'STOCKHOLDERS_EQUITY',
}


export interface EarningsMetricConfig {
    colorScheme: 'BLUE' | 'RED_GREEN' | 'ORANGE' | 'GREEN';
    label: string;
    labelNegative: string;
    tickScaleAnnually: 1000000000 | 1000000 | 1000;
    tickScaleQuarterly: 1000000000 | 1000000 | 1000;
    minYAnnual: number;
    minYQuarter: number;

}

// Create a lookup, keyed by enum, returning the config
export const EARNINGS_METRIC_CONFIG: Record<EarningsMetric, EarningsMetricConfig> = {
    [EarningsMetric.REVENUE]: {
        colorScheme: 'BLUE',
        label: 'Revenue',
        labelNegative: 'Revenue',
        tickScaleAnnually: 1000000000,
        tickScaleQuarterly: 1000000000,
        minYAnnual: 0,
        minYQuarter: 0,

    },
    [EarningsMetric.NET_INCOME]: {
        colorScheme: 'RED_GREEN',
        label: 'Net Income',
        labelNegative: 'Net Loss',
        tickScaleAnnually: 1000000,
        tickScaleQuarterly: 1000000,
        minYAnnual: -1000000000,
        minYQuarter: -175000000,

    },
    [EarningsMetric.COST_OF_SALES]: {
        colorScheme: 'ORANGE',
        label: 'Cost of Sales',
        labelNegative: 'Cost of Sales',
        tickScaleAnnually: 1000000000,
        tickScaleQuarterly: 1000000000,
        minYAnnual: 0,
        minYQuarter: 0,
    },
    [EarningsMetric.GROSS_PROFIT]: {
        colorScheme: 'GREEN',
        label: 'Gross Profit',
        labelNegative: 'Gross Profit',
        tickScaleAnnually: 1000000000,
        tickScaleQuarterly: 1000000,
        minYAnnual: 0,
        minYQuarter: 0,
    },
    [EarningsMetric.OPERATING_INCOME]: {
        colorScheme: 'RED_GREEN',
        label: 'Operating Income',
        labelNegative: 'Operating Loss',
        tickScaleAnnually: 1000000,
        tickScaleQuarterly: 1000000,
        minYAnnual: -800000000,
        minYQuarter: -200000000,
    },
    [EarningsMetric.SGA]: {
        colorScheme: 'ORANGE',
        label: 'SG&A Expenses',
        labelNegative: 'SG&A Expenses',
        tickScaleAnnually: 1000000000,
        tickScaleQuarterly: 1000000,
        minYAnnual: 0,
        minYQuarter: 0,
    },
    [EarningsMetric.INTEREST_INCOME]: {
        colorScheme: 'RED_GREEN',
        label: 'Interest Income',
        labelNegative: 'Interest Expense',
        tickScaleAnnually: 1000000,
        tickScaleQuarterly: 1000000,
        minYAnnual: -80000000,
        minYQuarter: -30000000,

    },
    [EarningsMetric.STOCKHOLDERS_EQUITY]: {
        colorScheme: 'BLUE',
        label: "Stockholders' Equity",
        labelNegative: "Stockholders' Equity",
        tickScaleAnnually: 1000000000,
        tickScaleQuarterly: 1000000000,
        minYAnnual: 0,
        minYQuarter: 0,
    },
    [EarningsMetric.STORE_COUNT]: {
        colorScheme: 'ORANGE',
        label: "Store Count",
        labelNegative: "Store Count",
        tickScaleAnnually: 1000,
        tickScaleQuarterly: 1000,
        minYAnnual: 0,
        minYQuarter: 0,
    },
};