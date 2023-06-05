import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleServiceService } from 'src/app/Services/Roles/role-service.service';
import { AppServicesService } from 'src/app/Services/app-services.service';
import { PermissionComponent } from '../../permission/permission/permission.component';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.css']
})
export class EditRolesComponent implements OnInit {
  id!: number;
  userrole: string | undefined;
  userroleid: number | undefined;
  roles = [
    { id: 1, name: 'Admin' },
    { id: 3, name: 'User' },
    { id: 2, name: 'Emp' },
  ];
  /////////////////////////////////////////////////
  constructor(
    private matdialog: MatDialog,
    private roleervice: RoleServiceService,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {

    this.id = data.roleId
    this.userrole=data.roleName
  }
  /////////////////////////////////////////////////

  /////////////////////////////////////////////////
  ngOnInit(): void {

    // this.getrole(this.id)
    // console.log(this.id)
  }
  /////////////////////////////////////////////////
  // getrole(id: number) {
  //   this.roleervice.getrole(this.id).subscribe({
  //     next: (res) => {
  //       if (res !== undefined) {
  //         this.userrole = this.roles.find(role => role.id == res)?.name;
  //         this.userroleid = this.roles.find(role => role.id == res)?.id;
  //       }
  //     }
  //   })
  // }
  editrole() {
    const userroleid = this.roles.find(role => role.name == this.userrole)?.id;
    this.roleervice.editrole(this.id, userroleid!).subscribe({
      next: (res) => {
        this.matdialog.closeAll()
      }
    })
  }
  editper(data: any) {
    this.matdialog.closeAll()
    this.matdialog.open(PermissionComponent, {
      data,
    });
  }
}
