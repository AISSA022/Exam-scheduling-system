import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { AppServicesService } from 'src/app/Services/app-services.service';


@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})

export class CreateuserComponent implements OnInit {
  roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' },
    { id: 3, name: 'Employee' },
  ];
  roleid: number | undefined;
  createuserForm!: FormGroup;
  constructor(private snackbar: MatSnackBar, private service: AppServicesService, private formBuilder: FormBuilder, private authservice: AuthService, private router: Router, private matdialog: MatDialog) { }


  ngOnInit() {
    this.createuserForm = this.formBuilder.group({
      id: 0,
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      birthday: ['', Validators.required],
      status: true,
      loggedIn: false,
      roleId: this.roleid,
      refreshToken: '',
      resetPasswordToken: '',
    })
    this.getrole()

  }
  ////////////////////////closedialog/////////////

  closedialog() {
    this.matdialog.closeAll()
  }

  ////////////////////ADDUSER////////////////////
  adduser() {

    this.authservice.register(this.createuserForm.value).subscribe({
      next: (res) => {
        this.matdialog.closeAll();
        this.snackbar.open('User Created successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['my-snackbar']
        }),
          window.location.reload();
      },
      error: (err: HttpErrorResponse) => {
        const message = err.error.errMessage
        this.snackbar.open(message, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        })
      }
    })
  }
  ////////////////////////////////////////
  getrole() {
    const roleIdControl = this.createuserForm.get('roleId');
    if (roleIdControl && roleIdControl.value) {
      const selectedRoleName = roleIdControl.value;
      console.log(selectedRoleName);
      this.roleid = this.roles.find(r => r.name === selectedRoleName)?.id;
      console.log(this.roleid)
    }
  }
}
