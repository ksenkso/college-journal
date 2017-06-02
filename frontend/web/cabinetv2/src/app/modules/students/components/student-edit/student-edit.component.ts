import { Component, OnInit } from '@angular/core';
import {TitleService} from "../../../../services/title.service";

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.setTitle("Изменить студента");
  }

}
