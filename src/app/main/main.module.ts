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
import { SettingComponent } from './components/setting/setting.component';
import { ManagerPersonComponent } from './components/manager-person/manager-person.component';
import { ManagerExaminationComponent } from './components/manager-examination/manager-examination.component';
import { AddPersonComponent } from './components/manager-person/add-person/add-person.component';
import { AddExaminationComponent } from './components/manager-examination/add-examination/add-examination.component';
import { EditBuildingComponent } from './components/manager-building/edit-building/edit-building.component';
import { DeleteBuildingComponent } from './components/manager-building/delete-building/delete-building.component';
import { EditCourseComponent } from './components/manager-course/edit-course/edit-course.component';
import { DeleteCourseComponent } from './components/manager-course/delete-course/delete-course.component';
import { DeleteExaminationComponent } from './components/manager-examination/delete-examination/delete-examination.component';
import { EditExaminationComponent } from './components/manager-examination/edit-examination/edit-examination.component';
import { EditPersonComponent } from './components/manager-person/edit-person/edit-person.component';
import { DeletePersonComponent } from './components/manager-person/delete-person/delete-person.component';
import { EditRoomComponent } from './components/manager-room/edit-room/edit-room.component';
import { DeleteRoomComponent } from './components/manager-room/delete-room/delete-room.component';
import { EditSubjectComponent } from './components/manager-subject/edit-subject/edit-subject.component';
import { DeleteSubjectComponent } from './components/manager-subject/delete-subject/delete-subject.component';


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
    AddRoomComponent,
    SettingComponent,
    ManagerPersonComponent,
    ManagerExaminationComponent,
    AddPersonComponent,
    AddExaminationComponent,
    EditBuildingComponent,
    DeleteBuildingComponent,
    EditCourseComponent,
    DeleteCourseComponent,
    DeleteExaminationComponent,
    EditExaminationComponent,
    EditPersonComponent,
    DeletePersonComponent,
    EditRoomComponent,
    DeleteRoomComponent,
    EditSubjectComponent,
    DeleteSubjectComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    TemplatesModule
  ]
})

export default class MainModule { }