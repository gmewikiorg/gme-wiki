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

    public get year(): number { return this._year }

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
        const quarterlyResults: (EarningsResult | null)[] = [
            ...existingResults,
            ...Array(4 - existingResults.length).fill(null)
        ];
        this._q1 = new QuarterlyEarningsSummaryCell(quarterlyResults[0], currentMenuItem, quarterlyEarningsResults);
        this._q2 = new QuarterlyEarningsSummaryCell(quarterlyResults[1], currentMenuItem, quarterlyEarningsResults);
        this._q3 = new QuarterlyEarningsSummaryCell(quarterlyResults[2], currentMenuItem, quarterlyEarningsResults);
        this._q4 = new QuarterlyEarningsSummaryCell(quarterlyResults[3], currentMenuItem, quarterlyEarningsResults);
        this._fy = new QuarterlyEarningsSummaryCell(aggregateEarningsResult(quarterlyResults), currentMenuItem, allAggregateResults);
    }

}