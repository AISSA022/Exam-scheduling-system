import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usersmodel } from '../Models/Users';
import { AppServicesService } from '../Services/app-services.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name'];
  ElementData!: Usersmodel[];
  dataSource = this.ElementData;

  constructor(private service: AppServicesService) {

  }
  ngOnInit() {
    this.getusers();
  }
  public getusers() {
    this.service.getAllUsers().subscribe({
      next: result =>
       this.dataSource = result
       
    })
  }


}


