import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleServiceService } from 'src/app/Services/Roles/role-service.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {
  roleid!: number;
  permissionArray: number[] = [];
  /////////////////////////////////////////////////////////
  constructor(
    private matdialog: MatDialog,
    private snackBar: MatSnackBar,
    private roleervice: RoleServiceService,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {

    this.roleid = data
  }
  /////////////////////////////////////////////////////////
  ngOnInit() {
    this.getper()
  }

  ////////////////////////////////////////////////////////////////
  getper() {
    this.roleervice.getPermissions(this.roleid).subscribe({
      next: (res) => {
        for (let permission of res.permissions) {
          this.permissionArray.push(permission.permissionId);
        }
      }
    })
  }
  ////////////////////////////////////////////////////////////////
  checkCheckbox(event: any, permissionId: number): void {
    if (event.checked) {
      this.permissionArray.push(permissionId);
    } else {
      const index = this.permissionArray.indexOf(permissionId);
      if (index > -1) {
        this.permissionArray.splice(index, 1);
      }
    }
  }
  /////////////////////////////////////////////////////////////////
  editper() {
    this.roleervice.editRolePermission(this.roleid, this.permissionArray).subscribe({
      next: (res) => {
        this.matdialog.closeAll();
        this.snackBar.open('Permission Updated successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['my-snackbar']
        })
      }
    })
  }
}
