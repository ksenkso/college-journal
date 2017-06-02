import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Student} from "../interfaces/student";

@Injectable()
export class StudentsService {

  private endpoint: string = '/api/students';

  constructor(private http: Http) {

  }

  getStudent(id: string|number): Promise<Student> {
    return this.http.get(`${this.endpoint}/${id}`)
      .toPromise()
      .then(response => response.json() as Student)
      .catch(this.handleError);
  }

  getStudents():Promise<Student[]> {
    return this.http.get(this.endpoint)
      .toPromise()
      .then(response => response.json() as Student[])
      .catch(this.handleError);
  }

  saveStudent(student: Student): Promise<Student> {
    console.log('service:submit', student);
    return this.http.put(`${this.endpoint}/${student.student_id}`, student)
      .toPromise()
      .then(response => response.json() as Student)
      .catch(this.handleError)
  }

  createStudent(student: Student): Promise<Student> {
    return this.http.post(`${this.endpoint}`, student)
      .toPromise()
      .then(response => response.json() as Student)
      .catch(this.handleError)
  }



  handleError(err) {
    console.error(err);
  }

}
