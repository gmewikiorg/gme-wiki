import { ColorPicker } from "../../../shared/color-picker.class";
import { EarningsResult } from "../earnings-results/earnings-result.class";
import { quarterlyResultsProperties } from "./quarterly-earnings-metric-result";

export class QuarterlyEarningsSummaryCell {

    private _hasResult: boolean = false;
    private _earningsResult: EarningsResult | null = null;
    private _url: string = '';
    private _backgroundColor: string = '';

    public get hasResult(): boolean { return this._hasResult; }
    public get earningsResult(): EarningsResult | null { return this._earningsResult; }
    public get url(): string { return this._url; }
    public get backgroundColor(): string { return this._backgroundColor; }

    constructor(earningsResult: EarningsResult | null, currentMenuItem: string, allEarningsResults: EarningsResult[]) {
        this._earningsResult = earningsResult;
        const metricsResults = quarterlyResultsProperties[currentMenuItem];
        if (earningsResult !== null) {
            this._hasResult = true;
            this._url = earningsResult.url;
            this._backgroundColor = metricsResults(earningsResult, allEarningsResults).background;
        }
    }


}