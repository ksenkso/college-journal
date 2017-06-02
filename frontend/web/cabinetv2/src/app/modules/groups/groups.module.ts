import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupEditComponent } from './components/group-edit/group-edit.component';
import { GroupCreateComponent } from './components/group-create/group-create.component';
import {GroupRoutingModule} from "./groups-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {GroupsService} from "../../services/groups.service";

@NgModule({
  imports: [
    CommonModule,
    GroupRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [GroupFormComponent, GroupsComponent, GroupListComponent, GroupEditComponent, GroupCreateComponent],
  providers: [GroupsService]
})
export class GroupsModule { }
