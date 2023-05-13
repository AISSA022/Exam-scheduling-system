import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SetupService } from 'src/app/Services/Setup/setup.service';

@Component({
  selector: 'app-delte-period',
  templateUrl: './delte-period.component.html',
  styleUrls: ['./delte-period.component.css']
})
export class DeltePeriodComponent {
  constructor(private setupService: SetupService, @Inject(MAT_DIALOG_DATA) public data: { id: number, PeriodName: string },
    private snackbar: MatSnackBar, private dialog: MatDialog) { }
  ////////////////////////////////////////////////////////////
  ngOnInit() {
    console.log(this.data.PeriodName)
    console.log(this.data.id)

  }
  deleteroom(id: number) {
    this.setupService.deletePeriod(id).subscribe({
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
