import { TagAssociation } from "./tag-association.interface";
import { Observable, Subject, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class TagAssociationLoader{
    
  /**
   * this class is for the EventSearchService to load the tag-associations.csv file and provide an Observable<TagAssociation[]>
   * 
   * @param _httpClient 
   */
  constructor(private _httpClient: HttpClient){}

  public async loadTagAssocationsCSV(){
    
    await lastValueFrom(this.loadTagAssociationsCSV$());
  }

  public loadTagAssociationsCSV$(): Observable<TagAssociation[]> {
    const subject$ = new Subject<TagAssociation[]>();
    const fileName = 'assets/data/tag-associations.csv';
    this._httpClient.get(fileName, { responseType: 'text' },).subscribe(
      (data) => {
        let associationValues = this._parseCSV(data);
        subject$.next(associationValues);
        subject$.complete();
      },
      (error) => {
        console.log("error:", error)
      },
      () => {
        subject$.complete();
      }
    );
    return subject$.asObservable();
  }

  /** Convert CSV table into an array of objects */
  private _parseCSV(data: any): TagAssociation[] {
    const rows = data.split('\n');
    const headers = rows[0].split(',');
    const rowCount = rows.length;
    const cellRows: TagAssociation[] = [];
    for (let rowIndex = 1; rowIndex < rowCount; rowIndex++) {
      const splitRow: string[] = rows[rowIndex].split(',');
      const cells: string[] = [];
      for(let column = 0; column < splitRow.length; column++){
          cells.push(String(splitRow[column]))
      }
      cellRows.push(this._getResult(cells))
    }
    const associations: TagAssociation[] = cellRows;
    return associations;
  }

  private _getResult(cells: any[]): TagAssociation {
    let synonymValues: string[] = [];
    let relatedToValues: string[] = [];
    if(cells[1]){
      let synonyms: string[] = cells[1].split(';');
      synonyms.forEach(synonym=>{
        synonym = synonym.trimStart();
        synonym = synonym.trimEnd();
        if(synonym !== ""){
          synonymValues.push(synonym);
        }
      });
    }
    if(cells[2]){
      let relatedTo: string[] = cells[2].split(';');
      relatedTo.forEach(related=>{
        related = related.trimStart();
        related = related.trimEnd();
        if(related !== ""){
          relatedToValues.push(related);
        }

      });
    }
    return {
      displayName: cells[0],
      synonyms: synonymValues,
      relatedTo: relatedToValues,
    }
  }
}