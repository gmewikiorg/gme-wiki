export class NewsArticle{

    private _title: string; 
    private _date: string;
    private _author: string; 
    private _urls: string[];
    private _summary: string[] = [];
    private _ngClass: string[] = [];

    public get title(): string { return this._title; }
    public get date(): string { return this._date; }
    public get author(): string { return this._author; }
    public get urls(): string[] { return this._urls; }
    public get summary(): string[] { return this._summary; }
    public get ngClass(): string[] { return this._ngClass; }

    constructor(title: string, date: string, author: string, urls: string[], sentiment: number, summary: string[]){
        this._title = title;
        this._date = date;
        this._author = author; 
        this._summary = summary;
        this._urls = urls;

        if(sentiment < 0){
            this._ngClass = ['negative-article'];
        }
        if(sentiment === 0){
            this._ngClass = ['neutral-article'];
        }
        if(sentiment > 0){
            this._ngClass = ['positive-article'];
        }
    }

    private _isExpanded: boolean = false;
    public get isExpanded(): boolean { return this._isExpanded; }
    public toggleExpand(){ this._isExpanded = !this._isExpanded; }
    public close(){ this._isExpanded = false;}
    public open() { this._isExpanded = true; }
}