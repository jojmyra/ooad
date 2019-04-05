import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRouting } from './main.routing';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TemplatesModule } from '../templates/templates.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MainRouting,
    TemplatesModule
  ]
})
export class MainModule { }
