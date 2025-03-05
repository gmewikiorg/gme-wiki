import { EarningsResultInterface } from "./earnings-result.interface";

export class EarningsResult{
    private _data: EarningsResultInterface;
    constructor(data: EarningsResultInterface){
        this._data = data;
    }

    public get data(): EarningsResultInterface { return this._data;}

    public get fiscalYear(): number { return this._data.fiscalYear; }
    //quarter column
    public get filingDateYYYYMMDD(): string | null { return this._data.filingDateYYYYMMDD; }
    public get reportDateYYYYMMDD(): string { return this._data.reportDateYYYYMMDD; }
    public get revenue(): number { return this._data.revenue; }
    public get costOfSales(): number { return this._data.costOfSales; }
    public get grossProfit(): number { return this._data.grossProfit; }
    public get sga(): number { return this._data.sga; }
    public get operatingIncome(): number { return this._data.operatingIncome; }
    public get interestIncome(): number { return this._data.interestIncome; }
    public get ebit(): number { return this._data.ebit; }
    public get netEarnings(): number { return this._data.netEarnings; }
    public get netEPS(): number { return this._data.netEPS; }
    public get weightedAverageSharesOutstanding(): number { return this._data.weightedAverageSharesOutstanding; }
    public get totalAssets(): number { return this._data.totalAssets; }
    public get totalDebt(): number { return this._data.totalDebt; }
    public get totalLiabilities(): number { return this._data.totalLiabilities; }
    public get stockholdersEquity(): number { return this._data.stockholdersEquity; }
    public get storeCount(): number { return this._data.storeCount; }
    public get reportingPeriod(): 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'FY' { return this._data.reportingPeriod; }
    public get drs(): number { return this._data.drs; }
    public get url(): string { return this._data.url; }

}