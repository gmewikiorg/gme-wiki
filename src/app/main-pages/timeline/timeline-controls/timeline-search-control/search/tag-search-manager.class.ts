import { TimelineEvent } from "../../../timeline-items/timeline-item/timeline-event.class";
import { TagAssociation } from "./tag-association.interface";
import { TagSearchable } from "./tag-searchable.class";

export class TagSearchManager {

    private _timelineEvents: TimelineEvent[];
    private _tagAssociations: TagAssociation[];
    /**
     * 
     * TagSearchManager is for the EventSearchService, basically a sub-part of EventSearchService.  
     * 
     * 
     * @param timelineEvents 
     * @param tagAssociations 
     */
    constructor(timelineEvents: TimelineEvent[], tagAssociations: TagAssociation[]) {
        this._tagAssociations = tagAssociations;
        this._timelineEvents = timelineEvents;
        this._buildSearchableTags();
    }

    private _tagsSearchable: TagSearchable[] = [];
    public get tagsSearchable(): TagSearchable[] { return this._tagsSearchable; }

    public clearSearch(){
        this.tagsSearchable.forEach(tagSearchable => tagSearchable.clearSearch());
    }
    public search(searchValue: string): TagSearchable[] {
        let tagResults: TagSearchable[] = [];
        this.tagsSearchable.forEach(tagSearchable => tagSearchable.clearSearch());
        if (searchValue.length > 1) {
            this.tagsSearchable.forEach(tagSearchable => {
                tagSearchable.search(searchValue);
                if(tagSearchable.hasSearchResults){
                    tagResults.push(tagSearchable);
                }
            });
        }
        // console.log("Tag results", tagResults)
        return tagResults;
    }
    public setTagSearchable(tag: TagSearchable){
        this.tagsSearchable.forEach(tagSearchable => tagSearchable.clearSearch());
        tag.search(tag.displayName);
        return [tag];
    }


    private _buildSearchableTags(){
        const tagsSearchable: TagSearchable[] = [];
        this._tagAssociations.forEach(tagAssociation => {
            const newTag = new TagSearchable(tagAssociation.displayName, tagAssociation.synonyms, tagAssociation.relatedTo);
            tagsSearchable.push(newTag);
        });

        let allEventTags: string[] = []; 
        this._timelineEvents.forEach(event => {
            event.tags.forEach(eventTag =>{
                eventTag = eventTag.toLowerCase();
                const allLowercaseTags = allEventTags.map(tag => tag.toLowerCase());
                if(!allLowercaseTags.includes(eventTag)){
                    allEventTags.push(eventTag);
                }
            });
        });
        allEventTags.forEach(eventTag => {
            let hasTagSearchable: boolean = false;
            tagsSearchable.forEach(tagSearchable =>{ 
                if(tagSearchable.matchesTag(eventTag)){
                    hasTagSearchable = true;
                    tagSearchable.addEvents(this._getEventsByTag(eventTag));
                }else{

                }
            })
            if(!hasTagSearchable){
                const newTagSearchable: TagSearchable = new TagSearchable(eventTag);
                // console.log("New tag searchable: ", eventTag)
                newTagSearchable.addEvents(this._getEventsByTag(eventTag));
                tagsSearchable.push(newTagSearchable);
            }
        });
        this._tagsSearchable = tagsSearchable;
    }

    private _getEventsByTag(tag: string): TimelineEvent[]{
        const events: TimelineEvent[] = [];
        this._timelineEvents.forEach(timelineEvent =>{ 
            const eventTags = timelineEvent.tags.map(tag => tag.toLowerCase());
            if(eventTags.includes(tag)){
                events.push(timelineEvent);
            }
        });
        return events;
    }
}