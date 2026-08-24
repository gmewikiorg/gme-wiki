import * as dayjs from 'dayjs';
export interface GmePriceEntrySimple{
    dateYYYYMMDD: string,
    close: number,
    volume: number,
}

export interface GmePriceEntryFull{
    dateYYYYMMDD: string,
    close: number,
    volume: number,
    open: number,
    high: number,
    low: number,
    tso: number,
    trailingSales: number,
    equity: number,
    trailingEarnings: number,
    ftds: number,
}