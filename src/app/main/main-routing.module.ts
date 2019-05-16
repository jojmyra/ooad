import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManagerCourseComponent } from './components/manager-course/manager-course.component';
import { ManagerBuildingComponent } from './components/manager-building/manager-building.component';
import { ManagerSubjectComponent } from './components/manager-subject/manager-subject.component';
import { ManagerRoomComponent } from './components/manager-room/manager-room.component';
import { SettingComponent } from './components/setting/setting.component';
import { ManagerPersonComponent } from './components/manager-person/manager-person.component';
import { ManagerExaminationComponent } from './components/manager-examination/manager-examination.component';
import { AddExaminationComponent } from './components/manager-examination/add-examination/add-examination.component';
import { ExamComponent } from './exam/exam.component';
import { ObserverExamComponent } from './observer-exam/observer-exam.component';

const mainRouter: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'manager-person', component: ManagerPersonComponent },
  { path: 'manager-course', component: ManagerCourseComponent },
  { path: 'manager-building', component: ManagerBuildingComponent },
  { path: 'manager-room/:buildingId', component: ManagerRoomComponent },
  { path: 'manager-subject', component: ManagerSubjectComponent },
  { path: 'manager-exam', component: ManagerExaminationComponent },
  { path: 'manager-exam/add', component: AddExaminationComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'exam', component: ExamComponent },
  { path: 'observer-exam', component: ObserverExamComponent }
];

@NgModule({
  imports: [RouterModule.forChild(mainRouter)],
  exports: [RouterModule]
})

export class MainRoutingModule { }