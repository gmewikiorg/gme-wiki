import { ChartConfiguration } from "chart.js";
import { OwnershipHistoryItem } from "./ownership-history-item.interface";
import { ownershipHistory } from "./ownership-history";
import dayjs from "dayjs";

export class OwnershipData {
    constructor() { }

    private _ownershipHistory: OwnershipHistoryItem[] = ownershipHistory;
    private _recentOwnershipData: OwnershipHistoryItem = this._ownershipHistory[0];

    public get registeredText(): string { return this._recentOwnershipData.registeredText; }
    public get filingLink(): string { return this._recentOwnershipData.filingLink; }
    public get formType(): '10Q' | '10K' { return this._recentOwnershipData.filingType; }
    public get tso(): number { return  this._recentOwnershipData.tso; }
    public get lastUpdateYYYYMMDD(): string { return this._recentOwnershipData.dateYYYYMMDD; }
    public get date(): string { return dayjs(this.lastUpdateYYYYMMDD).format('MMMM D, YYYY'); }
    public get totalCede(): number { return this._recentOwnershipData.heldByCede; }
    public get totalRegistered(): number { return this._recentOwnershipData.heldByRegistered; }
    public get drsShares(): number { return this._recentOwnershipData.registeredDRS; }
    public get dsppShares(): number { return this._recentOwnershipData.registeredDSPP; }
    public get rcShares(): number { return this._recentOwnershipData.insidersRyanCohen; }
    public get insidersOtherShares(): number { return this._recentOwnershipData.insidersRemainder; }
    public get totalInsiders(): number { return this._recentOwnershipData.totalInsiders; }
    public get keithGillShares(): number { return this._recentOwnershipData.keithGill; }
    public get vanguardShares(): number { return this._recentOwnershipData.instVanguard; }
    public get blackrockShares(): number { return this._recentOwnershipData.instBlackrock; }
    public get stateStreetShares(): number { return this._recentOwnershipData.instStateStreet; }
    public get otherInstShares(): number { return this._recentOwnershipData.instAllOther; }
    public get totalInstitutional(): number { return this._recentOwnershipData.instTotal; }
    public get remainderTotal(): number { return this._recentOwnershipData.remainder; }

    public get labelLookup(): {
        label: string,
        value: number,
        layer: number,
        color: string,
    }[] {
        return [
            { label: 'Held by registered holders with Computershare', value: this.totalRegistered, layer: 0, color: '#8f1795', },
            { label: 'Held by Cede & Co on behalf of DTCC', value: this.totalCede, layer: 0, color: '#CCC', },
            { label: 'DRS', value: this.drsShares, layer: 1, color: '#8f1795', },
            { label: 'DSPP', value: this.dsppShares, layer: 1, color: '#a91cb0', },
            { label: 'Ryan Cohen', value: this.rcShares, layer: 1, color: '#0066ff', },
            { label: 'All other insiders', value: this.insidersOtherShares, layer: 1, color: '#0066ff', },
            { label: 'Keith Gill', value: this.keithGillShares, layer: 1, color: '#ff0000', },
            { label: 'Vanguard Group Inc', value: this.vanguardShares, layer: 1, color: '#ff9900', },
            { label: 'Blackrock Inc', value: this.blackrockShares, layer: 1, color: '#ff9900', },
            { label: 'State Street Corp', value: this.stateStreetShares, layer: 1, color: '#ff9900', },
            { label: 'All other (>300 institutions) ', value: this.otherInstShares, layer: 1, color: 'rgb(255, 204, 129)', },
            { label: 'Remainder', value: this.remainderTotal, layer: 1, color: '#EEE', },
        ];
    }
    public getLabel(value: number): string {
        const foundItem = this.labelLookup.find(item => item.value === value);
        if (foundItem) {
            return foundItem.label;
        } else {
            return '';
        }
    }
    public get chartData(): ChartConfiguration<'pie'>['data'] {
        const data = {
            labels: this.labelLookup.filter(item => item.label !== 'All other insiders').map(item => item.label),
            datasets: [
                {
                    backgroundColor: this.labelLookup.filter(item => item.label !== 'All other insiders').map(item => item.color),
                    data: [this.labelLookup[0].value, this.labelLookup[1].value, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    backgroundColor: ['#CCC', '#CCC', this.labelLookup[2].color, this.labelLookup[3].color, this.labelLookup[4].color, this.labelLookup[6].color, this.labelLookup[7].color,
                        this.labelLookup[8].color, this.labelLookup[9].color, this.labelLookup[10].color, this.labelLookup[11].color,],
                    data: [
                        0, 0, this.labelLookup[2].value, this.labelLookup[3].value, this.labelLookup[4].value, this.labelLookup[6].value, this.labelLookup[7].value,
                        this.labelLookup[8].value, this.labelLookup[9].value, this.labelLookup[10].value, this.labelLookup[11].value,
                    ]
                },
                {
                    backgroundColor: ['hsl(0, 100%, 60%)', 'hsl(0, 100%, 35%)'],
                    data: [0, 0]
                },
                {
                    backgroundColor: ['hsl(0, 100%, 60%)', 'hsl(0, 100%, 35%)'],
                    data: [0, 0]
                },
                // {
                //     backgroundColor: ['hsl(0, 100%, 60%)', 'hsl(0, 100%, 35%)'],
                //     data: [0, 0]
                // },
            ]
        };
        return data;
    }
}
