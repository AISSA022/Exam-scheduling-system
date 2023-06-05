import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from 'src/app/Services/Courses/courses.service';
import { SemesterCourseService } from 'src/app/Services/Semester-Course/semester-course.service';

@Component({
  selector: 'app-delte-course',
  templateUrl: './delte-course.component.html',
  styleUrls: ['./delte-course.component.css']
})
export class DelteCourseComponent {
  userfirstName!: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { courseName: string, courseId: number },
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private SemesterCourseService: SemesterCourseService,
    private Couseservice: CoursesService) { }

  ngOnInit() {
    console.log(this.data.courseId)
  }

  deleteuser(id: number) {
    this.SemesterCourseService.DelteCourseSemesterCourse(this.data.courseId).subscribe({
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
