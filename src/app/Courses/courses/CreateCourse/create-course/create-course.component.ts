import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/Services/Courses/courses.service';
import { SemesterCourseService } from 'src/app/Services/Semester-Course/semester-course.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  createCourseForm!: FormGroup;
  ///////////////////////////////////////////////////////////////////////////////
  constructor(
    private snackbar: MatSnackBar,
    private Courseservice: CoursesService,
    private SemesterCourse: SemesterCourseService,
    private formBuilder: FormBuilder,
    private router: Router,
    private matdialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any) { }
  ///////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.createCourseForm = this.formBuilder.group({
      courseId: 0,
      courseName: ['', Validators.required],
      courseCode: ['', Validators.required],
      section: ['', Validators.required],
      instructor: ['', Validators.required],
    })
    console.log(this.data.semesterIdSelected)
  }
  ///////////////////////////////////////////////////////////////////////////////
  closedialog() {
    this.matdialog.closeAll()
  }
  ///////////////////////////////////////////////////////////////////////////////
  addcourse() {
    this.SemesterCourse.AddCourse(this.createCourseForm.value, this.data.semesterIdSelected).subscribe({
      next: (res) => {
        this.matdialog.closeAll();
        this.snackbar.open('Course Created successfully', 'Close', {
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
