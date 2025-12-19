import { ChartConfiguration } from "chart.js";
import { OwnershipHistoryItem } from "./ownership-history-item.interface";
import { ownershipHistory } from "./ownership-history_old_2025-12-18";
import dayjs from "dayjs";

export class OwnershipData {
    constructor() { }

    private _ownershipHistory: OwnershipHistoryItem[] = ownershipHistory;

    /** The most recent ownership data is the first entry listed in the ownership history 
     * _mroData = most recent ownership Data    */
    private _mroData: OwnershipHistoryItem = this._ownershipHistory[0];

    /** This value comes from the DRSGME.org June 2024 viewing of the stockholder list  
        * https://www.drsgme.org/2024-stockholder-list-viewing */
    private _drsVsDsppRatio2025: number = 0.813;
    private _drsVsDsppRatio2024: number = 0.824;



    public get registeredText(): string { return this._mroData.registeredText; }
    public get filingLink(): string { return this._mroData.filingLink; }
    public get formType(): '10Q' | '10K' { return this._mroData.filingType; }
    public get tso(): number { return this._mroData.tso; }
    public get lastUpdateYYYYMMDD(): string { return this._mroData.dateYYYYMMDD; }
    public get filingDateYYYYMMDD(): string { return this._mroData.filingDateYYYYMMDD; }
    public get dateFormatted(): string { return dayjs(this.lastUpdateYYYYMMDD).format('MMMM D, YYYY'); }
    public get filingDateFormatted(): string { return dayjs(this.filingDateYYYYMMDD).format('MMMM D, YYYY'); }
    public get totalCede(): number { return this._mroData.heldByCede; }
    public get totalRegistered(): number { return this._mroData.heldByRegistered; }
    public get drsShares(): number { return this._mroData.heldByRegistered * this._drsVsDsppRatio2025; }
    public get dsppShares(): number { return this._mroData.heldByRegistered * (1-this._drsVsDsppRatio2025); }
    public get rcShares(): number { return this._mroData.insidersRyanCohen; }
    public get insidersOtherShares(): number { return this._mroData.insidersRemainder; }
    public get totalInsiders(): number { return this._mroData.insidersRemainder + this._mroData.insidersRyanCohen; }
    public get keithGillShares(): number { return this._mroData.keithGill; }
    public get vanguardShares(): number { return this._mroData.instVanguard; }
    public get blackrockShares(): number { return this._mroData.instBlackrock; }
    public get stateStreetShares(): number { return this._mroData.instStateStreet; }
    public get otherInstShares(): number { return this._mroData.instTotal - (this._mroData.instVanguard + this._mroData.instBlackrock + this._mroData.instStateStreet); }
    public get totalInstitutional(): number { return this._mroData.instTotal; }
    public get remainderTotal(): number { return this._mroData.tso - (this._mroData.heldByRegistered + this.totalInsiders + this.keithGillShares + this.totalInstitutional); }

    public get labelLookup(): {
        label: string,
        value: number,
        layer: number,
        color: string,
    }[] {
        return [
            { label: 'Held by registered holders with Computershare', value: this.totalRegistered, layer: 0, color: 'rgba(143, 23, 149, 1)', },
            { label: 'Held by Cede & Co on behalf of DTCC', value: this.totalCede, layer: 0, color: 'rgba(204, 204, 204, 1)', },
            { label: 'DRS', value: this.drsShares, layer: 1, color: 'rgba(143, 23, 149, 1)', },
            { label: 'DSPP', value: this.dsppShares, layer: 1, color: 'rgba(151, 81, 155, 1)', },
            { label: 'Ryan Cohen', value: this.rcShares, layer: 1, color: 'rgba(0, 102, 255, 1)', },
            { label: 'All other insiders', value: this.insidersOtherShares, layer: 1, color: 'rgba(0, 102, 255, 1)', },
            { label: 'Keith Gill *', value: this.keithGillShares, layer: 1, color: 'rgba(255, 0, 0, 1)', },
            { label: 'Vanguard Group Inc', value: this.vanguardShares, layer: 1, color: 'rgba(255, 153, 0, 1)', },
            { label: 'Blackrock Inc', value: this.blackrockShares, layer: 1, color: 'rgba(255, 153, 0, 1)', },
            { label: 'State Street Corp', value: this.stateStreetShares, layer: 1, color: 'rgba(255, 153, 0, 1)', },
            { label: 'All other institutions (> 300) ', value: this.otherInstShares, layer: 1, color: 'rgba(255, 204, 129, 1)', },
            { label: 'Remainder', value: this.remainderTotal, layer: 1, color: 'rgba(238, 238, 238, 1)', },
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
