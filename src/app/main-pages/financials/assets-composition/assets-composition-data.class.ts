export class AssetsCompisitionData {
    constructor() { }


    public get dataLookup(): {
        label: string,
        value: number,
        layer: number,
        color: string,
    }[] {
        return [
            // { label: 'eBay Stock', value: 4860000000, layer: 0, color: 'rgba(255,37,46,1)', },
            { label: 'eBay Stock', value: 4860000000, layer: 0, color: 'rgba(104,185,0,1)', },
            { label: 'Cash and Equivalents', value: 4667000000, layer: 0, color: 'rgba(69,182,74, 1)', },
            { label: 'Other Marketable Securities', value: 542000000, layer: 0, color: 'rgba(149, 206, 129, 1)', },
            { label: 'Inventories', value: 423000000, layer: 0, color: 'rgba(0,148,255, 1)', },
            { label: 'Bitcoin', value: 303000000, layer: 0, color: 'rgba(238, 141, 25, 1)', },
            { label: 'Other', value: 239000000, layer: 0, color: 'rgb(212, 212, 212)', },


            { label: 'HIDDEN', value: 4860000000, layer: 1, color: 'rgba(255, 255, 255, 0)', },
            { label: 'Current liabilities', value: 860300000, layer: 1, color: 'rgba(255, 0, 0, 1)', },
            { label: 'Long-term debt', value: 4166100000, layer: 1, color: 'rgba(255, 0, 0, 1)', },
            { label: 'Other', value: 105800000, layer: 1, color: 'rgba(255, 0, 0, 1)', },
            { label: 'HIDDEN', value: 1041800000, layer: 1, color: 'rgba(255, 255, 255, 0)', },
        ];
    }

    public getLabel(layer: number, index: number): string {
        const layerItems = this.dataLookup.filter(d => d.layer === layer);
        if (layerItems.length > index) {
            return layerItems[index].label;
        }
        return '';
    }

    public get labels(): string[] {
        return this.dataLookup.map(d => d.label);
    }

    public get datasets(): any[] {
        const allLayers = this.dataLookup.map(d => d.layer)
        const layers = [...new Set(allLayers)];

        const datasets = layers.map(l => {
            return {
                data: this.dataLookup.filter(d => d.layer === l).map(d => d.value),
                backgroundColor: this.dataLookup.filter(d => d.layer === l).map(d => d.color),
                label: '',
                hoverBorderColor() {
                    return 'hsl(0, 0%, 100%)';
                }
            }

        })

        const addInnerRings = 2;

        for (let i = 0; i < addInnerRings; i++) {
            datasets.push(
                {
                    backgroundColor: ['hsl(0, 0%, 100%)', 'hsl(0, 0%, 100%)'],
                    data: [0, 0,],
                    label: '',
                    hoverBorderColor() {
                        return 'hsl(0, 0%, 100%)';
                    }
                },
            )
        }
        return datasets;
    }
}