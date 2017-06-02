import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Group} from "../interfaces/group";

@Injectable()
export class GroupsService {

  private endpoint: string = '/api/groups';


  constructor(private http: Http) { }

  createGroup(group: Group): Promise<Group> {
    return this.http.post(this.endpoint, group)
      .toPromise()
      .then(res => res.json() as Group)
      .catch(this.handleError)
  }

  saveGroup(group: Group): Promise<Group> {
    return this.http.put(`${this.endpoint}/${group.group_id}`, group)
      .toPromise()
      .then(res => res.json() as Group)
      .catch(this.handleError)
  }

  getGroups(): Promise<Group[]> {
    return this.http.get(this.endpoint)
      .toPromise()
      .then(res => res.json() as Group[])
      .catch(this.handleError)
  }

  getGroup(id: number|string): Promise<Group> {
    return this.http.get(`${this.endpoint}/${id}`)
      .toPromise()
      .then(res => res.json() as Group)
      .catch(this.handleError)
  }

  deleteGroup(id: number|string): Promise<boolean> {
    return this.http.delete(`${this.endpoint}/${id}`)
      .toPromise()
      .then(res => true)
      .catch(this.handleError)
  }

  handleError(err) {
    console.error(err);
  }
}
