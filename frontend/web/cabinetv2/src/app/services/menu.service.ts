import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {MenuItem} from "../interfaces/menu-item";
import {Subject} from "rxjs";

@Injectable()
export class MenuService {

  private visible: Subject<boolean> = new Subject<boolean>();
  visible$ = this.visible.asObservable();

  constructor(private http: Http) {

  }

  toggle() {
    this.visible.next(true);
  }

  getMenu(): Promise<Array<MenuItem>> {
    return this.http.get('/api/menu')
      .toPromise()
      .then(response => response.json() as Array<MenuItem>)
      .catch(this.handleError)
  }

  private handleError(err) {
    console.error(err);
  }

}
