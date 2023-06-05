import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SetupService } from 'src/app/Services/Setup/setup.service';
import { CreatePeriodComponent } from './CreatePeriod/create-period/create-period.component';
import { DeltePeriodComponent } from './DeeletPeriod/delte-period/delte-period.component';
import { EditPeriodComponent } from './EditPeriod/edit-period/edit-period.component';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css']
})
export class PeriodComponent {
  //////////////////Table//////////////////
  displayedColumns: string[] = ['periodId', 'periodName', 'dayTime', 'timeFrom', "timeTo", "roomName", 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ///////////////////////////////////////
  constructor(private setupService: SetupService, private matdialog: MatDialog) { }
  ///////////////////////////////////////
  ngOnInit() {
    this.getusers()
  }
  ////////////////////////////////////////
  public getusers() {
    this.setupService.GetRoomPeriod().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
      }

    })
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
  opencreateperiod() {
    this.matdialog.open(CreatePeriodComponent)
  }
  //////////////////////////////////////////////////
  opendeleteperiod(id: number, PeriodName: string) {
    this.matdialog.open(DeltePeriodComponent, {
      data: { id, PeriodName },
    });
  }
  //////////////////////////////////////////////////
  openeditperiod(data: any) {
    this.matdialog.open(EditPeriodComponent, {
      data,
    });
  }
  ///////////////////////////////////////////////////

}
