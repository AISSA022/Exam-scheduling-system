import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './Material/materials/materials.module';
import { UsersComponent } from './users/users.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CreateuserComponent } from './users/createuser/createuser/createuser.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { DeleteuserComponent } from './users/deleteuser/deleteuser.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './Services/Auth/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgToastModule } from 'ng-angular-popup';
import { NavbarComponent } from './NavBar/navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { UserProfileComponent } from './users/user-profile/user-profile/user-profile.component';
import { ResetModalComponent } from './login/Reset-modal/reset-modal/reset-modal.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { CommonModule } from '@angular/common';
import { ResetPassComponent } from './users/reset-pass/reset-pass/reset-pass.component';
import { RolesComponent } from './roles/roles.component';
import { EditProfileComponent } from './users/user-profile/edit-profile/edit-profile/edit-profile.component';
import { EditRolesComponent } from './roles/edit-roles/edit-roles/edit-roles.component';
import { PermissionComponent } from './roles/permission/permission/permission.component';
import { PeriodComponent } from './Setup/Period/period/period.component';
import { RoomsComponent } from './Setup/Rooms/rooms/rooms.component';
import { CreateRoomComponent } from './Setup/Rooms/rooms/CreateRoom/create-room/create-room.component';
import { DeleteRoomComponent } from './Setup/Rooms/rooms/DeleteRoom/delete-room/delete-room.component';
import { EditRoomComponent } from './Setup/Rooms/rooms/EditRoom/edit-room/edit-room.component';
import { CreatePeriodComponent } from './Setup/Period/period/CreatePeriod/create-period/create-period.component';
import { DeltePeriodComponent } from './Setup/Period/period/DeeletPeriod/delte-period/delte-period.component';
import { EditPeriodComponent } from './Setup/Period/period/EditPeriod/edit-period/edit-period.component';
import { CoursesComponent } from './Courses/courses/courses.component';
import { CreateCourseComponent } from './Courses/courses/CreateCourse/create-course/create-course.component';
import { DelteCourseComponent } from './Courses/courses/DeleteCourse/delte-course/delte-course.component';
import { EditCourseComponent } from './Courses/courses/EditCourse/edit-course/edit-course.component';
import { StudentCourseComponent } from './Courses/courses/StudentCourse/student-course/student-course.component';
import { StudentOfTheCourseComponent } from './Courses/courses/StudentOfTheCourse/student-of-the-course/student-of-the-course.component';
import { DaysComponent } from './Setup/Days/days/days.component';
import { EditDaysComponent } from './Setup/Days/days/EditDay/edit-days/edit-days.component';
import { DeleteDayComponent } from './Setup/Days/days/DeleteDay/delete-day/delete-day.component';
import { AddDayComponent } from './Setup/Days/days/AddDay/add-day/add-day.component';
import { BookExamComponent } from './Courses/courses/BookExam/book-exam/book-exam.component';
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    CreateuserComponent,
    EditUserComponent,
    DeleteuserComponent,
    LoginComponent,
    NavbarComponent,
    UserProfileComponent,
    ResetModalComponent,
    ResetPassComponent,
    RolesComponent,
    EditProfileComponent,
    EditRolesComponent,
    PermissionComponent,
    PeriodComponent,
    RoomsComponent,
    CreateRoomComponent,
    DeleteRoomComponent,
    EditRoomComponent,
    CreatePeriodComponent,
    DeltePeriodComponent,
    EditPeriodComponent,
    CoursesComponent,
    CreateCourseComponent,
    DelteCourseComponent,
    EditCourseComponent,
    StudentCourseComponent,
    StudentOfTheCourseComponent,
    DaysComponent,
    EditDaysComponent,
    DeleteDayComponent,
    AddDayComponent,
    BookExamComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialsModule,
    NgbDropdownModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgToastModule,
    MatMenuModule,
    MdbModalModule,
    CommonModule,

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  exports: [ResetModalComponent]
})
export class AppModule { }
export class ResetModalComponentModule { }