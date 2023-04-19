import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateuserComponent } from './users/createuser/createuser/createuser.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './Services/Auth/auth.guard';
import { UserProfileComponent } from './users/user-profile/user-profile/user-profile.component';
import {ResetPassComponent} from './users/reset-pass/reset-pass/reset-pass.component';


const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "home", component: HomeComponent },
  { path: "users", component: UsersComponent, canActivate: [AuthGuard] },
  { path: "users/CreateUser", component: CreateuserComponent, canActivate: [AuthGuard] },
  // { path: "users/EditUser/:id", component: EditUserComponent, data: { skipLocationChange: true } },
  { path: "login", component: LoginComponent },
  { path: "users/profile/:id", component: UserProfileComponent },
  { path: "reset", component: ResetPassComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
