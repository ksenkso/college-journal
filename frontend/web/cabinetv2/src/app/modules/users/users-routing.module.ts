/**
 * Created by yazun on 03.05.2017.
 */
/**
 * Created by yazun on 22.04.2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {UsersComponent} from "./components/users/users.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {UserEditComponent} from "./components/user-edit/user-edit.component";
import {UserCreateComponent} from "./components/user-create/user-create.component";

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: UserListComponent
      }
    ]
  },
  {
    path: 'edit/:id',
    component: UserEditComponent
  },
  {
    path: 'create',
    component: UserCreateComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

