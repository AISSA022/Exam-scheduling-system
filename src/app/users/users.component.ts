import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usersmodel } from '../Models/Users';
import { AppServicesService } from '../Services/app-services.service'
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { CreateuserComponent } from './createuser/createuser/createuser.component';
import { MatSort } from '@angular/material/sort';
import { DeleteuserComponent } from './deleteuser/deleteuser.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserStoreService } from '../Services/User-Store/user-store.service';
import { AuthService } from '../Services/Auth/auth.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @Output() userUpdated = new EventEmitter<Usersmodel[]>();
  /////////////////Table//////////////////
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', "gender", "phoneNumber", "birthday", "status", "loggedIn", "action"];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ///////////////////////////////////////

  role: number = 0;

  constructor(private service: AppServicesService,
    private router: Router,
    private matdialog: MatDialog,
    private route: ActivatedRoute,
    private userstoreService: UserStoreService,
    private authService: AuthService,

  ) {

  }
  //////////Init//////////////
  ngOnInit() {

    this.userstoreService.getRolefromstore()
      .subscribe(res => {
        const roleFromToken = this.authService.getrolefromtoken()
        this.role = res || roleFromToken
      }
      )
    this.getusers();
  }


  /////////////////GetAllUsers/////////////////////////
  public getusers() {
    this.service.getAllUsers().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
      }

    })
  }
  ////////////////////////////////////////////

  /////////////////////DeleteUser///////////////////////
  public deleteuser(firstName: string, id: number) {

    this.matdialog.open(DeleteuserComponent, {
      data: { firstName, id },
    });
  }

  ////////////////////////////////////////////
  edituser(data: any) {
    this.matdialog.open(EditUserComponent, {
      data,
    });
  }
  /////////////////////Naviagetoedit///////////////////////
  gotoedit(id: number) {
    this.router.navigate(['/users/EditUser', id]);
  }

  //////////////////FilterTable Search//////////////////////////
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ////////////////////////////////////////////
  //////////////////Opencreateuser//////////////////////////
  opencreateuser() {
    this.matdialog.open(CreateuserComponent)
  }

  ////////////////////////////////////////////
}


