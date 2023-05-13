import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SetupService } from 'src/app/Services/Setup/setup.service';
import { CreateRoomComponent } from './CreateRoom/create-room/create-room.component';
import { DeleteRoomComponent } from './DeleteRoom/delete-room/delete-room.component';
import { EditRoomComponent } from './EditRoom/edit-room/edit-room.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  //////////////////Table//////////////////
  displayedColumns: string[] = ['roomId', 'roomName', 'seatNumber', 'columns', "row", "building", 'actions'];
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
    this.setupService.getrooms().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        console.log(this.dataSource)
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
  opencreateRoom() {
    this.matdialog.open(CreateRoomComponent)
  }
  //////////////////////////////////////////////////
  opendeleteroom(id: number, RoomName: string) {
    this.matdialog.open(DeleteRoomComponent, {
      data: { id, RoomName },
    });
  }
  //////////////////////////////////////////////////
  openeditroom(data: any) {
    this.matdialog.open(EditRoomComponent, {
      data,
    });
  }
}
