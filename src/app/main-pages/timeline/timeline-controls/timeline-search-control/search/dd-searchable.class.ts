import { DdEntry } from "src/app/services/dd-entry.interface";

export class DdSearchable{
    private _ddEntry: DdEntry;
    constructor(ddEntry: DdEntry){
        this._ddEntry = ddEntry;
    }
}