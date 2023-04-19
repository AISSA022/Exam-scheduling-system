import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AppServicesService } from 'src/app/Services/app-services.service';

@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.css']
})
export class DeleteuserComponent implements OnInit {
  userfirstName!: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { firstName: string, id: number }, private snackbar: MatSnackBar, private dialog: MatDialog, private service: AppServicesService) { }

  ngOnInit() {
  }
  // getallusers(){
  //   this.service.getAllUsers().subscribe({
  //     next:(res)=>{

  //     }
  //   })
  // }
  deleteuser(id: number) {
    this.service.deleteuser(id).subscribe({
      next: (res) => {
        this.dialog.closeAll(),
          this.snackbar.open('User Deleted successfully', 'Close', {
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
  cancle() {
    this.dialog.closeAll()
  }
}
