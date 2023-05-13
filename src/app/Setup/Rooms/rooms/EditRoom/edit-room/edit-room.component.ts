import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SetupService } from 'src/app/Services/Setup/setup.service';

function onlyNumbersValidator(control: FormControl) {
  const regex = /^[0-9]*$/;
  const value = control.value || '';
  return regex.test(value) ? null : { onlyNumbers: true };
}
@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {
  editroomForm!: FormGroup;
  id?: number;
  /////////////////////////////////////////////////////////////////////
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private SetupServices: SetupService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private snackbar: MatSnackBar) {
    this.editroomForm = this.fb.group({
      id: 0,
      roomName: ['', Validators.required],
      seatNumber: ['', [Validators.required, onlyNumbersValidator]],
      columns: ['', [Validators.required, onlyNumbersValidator]],
      row: ['', [Validators.required, onlyNumbersValidator]],
      building: ['', Validators.required],
    })
  }
  /////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
  
    this.editroomForm.patchValue(this.data)
  }

  ////////////////////////////////////////////////////////////////////////////////////
  updateroom() {
    if (this.editroomForm.valid) {
      if (this.data) {
        this.SetupServices.UpdateRoom(this.data.roomId, this.editroomForm.value)
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
  /////////////////////////////////////////////////////////////////////////////////////
  validateColumns() {
    this.editroomForm?.get('columns')?.updateValueAndValidity();
  }
}
