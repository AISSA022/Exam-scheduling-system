import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SetupService } from 'src/app/Services/Setup/setup.service';

@Component({
  selector: 'app-delete-day',
  templateUrl: './delete-day.component.html',
  styleUrls: ['./delete-day.component.css']
})
export class DeleteDayComponent {

  constructor(private setupService: SetupService, @Inject(MAT_DIALOG_DATA) public data: { id: number, },
    private snackbar: MatSnackBar, private dialog: MatDialog) { }
  deleteDay(id: number) {
    this.setupService.deleteDay(this.data.id).subscribe({
      next: (res) => {
        this.dialog.closeAll(),
          this.snackbar.open('Day Deleted successfully', 'Close', {
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

  }
}
