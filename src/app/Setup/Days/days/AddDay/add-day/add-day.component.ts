import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SetupService } from 'src/app/Services/Setup/setup.service';

@Component({
  selector: 'app-add-day',
  templateUrl: './add-day.component.html',
  styleUrls: ['./add-day.component.css']
})
export class AddDayComponent implements OnInit {
  createDayForm!: FormGroup;
  //////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private snackbar: MatSnackBar, private SetUpservice: SetupService, private formBuilder: FormBuilder, private router: Router, private matdialog: MatDialog) { }
  //////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.createDayForm = this.formBuilder.group({
      dayId: 0,
      dayTime: ['', Validators.required],
    })
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////

  close() {
    this.matdialog.closeAll()
  }
  addDay() {
    this.SetUpservice.insertDay(this.createDayForm.value).subscribe({
      next: (res) => {
        this.matdialog.closeAll();
        this.snackbar.open('Day Created successfully', 'Close', {
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
}
