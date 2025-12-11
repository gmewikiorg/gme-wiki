import { EarningsResult } from "../earnings-results/earnings-result.class";
import { EarningsResultInterface } from "../earnings-results/earnings-result.interface";

export function aggregateEarningsResult(quarterlyResultsForYear: (EarningsResult | null)[]): EarningsResult {
    let quarterlyResults = quarterlyResultsForYear.filter(result => result !== null);
    const aggregateYear: EarningsResultInterface = {
        fiscalYear: quarterlyResults[quarterlyResults.length - 1].fiscalYear,
        filingDateYYYYMMDD: quarterlyResults[quarterlyResults.length - 1].data.filingDateYYYYMMDD,
        reportDateYYYYMMDD: quarterlyResults[quarterlyResults.length - 1].data.reportDateYYYYMMDD,
        revenue: quarterlyResults.reduce((sum, quarter) => sum + quarter.revenue, 0),
        costOfSales: quarterlyResults.reduce((sum, quarter) => sum + quarter.costOfSales, 0),
        grossProfit: quarterlyResults.reduce((sum, quarter) => sum + quarter.grossProfit, 0),
        sga: quarterlyResults.reduce((sum, quarter) => sum + quarter.sga, 0),
        operatingIncome: quarterlyResults.reduce((sum, quarter) => sum + quarter.operatingIncome, 0),
        interestIncome: quarterlyResults.reduce((sum, quarter) => sum + quarter.interestIncome, 0),
        ebit: quarterlyResults.reduce((sum, quarter) => sum + quarter.ebit, 0),
        incomeTaxExpense: quarterlyResults.reduce((sum, quarter) => sum + quarter.data.incomeTaxExpense, 0),
        netEarnings: quarterlyResults.reduce((sum, quarter) => sum + quarter.netEarnings, 0),
        netEPS: quarterlyResults.reduce((sum, quarter) => sum + quarter.netEarnings, 0) / quarterlyResults[quarterlyResults.length-1].weightedAverageSharesOutstanding,
        weightedAverageSharesOutstanding: quarterlyResults[quarterlyResults.length - 1].data.weightedAverageSharesOutstanding,
        totalAssets: quarterlyResults[quarterlyResults.length - 1].data.totalAssets,
        totalDebt: quarterlyResults[quarterlyResults.length - 1].data.totalDebt,
        totalLiabilities: quarterlyResults[quarterlyResults.length - 1].data.totalLiabilities,
        stockholdersEquity: quarterlyResults[quarterlyResults.length - 1].data.stockholdersEquity,
        storeCount: quarterlyResults[quarterlyResults.length - 1].data.storeCount,
        revenueHardware: quarterlyResults.reduce((sum, quarter) => sum + quarter.data.revenueHardware, 0),
        revenueSoftware: quarterlyResults.reduce((sum, quarter) => sum + quarter.data.revenueSoftware, 0),
        revenueCollectibles: quarterlyResults.reduce((sum, quarter) => sum + quarter.data.revenueCollectibles, 0),
        revenueOther: quarterlyResults.reduce((sum, quarter) => sum + quarter.data.revenueOther, 0),
        drs: quarterlyResults[quarterlyResults.length - 1].data.drs,
        url: quarterlyResults[quarterlyResults.length - 1].data.url,
        reportingPeriod: 'FY',
    }
    return new EarningsResult(aggregateYear);
}