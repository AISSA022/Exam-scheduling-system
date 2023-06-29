import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SetupService } from 'src/app/Services/Setup/setup.service';
import { RoomDetailsComponent } from './Room-Details/room-details/room-details.component';

function onlyNumbersValidator(control: FormControl) {
  const regex = /^[0-9]*$/;
  const value = control.value || '';
  return regex.test(value) ? null : { onlyNumbers: true };
}
@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
  createRoomForm!: FormGroup;
  //////////////////////////////////////////////////////////////////////////////////////
  constructor(private formBuilder: FormBuilder, private setupService: SetupService, private matdialog: MatDialog, private snackbar: MatSnackBar) { }
  //////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.createRoomForm = this.formBuilder.group({
      id: 0,
      roomName: ['', Validators.required],
      seatNumber: ['', [Validators.required, onlyNumbersValidator]],
      columns: ['', [Validators.required, onlyNumbersValidator]],
      building: ['', Validators.required],
    })
  }
  //////////////////////////////////////////////////////////////////////////////////////
  CreateRoom() {
    this.setupService.insertRoom(this.createRoomForm.value).subscribe({
      next: (res) => {
        this.matdialog.closeAll();
        this.snackbar.open('Room Created successfully', 'Close', {
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
  //////////////////////////////////////////////////////////////////////////////////////
  validateColumns() {
    this.createRoomForm?.get('columns')?.updateValueAndValidity();
  }
  //////////////////////////////////////////////////////////////////////////////////////
  openRoomDetials(data: any) {
    this.matdialog.open(RoomDetailsComponent, {
      data,
    });
  }
  //////////////////////////////////////////////////////////////////////////////////////

}
