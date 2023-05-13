import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/Services/Courses/courses.service';
import { UserStoreService } from 'src/app/Services/User-Store/user-store.service';
import { CreateCourseComponent } from './CreateCourse/create-course/create-course.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

  /////////////////Table//////////////////
  displayedColumns: string[] = ['courseId', 'courseName', 'courseCode', 'section', "instructor", 'actions'];
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
  ) {

  }
  //////////Init//////////////
  ngOnInit() {
    this.getCourses()

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
  public deleteuser(firstName: string, id: number) {

    // this.matdialog.open(DeleteuserComponent, {
    //   data: { firstName, id },
    // });
  }

  ////////////////////////////////////////////
  edituser(data: any) {
    // this.matdialog.open(EditUserComponent, {
    //   data,
    // });
  }
  /////////////////////Naviagetoedit///////////////////////
  gotoedit(id: number) {
    // this.router.navigate(['/users/EditUser', id]);
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
    this.matdialog.open(CreateCourseComponent)
  }
}
