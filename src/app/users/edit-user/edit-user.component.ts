import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Usersmodel } from 'src/app/Models/Users';
import { AppServicesService } from 'src/app/Services/app-services.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  edituserForm!: FormGroup;
  id?: number;
  //////////////////constructor//////////////////
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private services: AppServicesService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private snackbar: MatSnackBar) {

    this.edituserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      birthday: ['', Validators.required],
      status: true,
      loggedIn: false,
    })
  }
  ///////////////////oninit/////////////////////////
  ngOnInit(): void {
    this.edituserForm.patchValue(this.data)
  }

  ////////////////////updateuser///////////////
  updateuser() {
    if (this.edituserForm.valid) {
      if (this.data) {
        this.services.updateuser(this.data.id, this.edituserForm.value)
          .subscribe({
            next: (res) => {
              this.dialog.closeAll(),
                this.snackbar.open('User Details Updated successfully', 'Close', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom',
                  panelClass: ['my-snackbar']
                }),
                window.location.reload();
            },
            error: (err: HttpErrorResponse) => {

              this.snackbar.open(err.error.message, 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                panelClass: ['my-snackbar']
              })
            }
          })
      }

    }
  }
  /////////////////////////////////////////
  close() {
    this.dialog.closeAll()
  }


}
