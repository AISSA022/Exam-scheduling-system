import { Component, OnInit } from '@angular/core';
import { Usersmodel } from '../Models/Users';
import { AuthService } from '../Services/Auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgToastService } from 'ng-angular-popup';
import { UserStoreService } from '../Services/User-Store/user-store.service';
import { AppServicesService } from '../Services/app-services.service';
import { ResetModalComponent } from './Reset-modal/reset-modal/reset-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ///////////////passwordhideshow/////////////////////////////////
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa fa-eye-slash"
  LoginForm!: FormGroup;
  userid!: number;
  modalRef: MdbModalRef<ResetModalComponent> | null = null;
  ///////////////////////////////////////////////////////////////////
  constructor(private toastr: NgToastService,
    private authservice: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private userstoreService: UserStoreService,
    private appservice: AppServicesService,
    private modalService: MdbModalService
  ) { }
  ///////////////////////////////////////////////////////////////////
  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      password: ['', Validators.required],
      firstName: 'string',
      lastName: 'string',
      email: ['', Validators.required],
      gender: 'string',
      passwordSalt: 'string',
    })
  }
  ///////////////////////////////////////////////////////////////////
  hidepass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  ///////////////////////////////////////////////////////////////////
  login() {
    {
      if (this.LoginForm.valid) {
        this.authservice.login(this.LoginForm.value).subscribe({
          next: (res) => {
            const Email = this.LoginForm.value.email;
            localStorage.setItem('Email', Email);
            this.authservice.storeid();
            this.router.navigate(['home']);
            const tokenpayload = this.authservice.decodedToken();
            this.userstoreService.setRolefromstore(tokenpayload.role);
            this.userstoreService.setfullNamefromstore(tokenpayload.unique_name);
            this.toastr.success({ detail: "SUCCESS", summary: "Login Successfully!", duration: 2000 })
          },
          error: (err: HttpErrorResponse) => {
            this.snackbar.open(err.error.errmessage, 'Close', {
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
  
  ///////////////////////////////////////////////////////////////////////////////
  openModal() {
    this.modalRef = this.modalService.open(ResetModalComponent)
  }











}
