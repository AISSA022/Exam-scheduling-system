import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usersmodel } from '../Models/Users';
import { AppServicesService } from '../Services/app-services.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { DeleteuserComponent } from './deleteuser/deleteuser.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @Output() userUpdated = new EventEmitter<Usersmodel[]>();
  ///////////
  displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];
  ElementData!: Usersmodel[];
  dataSource = this.ElementData;

  constructor(private service: AppServicesService, private router: Router) {

  }
  //////////Init//////////////
  ngOnInit() {


    this.getusers();
  }


  /////////////////GetAllUsers/////////////////////////
  public getusers() {
    this.service.getAllUsers().subscribe((result) => {
      this.dataSource = result

    })
  }
  ////////////////////////////////////////////

  /////////////////////DeleteUser///////////////////////
  public deleteuser(id: number) {
    this.service.deleteuser(id)
      .subscribe({
        // next: (user) => this.userUpdated.emit(user)
      })
  }
  ////////////////////////////////////////////

  /////////////////////Naviagetoedit///////////////////////
  gotoedit(id: number) {
    this.router.navigate(['/users/EditUser', id]);
  }
  ////////////////////////////////////////////
  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim().toLowerCase();
  //   // this.dataSource.filter=filterValue;
  // }
  ////////////////////////////////////////////
  ////////////////////////////////////////////

  ////////////////////////////////////////////
}


