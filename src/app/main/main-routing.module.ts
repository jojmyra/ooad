import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManagerCourseComponent } from './components/manager-course/manager-course.component';
import { ManagerBuildingComponent } from './components/manager-building/manager-building.component';
import { ManagerSubjectComponent } from './components/manager-subject/manager-subject.component';
import { AddSubjectComponent } from './components/manager-subject/add-subject/add-subject.component';
import { ManagerRoomComponent } from './components/manager-room/manager-room.component';

const mainRouter: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'manager-course', component: ManagerCourseComponent },
  { path: 'manager-building', component: ManagerBuildingComponent },
  { path: 'manager-room/:buildingId', component: ManagerRoomComponent },
  { path: 'manager-subject', component: ManagerSubjectComponent },
  { path: 'add-subject', component: AddSubjectComponent }
];

@NgModule({
  imports: [RouterModule.forChild(mainRouter)],
  exports: [RouterModule]
})

export class MainRoutingModule { }