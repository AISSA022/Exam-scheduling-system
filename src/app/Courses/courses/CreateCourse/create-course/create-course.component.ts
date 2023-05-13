import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/Services/Courses/courses.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  createCourseForm!: FormGroup;
  ///////////////////////////////////////////////////////////////////////////////
  constructor(private snackbar: MatSnackBar, private Courseservice: CoursesService, private formBuilder: FormBuilder, private router: Router, private matdialog: MatDialog) { }
  ///////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.createCourseForm = this.formBuilder.group({
      courseId: 0,
      courseName: ['', Validators.required],
      courseCode: ['', Validators.required],
      section: ['', Validators.required],
      instructor: ['', Validators.required],
    })
  }
  ///////////////////////////////////////////////////////////////////////////////
  closedialog() {
    this.matdialog.closeAll()
  }
  ///////////////////////////////////////////////////////////////////////////////
  addcourse() {
    this.Courseservice.AddCourse(this.createCourseForm.value).subscribe({
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
