import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SetupService } from 'src/app/Services/Setup/setup.service';

@Component({
  selector: 'app-create-period',
  templateUrl: './create-period.component.html',
  styleUrls: ['./create-period.component.css']
})
export class CreatePeriodComponent implements OnInit {
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
  dayTimes: { Id: number, Time: Date }[] = [];
  Rooms: { id: number, name: string }[] = [];
  createPeriodForm!: FormGroup;
  semestercourseId!: number;
  dayIdSubscription: Subscription | undefined;
  //////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private snackbar: MatSnackBar, private SetUpservice: SetupService, private formBuilder: FormBuilder, private router: Router, private matdialog: MatDialog) { }
  //////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.getrooms()
    this.getDays()
    console.log(this.dayTimes)
    this.createPeriodForm = this.formBuilder.group({
      id: 0,
      periodName: ['', Validators.required],
      dayId: [this.dayTimes, [Validators.required]],
      timeFrom: ['', [Validators.required]],
      timeTo: ['', Validators.required],
      roomId: ['', Validators.required],
      day: this.formBuilder.group({
        dayId: ['', Validators.required],
        dayTime: ['', Validators.required]
      })
    })
    ///////////////////
    this.getDayTimeById(2)
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////
  getrooms() {
    this.SetUpservice.getrooms().subscribe({
      next: (res) => {
        this.Rooms = res.map((room: { roomName: any; }) => room.roomName);
        this.Rooms = res.map((room: {
          roomId: any;
          roomName: any; id: any; name: any;
        }) => ({ id: room.roomId, name: room.roomName }));
      }
    })
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////
  closedialog() {
    this.matdialog.closeAll()
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////
  addPeriod() {
    console.log(this.createPeriodForm.value)
    this.SetUpservice.insertPeriod(this.createPeriodForm.value).subscribe({
      next: (res) => {
        this.matdialog.closeAll();
        this.snackbar.open('Period Created successfully', 'Close', {
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
  //////////////////////////////////////////////////////////////////////////////////////////////////

  getDays() {
    this.SetUpservice.getDays().subscribe({
      next: (res) => {
        this.SetUpservice.getDays().subscribe((res: any[]) => {
          res.forEach((day: any) => {
            this.dayTimes.push({ Id: day.dayId, Time: day.dayTime });
          });
        });
      }
    })
  }
  // updateDayTime() {
  //   const selectedDayId = this.createPeriodForm.get('dayId')?.value;
  //   const selectedDay = this.dayTimes.find(day => day.Id === selectedDayId);

  //   if (selectedDay) {
  //     this.createPeriodForm.get('day.dayTime')?.setValue(selectedDay.Time);
  //     this.createPeriodForm.get('day.dayId')?.setValue(selectedDayId);
  //   }
  // }
  getDayTimeById(id: number) {
    const day = this.dayTimes.find(day => day.Id === id);
    if (day) {
      const time = new Date(day.Time);
      console.log(time)
    }
  }
}
