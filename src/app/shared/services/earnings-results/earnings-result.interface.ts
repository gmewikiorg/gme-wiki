export interface EarningsResultInterface {
    fiscalYear: number;
    filingDateYYYYMMDD: string;
    reportDateYYYYMMDD: string;
    revenue: number;
    costOfSales: number;
    grossProfit: number;
    sga: number;
    operatingIncome: number;
    interestIncome: number;
    ebit: number;
    netEarnings: number;
    netEPS: number;
    weightedAverageSharesOutstanding: number;
    totalAssets: number;
    totalDebt: number;
    totalLiabilities: number;
    stockholdersEquity: number;
    drs: number;
    url: string;
    reportingPeriod: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'FY';
}