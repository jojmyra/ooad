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
import { AddBuildingComponent } from './components/manager-building/add-building/add-building.component';
import { AddCourseComponent } from './components/manager-course/add-course/add-course.component';
import { AddRoomComponent } from './components/manager-room/add-room/add-room.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ManagerCourseComponent,
    ManagerSubjectComponent,
    ManagerBuildingComponent,
    ManagerRoomComponent,
    AddSubjectComponent,
    AddBuildingComponent,
    AddCourseComponent,
    AddRoomComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    TemplatesModule
  ]
})

export default class MainModule { }