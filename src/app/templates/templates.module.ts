import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ContentComponent } from './content/content.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, ModalModule, PaginationModule, BsDatepickerModule } from 'ngx-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    NavbarComponent,
    ContentComponent,
    SidebarComponent
  ],
  exports: [
    NavbarComponent,
    ContentComponent,
    SidebarComponent,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    ModalModule,
    PaginationModule,
    BsDatepickerModule,
    AngularFontAwesomeModule,
    HttpClientModule
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot()
  ]
})
export class TemplatesModule { }
