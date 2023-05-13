import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmPasswordValidators } from 'src/app/Helpers/confirm-password.validator';
import { ResetPassword } from 'src/app/Models/reset-password-model';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { ResetPasswordService } from 'src/app/Services/Resetpass/reset-password.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

  resetPasswordForm!: FormGroup;
  emailToken!: string;
  emailToReset!: String;
  resetPasswordObj = new ResetPassword();


  //////////////////////////////////////////////////////////////////////
  constructor(private router: Router,
    private fb: FormBuilder,
    private activatedRoue: ActivatedRoute,
    private resetService: ResetPasswordService,
    private snackbar: MatSnackBar,) { }
  //////////////////////////////////////////////////////////////////////
  ngOnInit() {

    //////////////////////////////////////////
    this.resetPasswordForm = this.fb.group({
      password: [null, [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: ConfirmPasswordValidators("password", "confirmPassword")
    });
    //////////////////////////////////////////////////////////////
    this.activatedRoue.queryParams.subscribe(val => {
      this.emailToReset = val['email'];
      let uriToken = val['code'];
      this.emailToken = uriToken.replace(/ /g, '+');
    })
  }

  ///////////////////////////////////////////////////////////////////////

  resetbyemail() {
    if (this.resetPasswordForm.valid) {
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword = this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword = this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken = this.emailToken;
      /////
      console.log(this.resetPasswordForm.value.password);
      console.log(this.resetPasswordForm.value.confirmPassword);
      console.log(this.resetPasswordObj.email);
      console.log(this.resetPasswordObj.emailToken);

      //////
      this.resetService.resetpasswordByEmail(this.resetPasswordObj)
        .subscribe({
          next: (res) => {
            this.snackbar.open("Password Reset Successfully", 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['my-snackbar']
            })
            this.router.navigate(['/'])
          },
          error: (err) => {
            this.snackbar.open("SOME THING WENT WRONG!!!", 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['my-snackbar']
            })
          }
        })
    }
    // else
    // {
    //   ValidateForm.validateAllFormFields(this.resetPasswordForm);
    // }
  }
  ///////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////
}
