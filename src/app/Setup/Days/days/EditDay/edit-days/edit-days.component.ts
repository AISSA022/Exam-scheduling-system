import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SetupService } from 'src/app/Services/Setup/setup.service';

@Component({
  selector: 'app-edit-days',
  templateUrl: './edit-days.component.html',
  styleUrls: ['./edit-days.component.css']
})
export class EditDaysComponent implements OnInit {
  dayid!: number;
  EditDayForm!: FormGroup;
  //////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private snackbar: MatSnackBar, private SetUpservice: SetupService, private fb: FormBuilder,
    private router: Router,
    private matdialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,) {

    this.EditDayForm = this.fb.group({
      dayId: 0,
      dayTime: ['', Validators.required],
    })

  }
  //////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.dayid = this.data.dayId
    this.EditDayForm.patchValue(this.data)
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////
  close() {
    this.matdialog.closeAll()
  }
  ///////////////////////////////////////////////////////////////////////////////////////////
  EditDay() {
    this.SetUpservice.UpdateDay(this.dayid, this.EditDayForm.value).subscribe({
      next: (res) => {
        this.matdialog.closeAll(),
          this.snackbar.open('Day Updated successfully', 'Close', {
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
