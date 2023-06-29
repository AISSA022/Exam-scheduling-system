import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/Services/Courses/courses.service';
import { SemesterCourseService } from 'src/app/Services/Semester-Course/semester-course.service';
import { UserStoreService } from 'src/app/Services/User-Store/user-store.service';

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.css']
})
export class StudentCourseComponent implements OnInit {
  CourseName!: '';
  CourseId!: number;
  semasterId!: number;
  selectedStudentIds: number[] = [];
  studentIds: number[] = [];
  /////////////////Table//////////////////
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'add'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ///////////////////////////////////////
  constructor(private Courseservice: CoursesService,
    private router: Router,
    private matdialog: MatDialog,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private userstoreService: UserStoreService,
    private SemesterCourseService: SemesterCourseService,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {

  }

  /////////////////////////////////////////////////////////////

  ngOnInit() {
    this.getStudents()
    this.CourseName = this.data.courseName
    this.CourseId = this.data.courseid
    this.semasterId = this.data.selectedSemester
    console.log(this.CourseName)
    console.log(this.data.semesterCourseId)
    console.log(this.data.semesterIdSelected)
    this.getStudentsId()
  }

  /////////////////////////////////////////////////////////
  getStudents() {
    this.SemesterCourseService.GetStudents().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        console.log(this.dataSource)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
      }

    })
  }
  //////////////////FilterTable Search//////////////////////////
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ////////////////////////////////////////////////////////////
  toggleStudentSelection(student: any) {
    if (student.selected) {
      this.selectedStudentIds.push(student.id);
    } else {
      const index = this.selectedStudentIds.indexOf(student.id);
      if (index !== -1) {
        this.selectedStudentIds.splice(index, 1);
      }
    }
    console.log(this.selectedStudentIds)

  }
  ////////////////////////////////////////////////////////////
  closedialog() {
    this.matdialog.closeAll()
  }

  ////////////////////////////////////////////////////////////
  // AddStudentToCourse() {
  //   this.SemesterCourseService.AddStudentToCourse(this.selectedStudentIds, this.data.semesterCourseId).subscribe({
  //     next: (res) => {

  //       this.matdialog.closeAll();
  //       this.snackbar.open('Students Added successfully', 'Close', {
  //         duration: 3000,
  //         horizontalPosition: 'center',
  //         verticalPosition: 'bottom',
  //         panelClass: ['my-snackbar']
  //       })
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       const message = err.error.errMessage
  //       this.snackbar.open(message, 'Close', {
  //         duration: 3000,
  //         horizontalPosition: 'center',
  //         verticalPosition: 'bottom',
  //       })
  //     }
  //   })
  // }
  ////////////////////////////////////////////////////////////
  getStudentsId() {
    this.SemesterCourseService.getstudentsincourse(this.data.semesterCourseId).subscribe({
      next: (res) => {
        this.studentIds = res;
        this.selectedStudentIds = res
        console.log(this.studentIds)
      }
    })
  }
  /////////////////////////////////////////////
  isStudentSelected(studentId: number): boolean {
    return this.studentIds.includes(studentId);
  }
  ////////////////////////////////
  AddStudentToCourse() {
    this.studentIds.forEach((r) => {
      this.Courseservice.StudentCheckconflict(this.data.semesterIdSelected  , this.data.semesterCourseId, r).subscribe({
        next: (res) => {
          if (res == 1) {
            this.snackbar.open('Error Student Time Confilct', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['my-snackbar']
            })
          }
          else {
            this.matdialog.closeAll();
            this.snackbar.open('Students Added successfully', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['my-snackbar']
            })
          }
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

    });
  }
}
