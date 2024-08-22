import { ChartConfiguration } from "chart.js";

export class OwnershipData {
    constructor() { }
    
    public get tso(): number { return 426200000; }
    public get lastUpdateYYYYMMDD(): string { return "2024-06-30"; }

    public get drs() { return this.data[2]; }
    public get dspp() { return this.data[3]; }
    public get rc() { return this.data[4]; }
    public get otherInsiders() { return this.data[5]; }
    public get rk() { return this.data[6]; }
    public get vanguard() { return this.data[7]; }
    public get blackrock() { return this.data[8]; }
    public get statestreet() { return this.data[9]; }
    public get otherInstitutional() { return this.data[10]; }
    public get remainder() { return this.data[11]; }


    public get data(): {
        label: string,
        value: number,
        layer: number,
        color: string,
    }[] {
        // 2024-06-30
        return [

            { label: 'Held by registered holders with Computershare', value: 74600000, layer: 0, color: '#8f1795', },
            { label: 'Held by Cede & Co on behalf of DTCC', value: 351600000, layer: 0, color: '#CCC', },
            { label: 'DRS', value: 61500000, layer: 1, color: '#8f1795', },
            { label: 'DSPP', value: 13100000, layer: 1, color: '#a91cb0', },
            { label: 'Ryan Cohen', value: 36800000, layer: 1, color: '#0066ff', },
            { label: 'All other insiders', value: 800000, layer: 1, color: '#0066ff', },
            { label: 'Roaring Kitty', value: 9001000, layer: 1, color: '#ff0000', },
            { label: 'Vanguard Group Inc', value: 29698579, layer: 1, color: '#ff9900', },
            { label: 'Blackrock Inc', value: 22599419, layer: 1, color: '#ff9900', },
            { label: 'State Street Corp', value: 8073188, layer: 1, color: '#ff9900', },
            { label: 'All other institutional', value: 37244635, layer: 1, color: 'rgba(255, 153, 0, 0.5)', },
            { label: 'Remainder', value: 207400000, layer: 1, color: '#EEE', },
        ];

        /**
         * 
         * 
         * 2024-06-13
         * 
         *         return [
            
            { label: 'Held by registered holders with Computershare', value: 74600000, layer: 0, color: '#8f1795', },
            { label: 'Held by Cede & Co on behalf of DTCC', value: 351600000, layer: 0, color: '#CCC', },
            { label: 'DRS', value: 61500000, layer: 1, color: '#8f1795', },
            { label: 'DSPP', value: 13100000, layer: 1, color: '#a91cb0', },
            { label: 'Ryan Cohen', value: 36800000, layer: 1, color: '#0066ff', },
            { label: 'All other insiders', value: 800000, layer: 1, color: '#0066ff', },
            { label: 'Roaring Kitty', value: 9001000, layer: 1, color: '#ff0000', },
            { label: 'Vanguard Group Inc', value: 25300000, layer: 1, color: '#ff9900', },
            { label: 'Blackrock Inc', value: 22600000, layer: 1, color: '#ff9900', },
            { label: 'State Street Corp', value: 8300000, layer: 1, color: '#ff9900', },
            { label: 'All other institutional', value: 31200000, layer: 1, color: 'rgba(255, 153, 0, 0.5)', },
            { label: 'Remainder', value: 217600000, layer: 1, color: '#EEE', },
        ];
         */
    }

    public getLabel(value: number): string { 
        const foundItem = this.data.find(item => item.value === value);
        if(foundItem){
            return foundItem.label;
        }else{
            return '';
        }
    }


    public get totalRegistered(): number { return this.drs.value + this.dspp.value; }
    public get totalInsiders(): number { return this.rc.value + this.otherInsiders.value; }
    public get totalInstitutional(): number { return this.otherInstitutional.value + this.vanguard.value + this.blackrock.value + this.statestreet.value; }

    public get totalBeneficial(): number { return this.tso - this.totalRegistered; }
    public get remainderTotal(): number { return this.totalBeneficial - (this.totalInsiders + this.totalInstitutional + this.rk.value) }


    public get chartData(): ChartConfiguration<'pie'>['data'] {
        const data = {
            labels: this.data.filter(item => item.label !== 'All other insiders').map(item => item.label),
            datasets: [
                {
                    backgroundColor: this.data.filter(item => item.label !== 'All other insiders').map(item => item.color),
                    data: [this.data[0].value, this.data[1].value, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    backgroundColor: ['#CCC', '#CCC', this.data[2].color, this.data[3].color, this.data[4].color, this.data[6].color, this.data[7].color,
                    this.data[8].color, this.data[9].color, this.data[10].color, this.data[11].color,],
                    data: [
                        0, 0, this.data[2].value, this.data[3].value, this.data[4].value, this.data[6].value, this.data[7].value,
                        this.data[8].value, this.data[9].value, this.data[10].value, this.data[11].value,
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
