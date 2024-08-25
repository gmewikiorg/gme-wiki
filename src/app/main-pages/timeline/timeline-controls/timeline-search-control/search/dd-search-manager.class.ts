import { DdEntry } from "../../../../../shared/services/dd-entry.interface";

export class DdSearchManager{

    private _ddEntries: DdEntry[];
    constructor(ddEntries: DdEntry[]){
        this._ddEntries = ddEntries;
    }

    public search(searchVal: string): DdEntry[] {
        const results: DdEntry[] = [];
        this._ddEntries.forEach(entry => {
            if(entry.title.toLowerCase().includes(searchVal.toLowerCase())){
                results.push(entry)
            }
        });
        return results;
    }
}