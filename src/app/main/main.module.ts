import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { TemplatesModule } from '../templates/templates.module';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManagerCourseComponent } from './components/manager-course/manager-course.component';
import { ManagerSubjectComponent } from './components/manager-subject/manager-subject.component';
import { ManagerBuildingComponent } from './components/manager-building/manager-building.component';
import { ManagerRoomComponent } from './components/manager-room/manager-room.component';
import { AddSubjectComponent } from './components/manager-subject/add-subject/add-subject.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ManagerCourseComponent,
    ManagerSubjectComponent,
    ManagerBuildingComponent,
    ManagerRoomComponent,
    AddSubjectComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    TemplatesModule
  ]
})

export default class MainModule { }