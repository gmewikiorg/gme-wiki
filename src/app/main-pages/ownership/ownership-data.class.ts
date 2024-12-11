import { ChartConfiguration } from "chart.js";

export class OwnershipData {
    constructor() { }

    public get text(): string {
        return "... approximately 71.0 million shares of our Class A common stock were held by registered holders with our transfer agent (or approximately 16% of our outstanding shares) as of December 4, 2024.";
    }
    public get link(): string { return "https://www.sec.gov/ix?doc=/Archives/edgar/data/0001326380/000132638024000170/gme-20241102.htm"; }
    public get formType(): string { return "10-Q"; }

    public get tso(): number { return 446800365; }
    public get lastUpdateYYYYMMDD(): string { return "2024-12-04"; }
    public get date(): string { return "December 10, 2024" }

    public get drsData() { return this.data[2]; }
    public get dsppData() { return this.data[3]; }
    public get rcData() { return this.data[4]; }
    public get otherInsidersData() { return this.data[5]; }
    public get rkData() { return this.data[6]; }
    public get vanguardData() { return this.data[7]; }
    public get blackrockData() { return this.data[8]; }
    public get statestreetData() { return this.data[9]; }
    public get otherInstitutionalData() { return this.data[10]; }
    public get remainderData() { return this.data[11]; }



    public get totalRegistered(): number { return this.drsData.value + this.dsppData.value; }
    public get totalInsiders(): number { return this.rcData.value + this.otherInsidersData.value; }
    public get totalInstitutional(): number { return this.otherInstitutionalData.value + this.vanguardData.value + this.blackrockData.value + this.statestreetData.value; }
    public get totalBeneficial(): number { return this.tso - this.totalRegistered; }
    public get remainderTotal(): number { return this.totalBeneficial - (this.totalInsiders + this.totalInstitutional + this.rkData.value) }





    public get data(): {
        label: string,
        value: number,
        layer: number,
        color: string,
    }[] {

        const registeredCount = 71000000;
        const cedeCount = 375800365;

        const drs = (0.824 * registeredCount);
        const dspp = (0.176 * registeredCount);

        const ryanCohen = 36800000;
        const allOtherInsiders = 800000;
        const allInsiders = ryanCohen + allOtherInsiders;

        const roaringKitty = 9001000;

        const vanguard = 37108031;
        const blackrock = 32241728;
        const stateStreet = 11143759;


        // https://www.nasdaq.com/market-activity/stocks/gme/institutional-holdings
        const allInstitutional = 125513066;
        const remainingInstitutional = allInstitutional - (vanguard + blackrock + stateStreet);

        const remainder = this.tso - (registeredCount + allInsiders + allInstitutional + roaringKitty);

        return [
            { label: 'Held by registered holders with Computershare', value: registeredCount, layer: 0, color: '#8f1795', },
            { label: 'Held by Cede & Co on behalf of DTCC', value: cedeCount, layer: 0, color: '#CCC', },
            { label: 'DRS', value: drs, layer: 1, color: '#8f1795', },
            { label: 'DSPP', value: dspp, layer: 1, color: '#a91cb0', },
            { label: 'Ryan Cohen', value: ryanCohen, layer: 1, color: '#0066ff', },
            { label: 'All other insiders', value: allOtherInsiders, layer: 1, color: '#0066ff', },
            { label: 'Roaring Kitty', value: roaringKitty, layer: 1, color: '#ff0000', },
            { label: 'Vanguard Group Inc', value: vanguard, layer: 1, color: '#ff9900', },
            { label: 'Blackrock Inc', value: blackrock, layer: 1, color: '#ff9900', },
            { label: 'State Street Corp', value: stateStreet, layer: 1, color: '#ff9900', },
            { label: 'All other (>300 institutions) ', value: remainingInstitutional, layer: 1, color: 'rgba(255, 153, 0, 0.5)', },
            { label: 'Remainder', value: remainder, layer: 1, color: '#EEE', },
        ];



        /**    2024-09-30
         *     public get tso(): number { return  446509592; }
         *         const registeredCount = 72800000;
        const cedeCount = 373709592;
        const drs = (0.824 * registeredCount);
        const dspp = (0.176* registeredCount);
        const ryanCohen = 36800000;
        const allOtherInsiders = 800000;
        const allInsiders = ryanCohen + allOtherInsiders;
        const roaringKitty = 9001000;

        const vanguard = 37108031;
        const blackrock = 32241728;
        const stateStreet = 11143759;
         */



        /**
         * 
         */
        // public get tso(): number { return  426509592; }
        // // 2024-09-04
        // const registeredCount = 72800000;
        // const cedeCount = 353700000;
        // return [
        //     { label: 'Held by registered holders with Computershare', value: registeredCount, layer: 0, color: '#8f1795', },
        //     { label: 'Held by Cede & Co on behalf of DTCC', value: cedeCount, layer: 0, color: '#CCC', },
        //     { label: 'DRS', value: (0.824 * registeredCount), layer: 1, color: '#8f1795', },
        //     { label: 'DSPP', value: (0.176* registeredCount), layer: 1, color: '#a91cb0', },
        //     { label: 'Ryan Cohen', value: 36800000, layer: 1, color: '#0066ff', },
        //     { label: 'All other insiders', value: 800000, layer: 1, color: '#0066ff', },
        //     { label: 'Roaring Kitty', value: 9001000, layer: 1, color: '#ff0000', },
        //     { label: 'Vanguard Group Inc', value: 29698579, layer: 1, color: '#ff9900', },
        //     { label: 'Blackrock Inc', value: 22599419, layer: 1, color: '#ff9900', },
        //     { label: 'State Street Corp', value: 8073188, layer: 1, color: '#ff9900', },
        //     { label: 'All other institutional', value: 37244635, layer: 1, color: 'rgba(255, 153, 0, 0.5)', },
        //     { label: 'Remainder', value: 209483179, layer: 1, color: '#EEE', },
        // ];



        /**
         * 
         *         // 2024-06-30
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
         */

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
        if (foundItem) {
            return foundItem.label;
        } else {
            return '';
        }
    }





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
