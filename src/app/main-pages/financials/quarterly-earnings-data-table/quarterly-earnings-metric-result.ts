import { ColorPicker } from "../../../shared/color-picker.class";
import { EarningsResult } from "../earnings-results/earnings-result.class";

export interface QuarterlyEarningsMetricResult {
    raw: number;
    formatted: string;
    isPositive: boolean;
    background: string;
}

export type MetricFormatter = (er: EarningsResult, allResults: EarningsResult[]) => QuarterlyEarningsMetricResult;

const green: string = 'rgba(0, 255, 0, 0.1)';
const red: string = 'rgba(255, 0, 0, 0.1)';

export const quarterlyResultsProperties: Record<string, MetricFormatter> = {
    'Net Income': (er) => {
        const raw = er.netEarnings;
        const isPositive = raw >= 0;
        return {
            raw,
            formatted: isPositive ? '$' + (raw / 1_000_000).toFixed(0) + 'M' : '-$' + (Math.abs(raw) / 1_000_000).toFixed(0) + 'M',
            isPositive,
            background: isPositive ? green : red,
        };
    },
    'Revenue': (er, allResults) => {
        const raw = er.revenue;
        const isPositive = raw >= 0;
        const revenueValues = allResults.map(r => r.revenue)
        const minMax = ColorPicker.getMinMax(revenueValues);
        const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, raw);
        return {
            raw,
            formatted: '$' + (raw / 1_000_000_000).toFixed(1) + 'B',
            isPositive,
            background: color,
        };
    },
    'Net Profit Margin': (er) => {
        const raw = er.netEarnings / er.revenue;
        const isPositive = raw >= 0;
        return {
            raw,
            formatted: (raw * 100).toFixed(1) + '%',
            isPositive,
            background: isPositive ? green : red,
        };
    },
    'Gross Profit': (er, allResults) => {
        const raw = er.grossProfit;
        const isPositive = raw >= 0;
        const gpValues = allResults.map(r => r.grossProfit)
        const minMax = ColorPicker.getMinMax(gpValues);
        const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, raw);
        let formatted = '$' + (raw / 1_000_000).toFixed(0) + 'M';
        if (er.reportingPeriod === 'FY') {
            formatted = '$' + (raw / 1_000_000_000).toFixed(1) + 'B';
        }
        return {
            raw,
            formatted: formatted,
            isPositive,
            background: color,
        };
    },
    'Gross Margin': (er, allResults) => {
        const raw = er.grossProfit / er.revenue;
        const isPositive = raw >= 0;
        const gmValues = allResults.map(r => r.grossProfit / r.revenue)
        const minMax = ColorPicker.getMinMax(gmValues);
        const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, raw);
        return {
            raw,
            formatted: (raw * 100).toFixed(1) + '%',
            isPositive,
            background: color,
        };
    },
    'Operating Income': (er) => {
        const raw = er.operatingIncome;
        const isPositive = raw >= 0;
        return {
            raw,
            formatted: isPositive ? '$' + (raw / 1_000_000).toFixed(0) + 'M' : '-$' + (Math.abs(raw) / 1_000_000).toFixed(0) + 'M',
            isPositive,
            background: isPositive ? green : red,
        };
    },
    'SG&A Expenses': (er, allResults) => {
        const raw = er.sga;
        const isPositive = raw >= 0;
        const sgaValues = allResults.map(r => r.sga)
        const minMax = ColorPicker.getMinMax(sgaValues);
        const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, raw, true);
        let formatted = '$' + (raw / 1_000_000).toFixed(0) + 'M';
        if (er.reportingPeriod === 'FY') {
            formatted = '$' + (raw / 1_000_000_000).toFixed(1) + 'B';
        }
        return {
            raw,
            formatted: formatted,
            isPositive,
            background: color,
        };
    },
    'Interest Income': (er) => {
        const raw = er.interestIncome;
        const isPositive = raw >= 0;
        return {
            raw,
            formatted: isPositive ? '$' + (raw / 1_000_000).toFixed(0) + 'M' : '-$' + (Math.abs(raw) / 1_000_000).toFixed(0) + 'M',
            isPositive,
            background: isPositive ? green : red,
        };
    },
    "Stockholders' Equity": (er, allResults) => {
        const raw = er.stockholdersEquity;
        const isPositive = raw >= 0;
        const seValues = allResults.map(r => r.stockholdersEquity)
        const minMax = ColorPicker.getMinMax(seValues);
        const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, raw);
        return {
            raw,
            formatted: (raw / 1_000_000_000).toFixed(1) + 'B',
            isPositive,
            background: color,
        };
    },
    'Earnings per Share': (er, allResults) => {
        const raw = er.netEPS;
        const isPositive = raw >= 0;
        return {
            raw,
            formatted: "$" + (raw).toFixed(2),
            isPositive,
            background: isPositive ? green : red,
        };
    },
    'Book Value per Share': (er, allResults) => {
        const raw = er.stockholdersEquity / er.weightedAverageSharesOutstanding;
        const isPositive = raw >= 0;
        const bvpsValues = allResults.map(r => r.stockholdersEquity / r.weightedAverageSharesOutstanding)
        const minMax = ColorPicker.getMinMax(bvpsValues);
        const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, raw);
        return {
            raw,
            formatted: "$" + (raw).toFixed(2),
            isPositive,
            background: color,
        };
    },
    'Hardware Sales': (er, allResults) => {
        const raw = er.hardwareRevenue;
        const isPositive = raw >= 0;
        const hardwareValues = allResults.map(r => r.hardwareRevenue)
        const minMax = ColorPicker.getMinMax(hardwareValues);
        const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, raw);
        return {
            raw,
            formatted: raw === 0 ? '' : '$' + (raw / 1_000_000_000).toFixed(1) + 'B',
            isPositive,
            background: color,
        };
    },
    'Hardware Sales as Percent of Total': (er, allResults) => {
        const raw = er.hardwareRevenue / er.revenue;
        const isPositive = raw >= 0;
        const hardwareValues = allResults.map(r => r.hardwareRevenue / r.revenue)
        const minMax = ColorPicker.getMinMax(hardwareValues);
        const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, raw);
        return {
            raw,
            formatted: raw === 0 ? '' : ((raw * 100).toFixed(1) + '%'),
            isPositive,
            background: color,
        };
    },
    'Software Sales': (er, allResults) => {
        const raw = er.softwareRevenue;
        const isPositive = raw >= 0;
        const softwareValues = allResults.map(r => r.softwareRevenue)
        const minMax = ColorPicker.getMinMax(softwareValues);
        const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, raw);
        return {
            raw,
            formatted: raw === 0 ? '' : '$' + (raw / 1_000_000_000).toFixed(1) + 'B',
            isPositive,
            background: color,
        };
    },
    'Software Sales as Percent of Total': (er, allResults) => {
        const raw = er.softwareRevenue / er.revenue;
        const isPositive = raw >= 0;
        const softwareValues = allResults.map(r => r.softwareRevenue / r.revenue)
        const minMax = ColorPicker.getMinMax(softwareValues);
        const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, raw);
        return {
            raw,
            formatted: raw === 0 ? '' : ((raw * 100).toFixed(1) + '%'),
            isPositive,
            background: color,
        };
    },
    'Collectibles Sales': (er, allResults) => {
        const raw = er.collectiblesRevenue;
        const isPositive = raw >= 0;
        const collectiblesValues = allResults.map(r => r.collectiblesRevenue)
        const minMax = ColorPicker.getMinMax(collectiblesValues);
        const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, raw);
        return {
            raw,
            formatted: raw === 0 ? '' : '$' + (raw / 1_000_000_000).toFixed(1) + 'B',
            isPositive,
            background: color,
        };
    },
    'Collectibles Sales as Percent of Total': (er, allResults) => {
        const raw = er.collectiblesRevenue / er.revenue;
        const isPositive = raw >= 0;
        const collectiblesValues = allResults.map(r => r.collectiblesRevenue / r.revenue)
        const minMax = ColorPicker.getMinMax(collectiblesValues);
        const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, raw);
        return {
            raw,
            formatted: raw === 0 ? '' : ((raw * 100).toFixed(1) + '%'),
            isPositive,
            background: color,
        };
    },
};
