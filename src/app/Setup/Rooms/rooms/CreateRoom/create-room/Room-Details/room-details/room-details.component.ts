import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SetupService } from 'src/app/Services/Setup/setup.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  rowCount: number;
  rowData: { columnName: string, rowCapacity: number }[] = [];
  // rownew: { columnName: string, rowCapacity: number }[] = [];

  ///////////////////////////////////////////////////////////////
  constructor(
    private http: HttpClient,
    private SetupService: SetupService,
    private matdialog: MatDialog,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    this.rowCount = this.data.columns;
    ///////////////////

    ///////////////////
  }
  //////////////////////////////////////////////////////
  ngOnInit() {
    this.getRoomDetails()
  }
  //////////////////////////////////////////////////////


  GetDetails() {
    if (this.isRowDataEmpty() == false) {
      const inputValues = this.rowData.map(row => ({
        columnName: row.columnName,
        rowCapacity: parseInt(row.rowCapacity.toString(), 10) || 0
      }));

      // Calculate the sum of rowCapacity values
      const totalRowCapacity = inputValues.reduce((sum, row) => sum + row.rowCapacity, 0);

      if (totalRowCapacity === this.data.seatNumber) {
        this.SetupService.AddRoomDetials(inputValues, this.data.roomId).subscribe({
          next: (res) => {
            this.matdialog.closeAll();
            this.snackbar.open('Room Created successfully', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['my-snackbar']
            });
          }
        });
      } else {
        // Handle the case when the sum of rowCapacity is not equal to 100
        this.snackbar.open('Sum of row capacities should be equal to 100', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['my-snackbar-error']
        });
      }
    }
  }

  ///////////////////////////////////////////////////////////
  isValidNumber(value: any): boolean {
    return !isNaN(value);
  }
  //////////////////////////////////////////////////////////////////
  isRowDataEmpty(): boolean {
    for (let i = 0; i < this.rowData.length; i++) {
      const row = this.rowData[i];
      if (!row.columnName || row.columnName.trim() === '' || !row.rowCapacity) {
        return true;
      }
    }
    return false;
  }
  //////////////////////////////////////////////////////////////////////
  getRoomDetails() {
    this.SetupService.GetRoomDetails(this.data.roomId).subscribe({
      next: (res) => {
        const existingRowCount = res.length;
        const emptyRowCount = this.rowCount - existingRowCount;

        // Map the existing room details
        this.rowData = res.map((item) => ({
          columnName: item.columnName,
          rowCapacity: item.rowCapacity
        }));

        for (let i = 0; i < emptyRowCount; i++) {
          this.rowData.push({
            columnName: '',
            rowCapacity: 0
          });
        }
      }
    });
  }

}
