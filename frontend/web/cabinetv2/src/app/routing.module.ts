/**
 * Created by yazun on 20.04.2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: DashboardComponent
  },
  {
    path: 'students',
    loadChildren: './modules/students/students.module#StudentsModule'
  },
  {
    path: 'groups',
    loadChildren: './modules/groups/groups.module#GroupsModule'
  },
  {
    path: 'users',
    loadChildren: './modules/users/users.module#UsersModule'
  },
  {
    path: 'calendar',
    loadChildren: './modules/calendar/calendar.module#CalendarModule'
  },
  {
    path: '**',
    component: NotFoundComponent
  }


];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class RoutingModule { }
