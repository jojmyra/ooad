import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManagerCourseComponent } from './components/manager-course/manager-course.component';
import { ManagerBuildingComponent } from './components/manager-building/manager-building.component';
import { ManagerSubjectComponent } from './components/manager-subject/manager-subject.component';

const mainRouter: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'manager-course', component: ManagerCourseComponent },
  { path: 'manager-building', component: ManagerBuildingComponent },
  { path: 'manager-subject', component: ManagerSubjectComponent }
];

@NgModule({
  imports: [RouterModule.forChild(mainRouter)],
  exports: [RouterModule]
})

export class MainRoutingModule { }