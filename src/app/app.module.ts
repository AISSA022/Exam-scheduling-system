import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './Material/materials/materials.module';
import { UsersComponent } from './users/users.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateuserComponent } from './users/createuser/createuser/createuser.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { DeleteuserComponent } from './users/deleteuser/deleteuser.component';
import{MatDialog} from '@angular/material/dialog'
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    CreateuserComponent,
    EditUserComponent,
    DeleteuserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialsModule,
    NgbDropdownModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
