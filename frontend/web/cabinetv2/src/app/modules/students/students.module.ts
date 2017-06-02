import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StudentsRoutingModule} from "./students-routing.module";
import {StudentFormComponent} from "./components/student-form/student-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {StudentsService} from "./services/students.service";
import { StudentsComponent } from './components/students/students.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentCreateComponent } from './components/student-create/student-create.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StudentsRoutingModule
  ],
  declarations: [StudentFormComponent, StudentsComponent, StudentListComponent, StudentCreateComponent, StudentEditComponent],
  providers: [StudentsService]
})
export class StudentsModule { }
