/**
 * Created by yazun on 24.04.2017.
 */
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {GroupsComponent} from "./components/groups/groups.component";
import {GroupListComponent} from "./components/group-list/group-list.component";
import {GroupEditComponent} from "./components/group-edit/group-edit.component";
import {GroupCreateComponent} from "./components/group-create/group-create.component";

const routes: Routes = [
  {
    path: '',
    component: GroupsComponent,
    children: [
      {
        path: '',
        component: GroupListComponent
      }
    ]
  },
  {
    path: 'edit/:id',
    component: GroupEditComponent
  },
  {
    path: 'create',
    component: GroupCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
