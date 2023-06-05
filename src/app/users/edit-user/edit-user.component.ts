import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Usersmodel } from 'src/app/Models/Users';
import { RoleServiceService } from 'src/app/Services/Roles/role-service.service';
import { AppServicesService } from 'src/app/Services/app-services.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  edituserForm!: FormGroup;
  userrole: string | undefined;
  id!: number;
  userroleid: number | undefined;
  roleid!: number;
  roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Emp' },
    { id: 3, name: 'User' },

  ];
  //////////////////constructor//////////////////
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private services: AppServicesService,
    private roleervice: RoleServiceService,
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
      roleId: ['', Validators.required],
    })
  }
  ///////////////////oninit/////////////////////////
  ngOnInit(): void {
    this.id = this.data.id
    this.roleid = this.data.roleId
    this.edituserForm.patchValue(this.data)
    this.getrole(this.id)
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
  /////////////////////////////////////////////

  getrole(id: number) {
    this.roleervice.getrole(this.id).subscribe({
      next: (res) => {
        if (res !== undefined) {
          this.userrole = this.roles.find(role => role.id == res)?.name;
          this.userroleid = this.roles.find(role => role.id == res)?.id;
          console.log(this.userrole);
          console.log(this.userroleid);

        }
      }
    })
  }

}
