import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { StudentDTO } from 'src/app/Models/StudentsDetaisl';
import { CoursesService } from 'src/app/Services/Courses/courses.service';
import { SemesterCourseService } from 'src/app/Services/Semester-Course/semester-course.service';

@Component({
  selector: 'app-student-of-the-course',
  templateUrl: './student-of-the-course.component.html',
  styleUrls: ['./student-of-the-course.component.css']
})
export class StudentOfTheCourseComponent implements OnInit {

  CourseName!: string;
  semesterId!: number;
  CourseId!: number;
  students: StudentDTO[] = [];
  /////////////////Table//////////////////
  displayedColumns: string[] = ['Id', 'FirstName', 'LastName'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ///////////////////////////////////////
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private semesterCourseService: SemesterCourseService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private snackbar: MatSnackBar) {

  }
  ///////////////////////////////////////
  ngOnInit() {
    this.CourseName = this.data.courseName
    this.CourseId = this.data.courseid
    this.semesterId = this.data.semesterIdSelected
    this.getstudents()
  }
  ////////////////////////////////
  getstudents() {
    this.semesterCourseService.getStudentDetails(this.data.semesterCourseId).subscribe({
      next: (res) => {
        console.log(res)
        this.students = res
        console.log(this.students)
        this.dataSource = new MatTableDataSource<StudentDTO>(this.students);
        console.log(this.dataSource)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
      }
    })
  }
  ////////////////////////////////
  close() {
    this.dialog.closeAll()
  }
  //////////////////FilterTable Search//////////////////////////
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
