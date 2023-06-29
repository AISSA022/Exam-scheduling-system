import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { ReportsService } from 'src/app/Services/Reports/reports.service';
import { AppServicesService } from 'src/app/Services/app-services.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  title = 'angular-system';
  opened = false;
  greencolor = "#88b77b"
  timeConflict = 0;
  studentConflict = 0;
  AllReports = 2;
  ///////////////////////////////////////////////////////////////////////
  token: string = "";
  userid!: number;
  showDiv = false;
  ////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    this.getTimeConflict()
    this.getStudentConflict()
    ////////////////////////////////
    this.AllReports = this.timeConflict + this.studentConflict;
    console.log(this.AllReports)
    console.log(this.studentConflict)
  }

  constructor(private authservice: AuthService,
    private appservice: AppServicesService,
    private router: Router,
    private reportService: ReportsService
  ) {

    this.token = this.authservice.getToken()!;
  }


  logout() {
    this.authservice.logout()
  }

  gettoken() {
    return this.authservice.getToken()
  }

  navigateToUserProfile() {
    const id = this.authservice.getid()
    this.router.navigate(['users/profile', id])
  }

  opensetup() {
    const hello = document.getElementById('droplistt')!;
    this.showDiv = !this.showDiv;

    if (this.showDiv) {
      hello.style.display = 'block';
    } else {
      hello.style.display = 'none';
    }
  }
  openReports() {
    const hello = document.getElementById('droplisttt')!;
    this.showDiv = !this.showDiv;

    if (this.showDiv) {
      hello.style.display = 'block';
    } else {
      hello.style.display = 'none';
    }
  }
  Periodcomp() {
    this.router.navigate(['period'])
  }
  Roomcomp() {
    this.router.navigate(['room'])
  }
  Dayscomp() {
    this.router.navigate(['days'])
  }
  TimeConflict() {
    this.router.navigate(['timeConflict'])
  }
  studentConflictt(){
    this.router.navigate(['studentConflict'])
  }
  ///////////////////////////////////////////////////////
  getTimeConflict() {
    this.reportService.getTimeConflict().subscribe({
      next: (res) => {
        this.timeConflict = res
      }
    })
  }
  //////////////////////////////
  getStudentConflict() {
    this.reportService.getStudentConflict().subscribe({
      next: (res) => {
        this.studentConflict = res
      }
    })
  }
  //////////////////////////////
  calculateAllReports(): number {
    return this.timeConflict + this.studentConflict;
  }
  ///////////////////////////////////
  updateAllReports(): void {
    this.AllReports = this.calculateAllReports();
    console.log(this.AllReports)
  }
}
