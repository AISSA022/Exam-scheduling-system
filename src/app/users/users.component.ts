import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usersmodel } from '../Models/Users';
import { AppServicesService } from '../Services/app-services.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  ///////////
  displayedColumns: string[] = ['id', 'name', 'edit'];
  ElementData!: Usersmodel[];
  dataSource = this.ElementData;

  constructor(private service: AppServicesService) {

  }
  //////////Init//////////////
  ngOnInit() {


    ///////////////////
    this.getusers();
  }


  /////////////////GetAllUsers/////////////////////////
  public getusers() {
    this.service.getAllUsers().subscribe((result) => {
      this.dataSource = result

    })
  }
  ////////////////////////////////////////////
  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim().toLowerCase();
  //   // this.dataSource.filter=filterValue;
  // }

}


