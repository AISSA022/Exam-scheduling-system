import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SetupService } from 'src/app/Services/Setup/setup.service';
import { AddDayComponent } from './AddDay/add-day/add-day.component';
import { DeleteDayComponent } from './DeleteDay/delete-day/delete-day.component';
import { EditDaysComponent } from './EditDay/edit-days/edit-days.component';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.css']
})
export class DaysComponent implements OnInit {


  //////////////////Table//////////////////
  displayedColumns: string[] = ['dayId', 'dayTime', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ///////////////////////////////////////
  constructor(private setupService: SetupService, private matdialog: MatDialog) { }
  ///////////////////////////////////////
  ngOnInit() {
    this.getDays()
  }
  ////////////////////////////////////////
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //////////////////////////////////////////////////
  getDays() {
    this.setupService.getDays().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        console.log(this.dataSource)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
      }
    })
  }
  //////////////////////////////////////////////////
  deleteDay(id:number){
    this.matdialog.open(DeleteDayComponent, {
      data: { id },
    });
  }
  //////////////////////////////////////////////////
  CreateDay(){
    this.matdialog.open(AddDayComponent)

  }
  //////////////////////////////////////////////////
  editDay(data:any){
    this.matdialog.open(EditDaysComponent, {
      data,
    });
  }
}
