import dayjs from "dayjs";
import { ColorPicker } from "../../../shared/color-picker.class";
import { EarningsResult } from "../earnings-results/earnings-result.class";
import { EarningsResultInterface } from "../earnings-results/earnings-result.interface";
import { QuarterlyEarningsSummaryCell } from "./quarterly-earnings-summary-cell.class";
import { aggregateEarningsResult } from "./aggregate-earnings-result";

export class QuarterlyEarningsSummaryRow {

    private _year: number;

    private _q1: QuarterlyEarningsSummaryCell;
    private _q2: QuarterlyEarningsSummaryCell;
    private _q3: QuarterlyEarningsSummaryCell;
    private _q4: QuarterlyEarningsSummaryCell;
    private _fy: QuarterlyEarningsSummaryCell;

    private _quarterlyResults: EarningsResult[] = [];

    public get year(): number { return this._year }
    private get startYear(): number { return 2018; }

    public get q1(): QuarterlyEarningsSummaryCell { return this._q1; }
    public get q2(): QuarterlyEarningsSummaryCell { return this._q2; }
    public get q3(): QuarterlyEarningsSummaryCell { return this._q3; }
    public get q4(): QuarterlyEarningsSummaryCell { return this._q4; }
    public get fy(): QuarterlyEarningsSummaryCell { return this._fy; }

    public get allCells(): QuarterlyEarningsSummaryCell[] {
        return [
            this.q1, this.q2, this.q3, this.q4, this.fy
        ]
    };


    constructor(fiscalYear: number, quarterlyEarningsResults: EarningsResult[], allAggregateResults: EarningsResult[], currentMenuItem: string) {
        this._year = fiscalYear;
        const existingResults = quarterlyEarningsResults.filter(result => result.fiscalYear === fiscalYear).reverse();
        this._quarterlyResults = existingResults;
        const quarterlyResults: (EarningsResult | null)[] = [
            ...existingResults,
            ...Array(4 - existingResults.length).fill(null)
        ];

        const referenceResults = this._quarterlyResults.filter(r => r.fiscalYear >= this.startYear);

        this._q1 = new QuarterlyEarningsSummaryCell(quarterlyResults[0], currentMenuItem, quarterlyEarningsResults);
        this._q2 = new QuarterlyEarningsSummaryCell(quarterlyResults[1], currentMenuItem, quarterlyEarningsResults);
        this._q3 = new QuarterlyEarningsSummaryCell(quarterlyResults[2], currentMenuItem, quarterlyEarningsResults);
        this._q4 = new QuarterlyEarningsSummaryCell(quarterlyResults[3], currentMenuItem, quarterlyEarningsResults);
        this._fy = new QuarterlyEarningsSummaryCell(aggregateEarningsResult(quarterlyResults), currentMenuItem, allAggregateResults);
    }


    // public styler(currentProperty: string, currentResult: EarningsResult | null): any {

    //     if (currentResult !== null) {
    //         if (currentProperty === 'Net Income') {
    //             const value = currentResult.netEarnings;
    //             if (value > 0) {
    //                 return {
    //                     'backgroundColor': 'rgba(0, 255, 0, 0.1)',
    //                 };
    //             } else {
    //                 return {
    //                     'backgroundColor': 'rgba(255, 0, 0, 0.1)',
    //                 };
    //             }
    //         } else if (currentProperty === 'Revenue') {
    //             const revenueValues = this._quarterlyResults.filter(result => result.fiscalYear >= this.startYear).map(r => r.revenue)
    //             const minMax = ColorPicker.getMinMax(revenueValues);
    //             const revenueValue = currentResult.revenue
    //             const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, revenueValue);
    //             return {
    //                 'backgroundColor': color,
    //             };
    //         } else if (currentProperty === 'Net Profit Margin') {
    //             const value = currentResult.netEarnings / currentResult.revenue;
    //             if (value > 0) {
    //                 return {
    //                     'backgroundColor': 'rgba(0, 255, 0, 0.1)',
    //                 };
    //             } else {
    //                 return {
    //                     'backgroundColor': 'rgba(255, 0, 0, 0.1)',
    //                 };
    //             }
    //         } else if (currentProperty === 'Hardware Sales') {
    //             const hardwareValues = this._quarterlyResults
    //                 .filter(result => result.fiscalYear >= this.startYear)
    //                 .filter(result => result.reportingPeriod === currentResult.reportingPeriod)
    //                 .map(r => r.hardwareRevenue)
    //             const minMax = ColorPicker.getMinMax(hardwareValues);
    //             const hardwareValue = currentResult.hardwareRevenue
    //             const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, hardwareValue);
    //             return {
    //                 'backgroundColor': color,
    //             };
    //         } else if (currentProperty === 'Hardware Sales as Percent of Total') {
    //             const hardwarePercentValues = this._quarterlyResults
    //                 .filter(result => result.fiscalYear >= this.startYear)
    //                 .map(r => ((r.hardwareRevenue / r.revenue) * 100))
    //             const minMax = ColorPicker.getMinMax(hardwarePercentValues);
    //             const hardwareValue = ((currentResult.hardwareRevenue / currentResult.revenue) * 100);
    //             const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, hardwareValue);
    //             return {
    //                 'backgroundColor': color,
    //             };
    //         } else if (currentProperty === 'Software Sales') {
    //             const softwareValues = this._quarterlyResults
    //                 .filter(result => result.fiscalYear >= this.startYear)
    //                 .filter(result => result.reportingPeriod === currentResult.reportingPeriod)
    //                 .map(r => r.softwareRevenue)
    //             const minMax = ColorPicker.getMinMax(softwareValues);
    //             const softwareValue = currentResult.softwareRevenue
    //             const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, softwareValue);
    //             return {
    //                 'backgroundColor': color,
    //             };
    //         } else if (currentProperty === 'Software Sales as Percent of Total') {
    //             const softwarePercentValues = this._quarterlyResults
    //                 .filter(result => result.fiscalYear >= this.startYear)
    //                 .map(r => ((r.softwareRevenue / r.revenue) * 100))
    //             const minMax = ColorPicker.getMinMax(softwarePercentValues);
    //             const softwareValue = ((currentResult.softwareRevenue / currentResult.revenue) * 100);
    //             const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, softwareValue);
    //             return {
    //                 'backgroundColor': color,
    //             };
    //         } else if (currentProperty === 'Collectibles Sales') {
    //             const collectiblesValues = this._quarterlyResults
    //                 .filter(result => result.fiscalYear >= this.startYear)
    //                 .filter(result => result.reportingPeriod === currentResult.reportingPeriod)
    //                 .map(r => r.collectiblesRevenue)
    //             const minMax = ColorPicker.getMinMax(collectiblesValues);
    //             const collectiblesValue = currentResult.collectiblesRevenue
    //             const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, collectiblesValue);
    //             return {
    //                 'backgroundColor': color,
    //             };
    //         } else if (currentProperty === 'Collectibles Sales as Percent of Total') {
    //             const collectiblesPercentValues = this._quarterlyResults
    //                 .filter(result => result.fiscalYear >= this.startYear)
    //                 .map(r => ((r.collectiblesRevenue / r.revenue) * 100))
    //             const minMax = ColorPicker.getMinMax(collectiblesPercentValues);
    //             const collectiblesValue = ((currentResult.collectiblesRevenue / currentResult.revenue) * 100);
    //             const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, collectiblesValue);
    //             return {
    //                 'backgroundColor': color,
    //             };
    //         } else if (currentProperty === 'Gross Profit') {
    //             const grossProfitValues = this._quarterlyResults
    //                 .filter(result => result.fiscalYear >= this.startYear)
    //                 .filter(result => result.reportingPeriod === currentResult.reportingPeriod)
    //                 .map(r => r.grossProfit)
    //             const minMax = ColorPicker.getMinMax(grossProfitValues);
    //             const grossProfitValue = currentResult.grossProfit;
    //             const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, grossProfitValue);
    //             return {
    //                 'backgroundColor': color,
    //             };
    //         } else if (currentProperty === 'Gross Margin') {
    //             const grossMarginValues = this._quarterlyResults
    //                 .filter(result => result.fiscalYear >= this.startYear)
    //                 .filter(result => result.reportingPeriod === currentResult.reportingPeriod)
    //                 .map(r => ((r.grossProfit / r.revenue) * 100))
    //             const minMax = ColorPicker.getMinMax(grossMarginValues);
    //             const grossMarginValue = (currentResult.grossProfit / currentResult.revenue) * 100;
    //             const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, grossMarginValue);
    //             return {
    //                 'backgroundColor': color,
    //             };
    //         } else if (currentProperty === 'Operating Income') {
    //             const oiValues = this._quarterlyResults
    //                 .filter(result => result.fiscalYear >= this.startYear)
    //                 .map(r => r.operatingIncome)
    //             const minMax = ColorPicker.getMinMax(oiValues);
    //             const operatingIncomeValue = currentResult.operatingIncome;
    //             const color = ColorPicker.getColorZeroBased(operatingIncomeValue);
    //             return {
    //                 'backgroundColor': color,
    //             };
    //         } else if (currentProperty === 'SG&A Expense') {
    //             const sgaValues = this._quarterlyResults
    //                 .filter(result => result.fiscalYear >= this.startYear)
    //                 .filter(result => result.reportingPeriod === currentResult.reportingPeriod)
    //                 .map(r => r.sga)
    //             const minMax = ColorPicker.getMinMax(sgaValues);
    //             const sgaValue = currentResult.sga;
    //             const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, sgaValue, true);
    //             return {
    //                 'backgroundColor': color,
    //             };
    //         } else if (currentProperty === 'Interest Income') {
    //             const iiValues = this._quarterlyResults
    //                 .filter(result => result.fiscalYear >= this.startYear)
    //                 .map(r => r.interestIncome)
    //             const minMax = ColorPicker.getMinMax(iiValues);
    //             const interestIncomeValue = currentResult.interestIncome;
    //             const color = ColorPicker.getColorZeroBased(interestIncomeValue);
    //             return {
    //                 'backgroundColor': color,
    //             };
    //         } else if (currentProperty === "Stockholders' Equity") {
    //             const seValues = this._quarterlyResults
    //                 .filter(result => result.fiscalYear >= this.startYear)
    //                 .filter(result => result.reportingPeriod === currentResult.reportingPeriod)
    //                 .map(r => r.stockholdersEquity)
    //             const minMax = ColorPicker.getMinMax(seValues);
    //             const seValue = currentResult.stockholdersEquity;
    //             const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, seValue);
    //             return {
    //                 'backgroundColor': color,
    //             };
    //         } else if (currentProperty === 'Earnings per Share') {
    //             const value = currentResult.netEPS;
    //             if (value > 0) {
    //                 return {
    //                     'backgroundColor': 'rgba(0, 255, 0, 0.1)',
    //                 };
    //             } else {
    //                 return {
    //                     'backgroundColor': 'rgba(255, 0, 0, 0.1)',
    //                 };
    //             }
    //         } else if (currentProperty === 'Book Value per Share') {
    //             // const value = earningsResult.stockholdersEquity / earningsResult.weightedAverageSharesOutstanding;
    //             // if (value > 0) {
    //             //   return {
    //             //     'backgroundColor': 'rgba(0, 255, 0, 0.05)',
    //             //   };
    //             // } else {
    //             //   return {
    //             //     'backgroundColor': 'rgba(255, 0, 0, 0.1)',
    //             //   };
    //             // }

    //             const bvpsValues = this._quarterlyResults
    //                 .filter(result => result.fiscalYear >= this.startYear)
    //                 .filter(result => result.reportingPeriod === currentResult.reportingPeriod)
    //                 .map(r => r.stockholdersEquity / r.weightedAverageSharesOutstanding)
    //             const minMax = ColorPicker.getMinMax(bvpsValues);
    //             const seValue = currentResult.stockholdersEquity / currentResult.weightedAverageSharesOutstanding;
    //             const color = ColorPicker.getNonRedBGColor(minMax.min, minMax.max, seValue);
    //             return {
    //                 'backgroundColor': color,
    //             };
    //         }
    //     }



    // }


}