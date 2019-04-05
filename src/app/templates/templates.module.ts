import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ContentComponent } from './content/content.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ContentComponent,
    SidebarComponent
  ],
  exports: [
    NavbarComponent,
    ContentComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TemplatesModule { }
