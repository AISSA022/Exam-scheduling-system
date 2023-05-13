import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SetupService } from 'src/app/Services/Setup/setup.service';

@Component({
  selector: 'app-edit-period',
  templateUrl: './edit-period.component.html',
  styleUrls: ['./edit-period.component.css']
})
export class EditPeriodComponent implements OnInit {
  Time = [
    { id: 1, name: '8:00' },
    { id: 2, name: '8:30' },
    { id: 3, name: '9:00' },
    { id: 4, name: '9:30' },
    { id: 5, name: '10:00' },
    { id: 6, name: '10:30' },
    { id: 7, name: '11:00' },
    { id: 8, name: '11:30' },
    { id: 9, name: '12:00' },
    { id: 10, name: '12:30' },
    { id: 11, name: '1:00' },
    { id: 12, name: '1:30' },
    { id: 13, name: '2:00' },
    { id: 14, name: '2:30' },
    { id: 15, name: '3:00' },
    { id: 16, name: '3:30' },
    { id: 17, name: '4:00' },
    { id: 18, name: '4:30' },
    { id: 19, name: '5:00' },
    { id: 20, name: '5:30' },

  ];
  Rooms: { id: number, name: string }[] = [];
  EditPeriodForm!: FormGroup;
  roomnames: string | undefined;
  //////////////////constructor//////////////////
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private SetUpservices: SetupService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar) {
    this.EditPeriodForm = this.fb.group({
      id: 0,
      periodName: ['', Validators.required],
      periodTime: ['', [Validators.required]],
      timeFrom: ['', [Validators.required]],
      timeTo: ['', Validators.required],
      roomId: ['', Validators.required],
    })

  }
  ////////////////////////////////////
  ngOnInit() {
    this.getrooms()
    this.getroomName()
    this.EditPeriodForm.patchValue(this.data)
  }
  ////////////////////////////////////
  close() {
    this.dialog.closeAll()
  }
  ////////////////////////////////////
  EditPeriod() {
    if (this.EditPeriodForm.valid) {
      if (this.data) {
        this.SetUpservices.UpdatePeriod(this.data.id, this.EditPeriodForm.value)
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

  ////////////////////////////////////
  getrooms() {
    this.SetUpservices.getrooms().subscribe({
      next: (res) => {
        this.Rooms = res.map((room: {
          roomId: any;
          roomName: any; id: any; name: any;
        }) => ({ id: room.roomId, name: room.roomName }));
        console.log(this.Rooms)
      }
    })
  }
  ////////////////////////////////////////////////////////////
  getroomName() {
    this.SetUpservices.getRoomName(this.data.roomId).subscribe({
      next: (res: any) => {
        this.roomnames = res.roomName;
        console.log(this.roomnames)
      }
    })
  }
}
