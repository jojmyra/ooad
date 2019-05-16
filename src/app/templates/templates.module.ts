import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ContentComponent } from './content/content.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, ModalModule, PaginationModule, BsDatepickerModule, TypeaheadModule, TimepickerModule  } from 'ngx-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule } from '@angular/common/http';
import { PersonService } from '../service/person.service';
import { AlertService } from '../service/alert.service';
import { AuthenticatorService } from '../authenticator.service';
import { HttpService } from '../http.service';
import { DataTablesModule } from 'angular-datatables';

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
    TimepickerModule,
    TypeaheadModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    DataTablesModule
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
    BsDatepickerModule.forRoot(),
    TypeaheadModule.forRoot(),
    TimepickerModule.forRoot(),
    DataTablesModule
  ],
  providers: [
    HttpService,
    AuthenticatorService,
    AlertService,
    PersonService
  ]
})
export class TemplatesModule { }
