import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StartPageService {

  constructor() { }

  private _mouseEnter$: Subject<boolean> = new Subject();
  public get mouseEnter$(): Observable<boolean> { return this._mouseEnter$.asObservable(); }
  public onMouseEnterMainMenu() {
    this._mouseEnter$.next(true);
  }
}
