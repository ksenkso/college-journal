import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {User} from "../interfaces/user";

@Injectable()
export class UsersService {

  constructor(private http: Http) { }

  private endpoint: string = '/api/users';

  getUsers(): Promise<User[]> {
    return this.http.get(this.endpoint)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  getUser(id: string|number): Promise<User> {
    return this.http.get(`${this.endpoint}/${id}`)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  createUser(user: User): Promise<User> {
    return this.http.post(this.endpoint, {User: user})
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  saveUser(user: User): Promise<User> {
    return this.http.put(`${this.endpoint}/${user.id}`, {User: user})
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  deleteUser(id: number|string): Promise<boolean> {
    return this.http.delete(`${this.endpoint}/${id}`)
      .toPromise()
      .then(response => true)
      .catch(this.handleError);
  }

  handleError(err) {
    console.error(err);
  }

}
