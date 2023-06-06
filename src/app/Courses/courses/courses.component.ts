import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/Services/Courses/courses.service';
import { UserStoreService } from 'src/app/Services/User-Store/user-store.service';
import { CreateCourseComponent } from './CreateCourse/create-course/create-course.component';
import { DelteCourseComponent } from './DeleteCourse/delte-course/delte-course.component';
import { EditCourseComponent } from './EditCourse/edit-course/edit-course.component';
import { SemesterCourseService } from 'src/app/Services/Semester-Course/semester-course.service';
import { StudentCourseComponent } from './StudentCourse/student-course/student-course.component';
import { StudentOfTheCourseComponent } from './StudentOfTheCourse/student-of-the-course/student-of-the-course.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  semesters!: any[];
  showDiv = true;
  semesterIdSelected!: number;
  semesterCourseId!: number;
  /////////////////Table//////////////////
  displayedColumns: string[] = ['courseId', 'courseName', 'courseCode', 'section', "instructor", "roomName", "periodName", 'actions', 'StudentsofCourse'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ///////////////////////////////////////

  role: number = 0;

  constructor(private Courseservice: CoursesService,
    private router: Router,
    private matdialog: MatDialog,
    private route: ActivatedRoute,
    private userstoreService: UserStoreService,
    private SemesterCourseService: SemesterCourseService
  ) {

  }
  //////////Init//////////////
  ngOnInit() {
    this.getSemesters();
  }
  getCourses() {
    this.Courseservice.getCourse().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        console.log(this.dataSource)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
      }

    })
  }
  ////////////////////////
  public deleteCourse(courseName: string, courseId: number) {

    this.matdialog.open(DelteCourseComponent, {
      data: { courseName, courseId },
    });
  }

  ////////////////////////////////////////////
  editCourse(data: any, semesterIdSelected: any) {
    this.matdialog.open(EditCourseComponent, {
      data: { data, semesterIdSelected },
    });
  }
  /////////////////////Naviagetoedit///////////////////////
  getCoursesBySemester() {
    if (this.semesterIdSelected == undefined) {
      this.semesterIdSelected = 1
    }
    this.SemesterCourseService.getcoursesrefertosemester(this.semesterIdSelected).subscribe({
      next: (res) => {
        this.semesterCourseId = res.semesterCourseId
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
  opencreateCourse() {
    if (!this.semesterIdSelected) {
      this.semesterIdSelected = 1;
    }
    this.matdialog.open(CreateCourseComponent, {
      data: { semesterIdSelected: this.semesterIdSelected }
    });
  }

  Addusercourse(courseName: string, semesterCourseId: number) {
    this.matdialog.open(StudentCourseComponent, {
      data: { courseName, semesterCourseId },
    });
  }
  /////////////////////////////////////////////////////////////
  getSemesters() {
    this.SemesterCourseService.getSemestersName().subscribe({
      next: (res) => {
        this.semesters = res
      }
    })
  }
  ///////////////////////////////////////////////////////////////////
  closesemester() {
    const hello = document.getElementById('semesterdiv')!;
    this.showDiv = !this.showDiv;

    if (this.showDiv) {
      hello.style.display = 'flex';
    } else {
      hello.style.display = 'none';
    }
  }
  ////////////////////////////////////////////////
  onChangeSemester(event: any) {
    this.semesterIdSelected = event.target.value;
    console.log(this.semesterIdSelected)
  }
  ///////////////////////////////////////////////////
  StudentsoftheCourse(semesterCourseId: number) {
    this.matdialog.open(StudentOfTheCourseComponent, {
      data: { semesterCourseId },
    });
  }
  /////////////////////////////////////////////////////////

}
