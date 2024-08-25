import { TimelineEvent } from "../../../timeline-items/timeline-item/timeline-event.class";
import { TagSearchResult } from "./tag-search-result.class";

export class TagSearchable{


    private _displayName: string;
    private _synonyms: string[];
    private _relatedTo: string[];
    public get displayName(): string{ return this._displayName;}
    public get synonyms(): string[] { return this._synonyms; }
    public get relatedTo(): string[] { return this._relatedTo;}

    private _events: TimelineEvent[] = [];
    public get events(): TimelineEvent[] { return this._events; }
    public get eventCount(): number { return this.events.length; }
    public get hasEvents(): boolean { return this.eventCount > 0; }

    /** 
     *  this class is a searchable tag that contains copies of the timeline events 
     *  this class gives better ability to manage the search input --> tag association --> search results
     * 
     */
    constructor(displayName: string, synonyms: string[] = [], relatedTo: string[] = []){
        this._displayName = displayName;
        this._synonyms = synonyms;
        this._relatedTo = relatedTo;
    }


    private _searchResults: TimelineEvent[] = [];
    private _matchPriority: number = -1;
    private _synonymMatch: string = '';
    public get searchResults(): TimelineEvent[] { return this._searchResults; }
    public get hasSearchResults(): boolean { return this._searchResults.length > 0; }
    public get matchPriority(): number { return this._matchPriority; }
    public get synonymMatch(): string { return this._synonymMatch; }
    public search(searchValue: string){
        searchValue = searchValue.toLowerCase();
        if(this.displayName.toLowerCase().includes(searchValue)){
            this._searchResults = Object.assign([], this.events);
            this._matchPriority = 0;
        }else{
            if(this.matchesTag(searchValue)){
                this._synonymMatch = this._matchesSynonym(searchValue);
                this._searchResults = Object.assign([], this.events);
                this._matchPriority = 1;
            }
        }
    }
    public clearSearch(){
        this._searchResults = [];
        this._matchPriority = -1;
        this._synonymMatch = '';
    }

    public addEvents(eventsToAdd: TimelineEvent[]){
        eventsToAdd.forEach(eventToAdd => {
            const foundExistingEvent = this._events.find(event => {
                const sameDate = event.dateYYYYMMDD === eventToAdd.dateYYYYMMDD;
                const sameTitle = event.title === eventToAdd.title;
                if(sameDate && sameTitle){
                    return true;
                }
                return false;
            });
            if(!foundExistingEvent){
                this._events.push(eventToAdd);
            }
        });
        this._events = this._events.sort((e1, e2)=>{
            if(e1.dateYYYYMMDD < e2.dateYYYYMMDD){
                return 1;
            }else if(e1.dateYYYYMMDD > e2.dateYYYYMMDD){
                return -1;
            }else{
                return 0;
            }
        });
    }

    public matchesTag(tag: string): boolean { 
        let matchesTag: boolean = false;
        if(tag.toLowerCase() === this.displayName.toLowerCase()){
            matchesTag = true;
        }
        if(this._matchesSynonym(tag) !== ''){
            matchesTag = true;
        }
        return matchesTag;
    }

    private _matchesSynonym(tag: string): string{
        let synonymMatch: string = '';
        const synonyms: string[] = this.synonyms.map(s => s.toLowerCase());
        synonyms.forEach(synonym =>{
            if(synonym.includes(tag)){
                synonymMatch = synonym;
            }
        })
        return synonymMatch;
    } 
}