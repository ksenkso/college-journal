import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class TitleService {

  private title: Subject<string> = new Subject<string>();
  title$ = this.title.asObservable();

  constructor() { }

  setTitle(newTitle: string): void {
    this.title.next(newTitle);
  }


}
