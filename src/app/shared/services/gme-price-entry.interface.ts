import * as dayjs from 'dayjs';
export interface GmePriceEntry{
    dateYYYYMMDD: string,
    close: number,
    volume: number,
    open: number,
    high: number,
    low: number
}