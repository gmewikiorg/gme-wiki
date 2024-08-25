import { EarningsResultInterface } from "./earnings-result.interface";

export class EarningsResult{
    private _data: EarningsResultInterface;
    constructor(data: EarningsResultInterface){
        this._data = data;
    }

    public get data(): EarningsResultInterface { return this._data;}

    public get fiscalYear(): number { return this._data.fiscalYear; }
    //quarter column
    public get filingDateYYYYMMDD(): string { return this._data.filingDateYYYYMMDD; }
    public get reportDateYYYYMMDD(): string { return this._data.reportDateYYYYMMDD; }
    public get revenue(): number { return this._data.revenue; }
    public get costOfSales(): number { return this._data.costOfSales; }
    public get grossProfit(): number { return this._data.grossProfit; }
    public get sga(): number { return this._data.sga; }
    public get depreciationAmortization(): number { return this._data.depreciationAmortization; }
    public get amortizationGoodWill(): number { return this._data.amortizationGoodWill; }
    public get goodwillImpairments(): number { return this._data.goodwillImpairments; }
    public get assetImpairments(): number { return this._data.assetImpairments; }
    public get gainOnSale(): number { return this._data.gainOnSale; }
    public get mergerExpenses(): number { return this._data.mergerExpenses; }
    public get operatingExpenses(): number { return this._data.operatingExpenses; }
    public get otherLoss(): number { return this._data.otherLoss; }
    public get interestIncome(): number { return this._data.interestIncome; }
    public get debtExtinguishment(): number { return this._data.debtExtinguishment; }
    public get mergerInterestExpense(): number { return this._data.mergerInterestExpense; }
    public get earningsBeforeIncomeTax(): number { return this._data.earningsBeforeIncomeTax; }
    public get incomeTaxExpense(): number { return this._data.incomeTaxExpense; }
    public get netEarnings(): number { return this._data.netEarnings; }
    public get netEPS(): number { return this._data.netEPS; }
    public get weightedAverageSharesOutstanding(): number { return this._data.weightedAverageSharesOutstanding; }
    public get totalAssets(): number { return this._data.totalAssets; }
    public get totalDebt(): number { return this._data.totalDebt; }
    public get totalLiabilities(): number { return this._data.totalLiabilities; }
    public get stockholdersEquity(): number { return this._data.stockholdersEquity; }
    public get reportingPeriod(): 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'FY' { return this._data.reportingPeriod; }
    public get drs(): number { return this._data.drs; }

}