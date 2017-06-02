import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Permission} from "../interfaces/permission";


@Injectable()
export class PermissionService {

  private endpoint: string = '/api/permissions';

  constructor(private http: Http) { }

  handleError(err) {
    console.error(err);
  }

  getPermissions(type: string): Promise<Permission[]> {
    return this.http.get(`${this.endpoint}/${type}`)
      .toPromise()
      .then(res => res.json() as Permission[])
      .catch(this.handleError);
  }

  setPermissions(userId: string|number, permissions: Permission[]): Promise<boolean> {
    return this.http.put(`${this.endpoint}/${userId}`, permissions)
      .toPromise()
      .then(res => res.json() as boolean)
      .catch(this.handleError);
  }



}
