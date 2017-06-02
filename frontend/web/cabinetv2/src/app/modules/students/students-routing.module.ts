/**
 * Created by yazun on 22.04.2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {StudentFormComponent} from "./components/student-form/student-form.component";
import {StudentsComponent} from "./components/students/students.component";
import {StudentListComponent} from "./components/student-list/student-list.component";
import {StudentEditComponent} from "./components/student-edit/student-edit.component";
import {StudentCreateComponent} from "./components/student-create/student-create.component";

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    children: [
      {
        path: '',
        component: StudentListComponent
      }
    ]
  },
  {
    path: 'edit/:id',
    component: StudentEditComponent
  },
  {
    path: 'create',
    component: StudentCreateComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }

