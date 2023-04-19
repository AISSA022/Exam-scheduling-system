import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ResetPasswordService } from 'src/app/Services/Resetpass/reset-password.service';
import { AppServicesService } from 'src/app/Services/app-services.service';

@Component({
  selector: 'app-reset-modal',
  templateUrl: './reset-modal.component.html',
  styleUrls: ['./reset-modal.component.css']
})
export class ResetModalComponent {
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;

  // //////////////////////////////////////////
  constructor(public modalRef: MdbModalRef<ResetModalComponent>, private appservice: AppServicesService, private snackbar: MatSnackBar, private resetpassService: ResetPasswordService) { }

  /////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  CheckValidEmail(event: string) {
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }
  ///////////////////////////////////////////////////////////////////////////////
  confirmToSend() {
    if (this.CheckValidEmail(this.resetPasswordEmail)) {
      this.resetpassService.SendResetPasswordLink(this.resetPasswordEmail)
        .subscribe({
          next: (res) => {
            this.resetPasswordEmail = "";
            this.modalRef.close();
            this.snackbar.open("Please Check Your Email", 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['my-snackbar']
            })
          },
          error: (err) => {
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
  ////////////////////////////////////////////////////
  colsebtn(){
    this.modalRef.close()
  }
}
