import { assetsCompositionHistory, AssetsCompositionItem } from "./assets-composition-history";

export class AssetsCompisitionData {
    constructor() { }

    private _compositionHistory = assetsCompositionHistory;
    private _mostRecentComposition = this._compositionHistory[0];

    public get dataLookup(): AssetsCompositionItem[] {
        return this._mostRecentComposition.composition;
    }

    public get totalAssets(): string {
        const assetsValue = this.dataLookup.filter(item => item.layer === 0).reduce((sum, item) => sum += item.value, 0);
        return `$${(assetsValue / 1_000_000_000).toFixed(1)} billion`;
    }

    public get totalLiabilities(): string {
        const assetsValue = this.dataLookup.filter(item => item.layer === 1 && !item.isHidden).reduce((sum, item) => sum += item.value, 0);
        return `$${(assetsValue / 1_000_000_000).toFixed(1)} billion`;
    }

    public getLabel(layer: number, index: number): string {
        const item = this.getitem(layer, index);
        if(item){
            return item.label;
        }
        return '';
    }
    public getitem(layer: number, index: number): AssetsCompositionItem | undefined {
        const layerItems = this.dataLookup.filter(d => d.layer === layer);
        if (layerItems.length > index) {
            return layerItems[index];
        }
        return;
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