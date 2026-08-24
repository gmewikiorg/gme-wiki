
export interface AssetsCompositionItem {
    label: string,
    value: number,
    color: string,
    layer: number,
    isHidden: boolean,
}

export interface AssetsCompositionHistoryItem {
    dateYYYYMMDD: string,
    composition: AssetsCompositionItem[],
}

export const assetsCompositionHistory: AssetsCompositionHistoryItem[] = [
    // {
    //     dateYYYYMMDD: '2026-08-03',
    //     composition: [
    //         { label: 'eBay Stock', value: 4860000000, layer: 0, color: 'rgba(104,185,0,1)', isHidden: false, },
    //         { label: 'Cash and Equivalents', value: 4667000000, layer: 0, color: 'rgba(69,182,74, 1)', isHidden: false, },
    //         { label: 'Other Marketable Securities', value: 542000000, layer: 0, color: 'rgba(149, 206, 129, 1)', isHidden: false, },
    //         { label: 'Inventories', value: 423000000, layer: 0, color: 'rgba(0,148,255, 1)', isHidden: false, },
    //         { label: 'Bitcoin', value: 303000000, layer: 0, color: 'rgba(238, 141, 25, 1)', isHidden: false, },
    //         { label: 'Other', value: 239000000, layer: 0, color: 'rgb(212, 212, 212)', isHidden: false, },
    //         { label: 'HIDDEN', value: 4860000000, layer: 1, color: 'rgba(255, 255, 255, 0)', isHidden: true, },
    //         { label: 'Long-term debt', value: 2766100000, layer: 1, color: 'rgb(255, 82, 82)', isHidden: false, },
    //         { label: 'Current liabilities', value: 860300000, layer: 1, color: 'rgb(255, 146, 146)', isHidden: false, },
    //         { label: 'Other', value: 105800000, layer: 1, color: 'rgb(255, 184, 184)', isHidden: false, },
    //         { label: 'HIDDEN', value: 2441800000, layer: 1, color: 'rgba(255, 255, 255, 0)', isHidden: true, },
    //     ]
    // },
    {
        dateYYYYMMDD: '2026-07-17',
        composition: [
            { label: 'eBay Stock', value: 4860000000, layer: 0, color: 'rgba(104,185,0,1)', isHidden: false, },
            { label: 'Cash and Equivalents', value: 4667000000, layer: 0, color: 'rgba(69,182,74, 1)', isHidden: false, },
            { label: 'Other Marketable Securities', value: 542000000, layer: 0, color: 'rgba(149, 206, 129, 1)', isHidden: false, },
            { label: 'Inventories', value: 423000000, layer: 0, color: 'rgba(0,148,255, 1)', isHidden: false, },
            { label: 'Bitcoin', value: 303000000, layer: 0, color: 'rgba(238, 141, 25, 1)', isHidden: false, },
            { label: 'Other', value: 239000000, layer: 0, color: 'rgb(212, 212, 212)', isHidden: false, },
            { label: 'HIDDEN', value: 4860000000, layer: 1, color: 'rgba(255, 255, 255, 0)', isHidden: true, },
            { label: 'Long-term debt', value: 4166100000, layer: 1, color: 'rgb(255, 82, 82)', isHidden: false, },
            { label: 'Current liabilities', value: 860300000, layer: 1, color: 'rgb(255, 146, 146)', isHidden: false, },
            { label: 'Other', value: 105800000, layer: 1, color: 'rgb(255, 184, 184)', isHidden: false, },
            { label: 'HIDDEN', value: 1041800000, layer: 1, color: 'rgba(255, 255, 255, 0)', isHidden: true, },
        ]
    },
]