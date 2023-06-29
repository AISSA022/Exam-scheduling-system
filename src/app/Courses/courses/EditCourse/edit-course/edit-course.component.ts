import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/Services/Courses/courses.service';
import { SemesterCourseService } from 'src/app/Services/Semester-Course/semester-course.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent {
  editCourseForm!: FormGroup;
  id?: number;
  RoomPeriod: { id: number, periodName: string, roomName: string, Date: Date, timeFrom: string }[] = [];
  roomid!: number;
  roomperiodId!: number;
  SemesterCourseId!: number;
  //////////////////constructor//////////////////
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private Courseservices: CoursesService,
    private SemesterCourseservices: SemesterCourseService,
    @Inject(MAT_DIALOG_DATA) public data: { data: any, semesterIdSelected: any },
    private snackbar: MatSnackBar) {
    this.editCourseForm = this.fb.group({
      courseId: 0,
      courseName: ['', Validators.required],
      courseCode: ['', Validators.required],
      section: ['', Validators.required],
      instructor: ['', Validators.required],
      semesterId: ['', Validators.required],
      roomPeriod: [''],
    })
  }
  ///////////////////oninit/////////////////////////
  ngOnInit(): void {
    this.editCourseForm.patchValue(this.data.data)
    this.getRoomPeriod()
    if (this.data.data.roomName != null && this.data.data.periodName != null) {
      this.getroomperiodId()
    }
    this.getSemesterCourseId()
  }

  ////////////////////updateuser///////////////
  updateCourse() {
    const courseName = this.editCourseForm.get('courseName')?.value;
    const courseCode = this.editCourseForm.get('courseCode')?.value;
    const section = this.editCourseForm.get('section')?.value;
    const instructor = this.editCourseForm.get('instructor')?.value;
    //////
    const courseData = {
      courseName: courseName,
      courseCode: courseCode,
      section: section,
      instructor: instructor
    };
    //////
    if (this.data) {
      this.Courseservices.EditCourse(this.data.data.courseId, courseData)
        .subscribe({
          next: (res) => {

            this.snackbar.open('Course Details Updated successfully', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['my-snackbar']
            })
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
      if (this.roomid == null) {
        window.location.reload();
      }
      // console.log(this.data.semesterIdSelected)
      // console.log(this.SemesterCourseId)
      this.Courseservices.checkconflict(this.data.semesterIdSelected, this.SemesterCourseId).subscribe({
        next: (res) => {
          console.log(res)
          if (res == 1) {
            this.snackbar.open('Error Time Confilct', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['my-snackbar']
            })
          }
          else {
            /////
            this.SemesterCourseservices.editSemesterCourse(this.data.data.courseId, this.data.semesterIdSelected, this.roomid).subscribe({
              next: (res) => {
                this.dialog.closeAll(),
                  this.snackbar.open('Period Course Details Updated successfully', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom',
                    panelClass: ['my-snackbar']
                  })
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
      })
    }

  }
  /////////////////////////////////////////
  close() {
    this.dialog.closeAll()
  }
  /////////////////////////////////////////
  getRoomPeriod() {
    this.SemesterCourseservices.GetRoomPeriod().subscribe({
      next: (res) => {
        // periodName: string,roomName: string,day: Date,timeFrom: string
        // this.RoomPeriod = res.map((room: { roomName: any; }) => room.roomName);
        this.RoomPeriod = res.map((room: {
          periodName: any;
          roomName: any; id: any; day: Date; timeFrom: any;
        }) => ({ id: room.id, periodName: room.periodName, roomName: room.roomName, Date: room.day, timeFrom: room.timeFrom }));
        console.log(this.RoomPeriod)
      }
    })
  }
  /////////////////////////////////////////////////////
  getid(event: any) {
    this.roomid = event.target.value;
  }
  //////////////////////////////////////////////////////////////
  getroomperiodId() {
    this.SemesterCourseservices.getroomperiodId(this.data.data.roomName, this.data.data.periodName).subscribe({
      next: (res) => {
        this.roomperiodId = res;
      }
    })
  }
  ////////////////////////////////////////////////////////////
  getRoomPeriodById(id: number): { periodName: string, roomName: string, Date: Date, timeFrom: string } | undefined {
    const roomPeriod = this.RoomPeriod.find(room => room.id === id);
    if (roomPeriod) {
      return {
        periodName: roomPeriod.periodName,
        roomName: roomPeriod.roomName,
        Date: roomPeriod.Date,
        timeFrom: roomPeriod.timeFrom
      };
    }
    return undefined;
  }
  ///////////////////////////////////////////////////////////////////
  getSemesterCourseId() {
    this.Courseservices.GetSemestercourseId(this.data.data.courseId).subscribe({
      next: (res) => {
        this.SemesterCourseId = res
      }
    })
  }
}
