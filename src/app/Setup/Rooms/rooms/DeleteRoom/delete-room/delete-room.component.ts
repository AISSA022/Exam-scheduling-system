import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SetupService } from 'src/app/Services/Setup/setup.service';

@Component({
  selector: 'app-delete-room',
  templateUrl: './delete-room.component.html',
  styleUrls: ['./delete-room.component.css']
})
export class DeleteRoomComponent {

  constructor(private setupService: SetupService, @Inject(MAT_DIALOG_DATA) public data: { id: number,roomName:string },
    private snackbar: MatSnackBar, private dialog: MatDialog) { }
  ////////////////////////////////////////////////////////////
  ngOnInit() {
  console.log(this.data.roomName)
  console.log(this.data.id)

  }
  deleteroom(id: number) {
    this.setupService.deleteRoom(id).subscribe({
      next: (res) => {
        this.dialog.closeAll(),
          this.snackbar.open('User Deleted successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['my-snackbar']
          }),
          window.location.reload();
      },
      error: (err: HttpErrorResponse) => {

        this.snackbar.open(err.error.message, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['my-snackbar']
        })
      }
    })
  }
  cancle() {
    this.dialog.closeAll()
  }
}
