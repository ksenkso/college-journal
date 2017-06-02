import { Component, OnInit } from '@angular/core';
import {StudentsService} from "../../services/students.service";
import {Student} from "../../interfaces/student";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];

  constructor(private studentsService: StudentsService) {

  }

  ngOnInit() {
    this.studentsService.getStudents().then(students => this.students = students);
  }

}
