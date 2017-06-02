import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {UsersRoutingModule} from "./users-routing.module";
import {UsersService} from "./services/users.service";
import { UsersComponent } from './components/users/users.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserListComponent } from './components/user-list/user-list.component';
import {GroupsService} from "../../services/groups.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ],
  declarations: [UsersComponent, UsersFormComponent, UserEditComponent, UserCreateComponent, UserListComponent],
  providers: [UsersService, GroupsService]
})
export class UsersModule { }
