import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { ReportsService } from 'src/app/Services/Reports/reports.service';
import { UserStoreService } from 'src/app/Services/User-Store/user-store.service';
import { AppServicesService } from 'src/app/Services/app-services.service';

@Component({
  selector: 'app-studen-course-report',
  templateUrl: './studen-course-report.component.html',
  styleUrls: ['./studen-course-report.component.css']
})
export class StudenCourseReportComponent implements OnInit {
  /////////////////Table//////////////////
  displayedColumns: string[] = ['reportId', "description", "type", 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ///////////////////////////////////////

  role: number = 0;

  constructor(
    private service: ReportsService,
    private router: Router,
    private matdialog: MatDialog,
    private route: ActivatedRoute,
    private userstoreService: UserStoreService,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {

  }
  //////////Init//////////////
  ngOnInit() {
    this.getreports()
  }
  ////////////////////
  public getreports() {
    this.service.getAllstudentConflict().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
      }

    })
  }

  /////////////////////////////
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ////////////////////////////////
  done(reportId: number) {
    this.service.deleteReport(reportId).subscribe({
      next: (res) => {
        this.snackbar.open('Report Deleted successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['my-snackbar']
        })
        window.location.reload();
      }
    })
  }
}
