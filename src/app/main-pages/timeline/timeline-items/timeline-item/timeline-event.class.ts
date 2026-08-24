import { GmePriceEntryFull, GmePriceEntrySimple } from "../../../../shared/services/gme-price-entry.interface";
import { TimelineEventConfig } from "./timeline-event-config.interface";
import { TimelineEventType } from "./timeline-event-type.enum";
import { TimelineEventURL, TimelineEventViewType } from "./timeline-event-url.interface";
import { EarningsResult } from "../../../financials/earnings-results/earnings-result.class";
import dayjs from "dayjs";

export class TimelineEventOLD {


    private _config: TimelineEventConfig;
    private _title: string;
    private _shortTitle: string = '';
    private _dateYYYYMMDD: string;
    private _urls: TimelineEventURL[];
    private _description: string;
    private _types: TimelineEventType[];
    private _significance: number;
    private _imagePath: string = '';
    private _tags: string[] = [];
    private _showInViews: TimelineEventViewType[] = [];

    private _isSelected: boolean = false;
    private _gmePriceEntry: GmePriceEntrySimple | undefined;
    private _gmePrice: number = -1;
    private _gmePricePreSplit: string = '';
    private _itemIndex: number = -1;
    private _localArticle: TimelineEventURL | null = null;

    private _quarterlyFinancialResult: EarningsResult | null = null;


    public get title(): string { return this._config.title; }
    public get shortTitle(): string { return this._config.shortTitle; }
    public get description(): string { return this._config.description; }
    public get dateYYYYMMDD(): string { return this._config.dateYYYYMMDD; }
    public get significance(): number { return this._config.significance; }
    public get types(): TimelineEventType[] { return this._config.types; }
    public get showInViews(): string[] { return this._config.showInViews; }
    public get urls(): TimelineEventURL[] { return this._config.urls ?? []; }
    public get imagePath(): string { return this._config.imagePath ?? ''; }
    public get tags(): string[] { return this._config.tags ?? []; }


    public get hasShortTitle(): boolean { return this._shortTitle !== '' && this._shortTitle !== null && this._shortTitle !== undefined; }
    public get dateMMMDDYYYY(): string { return dayjs(this.dateYYYYMMDD).format('MMM DD, YYYY'); }
    public get mainType(): TimelineEventType { return this._types[0]; }
    public get localArticle(): TimelineEventURL | null { return this._localArticle; }
    public get specificViews(): TimelineEventViewType[] { return this._showInViews; }

    public get isSelected(): boolean { return this._isSelected; }
    public get hasImage(): boolean { return this._imagePath !== ''; }
    public get hasLocalArticle(): boolean { return this._localArticle !== null; }
    public get hasUrls(): boolean { return this._urls.length > 0; }

    public get gmePriceEntry(): GmePriceEntrySimple | undefined { return this._gmePriceEntry; }
    public get gmePrice(): number { return this._gmePrice; }
    public get gmePricePreSplit(): string { return this._gmePricePreSplit; }
    public get itemIndex(): number { return this._itemIndex; }

    public get quarterlyFinancialResult(): EarningsResult | null { return this._quarterlyFinancialResult; }

    constructor(config: TimelineEventConfig, gmePriceEntry: GmePriceEntrySimple | undefined, index: number) {
        this._config = config;
        this._title = config.title;
        this._shortTitle = config.shortTitle;
        this._dateYYYYMMDD = config.dateYYYYMMDD;
        this._urls = config.urls ?? [];
        this._types = config.types
        this._significance = config.significance
        this._description = config.description;
        this._showInViews = config.showInViews;
        if (config.imagePath) {
            this._imagePath = config.imagePath;
        }
        this._gmePriceEntry = gmePriceEntry;
        if (this._gmePriceEntry !== undefined) {
            this._gmePrice = this._gmePriceEntry.close;
            const preSplit = this._gmePrice * 4;
            if (this._dateYYYYMMDD < '2022-07-21') {
                this._gmePricePreSplit = preSplit.toFixed(2);
            }
        } else {
        }
        this._itemIndex = index;
        if (config.tags) {
            this._tags = config.tags;
        }
        const localUrls = this._urls.filter(item => item.isLocal === true);
        if (localUrls.length > 0) {
            this._localArticle = localUrls[0];
        }
    }

    public select() { this._isSelected = true; }
    public unselect() { this._isSelected = false; }


    public setQuarterlyFinancialResult(result: EarningsResult) {
        this._quarterlyFinancialResult = result;
    }

    public static getTypeBorderColor(isDarkMode: boolean, type?: TimelineEventType, transparency?: number) {
        if (!transparency) {
            transparency = 0.8;
        }
        if (isDarkMode) {
            if (type === TimelineEventType.CORP) {
                return 'rgba(198,70,70,' + String(transparency) + ')';
            } else if (type === TimelineEventType.MEDIA) {
                return 'rgba(255,180,70,' + String(transparency) + ')';
            } else if (type === TimelineEventType.RC) {
                return 'rgba(70,70,255,' + String(transparency) + ')';
            } else if (type === TimelineEventType.SOCIAL_MEDIA) {
                return 'rgba(255,70,70,' + String(transparency) + ')';
            } else if (type === TimelineEventType.OTHER) {
                return 'rgba(198,198,198,' + String(transparency) + ')';
            } else if (type === TimelineEventType.DRS) {
                return 'rgba(218,93,176,' + String(transparency) + ')';
            } else {
                return 'rgba(0,0,0,0)';
            }
        } else {
            if (type === TimelineEventType.CORP) {
                return 'rgba(128,0,0,' + String(transparency) + ')';
            } else if (type === TimelineEventType.MEDIA) {
                return 'rgba(230,110,0,' + String(transparency) + ')';
            } else if (type === TimelineEventType.RC) {
                return 'rgba(0,0,255,' + String(transparency) + ')';
            } else if (type === TimelineEventType.SOCIAL_MEDIA) {
                return 'rgba(255,0,0,' + String(transparency) + ')';
            } else if (type === TimelineEventType.OTHER) {
                return 'rgba(128,128,128,' + String(transparency) + ')';
            } else if (type === TimelineEventType.DRS) {
                return 'rgba(148,23,106,' + String(transparency) + ')';
            } else {
                return 'rgba(0,0,0,0)';
            }
        }

    }

    public static getTypeColor(type?: TimelineEventType, transparency?: number): string {
        if (!transparency) {
            transparency = 0.8;
        }
        // if(!type){
        //     type = this.mainType;
        // }
        if (type === TimelineEventType.CORP) {
            return 'rgba(128,0,0,' + String(transparency) + ')';
        } else if (type === TimelineEventType.MEDIA) {
            return 'rgba(230,110,0,' + String(transparency) + ')';
        } else if (type === TimelineEventType.RC) {
            return 'rgba(0,0,255,' + String(transparency) + ')';
        } else if (type === TimelineEventType.SOCIAL_MEDIA) {
            return 'rgba(255,0,0,' + String(transparency) + ')';
        } else if (type === TimelineEventType.OTHER) {
            return 'rgba(128,128,128,' + String(transparency) + ')';
        } else if (type === TimelineEventType.DRS) {
            return 'rgba(148,23,106,' + String(transparency) + ')';
        } else {
            return 'rgba(0,0,0,0)';
        }
    }
}