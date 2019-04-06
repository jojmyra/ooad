import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';

import { HttpService } from './http.service';
import { AuthenticatorService } from './authenticator.service';
import { AlertService } from './service/alert.service';
import { PersonService } from './service/person.service';
import { TemplatesModule } from './templates/templates.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    TemplatesModule
  ],
  providers: [
    HttpService,
    AuthenticatorService,
    AlertService,
    PersonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
