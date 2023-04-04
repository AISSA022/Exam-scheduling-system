import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateuserComponent } from './users/createuser/createuser/createuser.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: "*", component: AppComponent },
  { path: "home", component: HomeComponent },
  { path: "users", component: UsersComponent },
  { path: "users/CreateUser", component: CreateuserComponent },
  { path: "users/EditUser/:id", component: EditUserComponent, data: { skipLocationChange: true } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
