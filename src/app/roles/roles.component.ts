import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppServicesService } from '../Services/app-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserStoreService } from '../Services/User-Store/user-store.service';
import { AuthService } from '../Services/Auth/auth.service';
import { EditRolesComponent } from './edit-roles/edit-roles/edit-roles.component';
import { RoleServiceService } from '../Services/Roles/role-service.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  ///////////Table/////////////
  displayedColumns: string[] = ["roleId", "roleName", "userId", 'acc'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  role: number = 0;
  /////////////////////////////////////////////
  constructor(private service: AppServicesService,
    private router: Router,
    private matdialog: MatDialog,
    private route: ActivatedRoute,
    private userstoreService: UserStoreService,
    private RoleService: RoleServiceService,
    private authService: AuthService,
  ) { }

  /////////////////////////////
  ngOnInit() {
    this.userstoreService.getRolefromstore()
      .subscribe(res => {
        const roleFromToken = this.authService.getrolefromtoken()
        this.role = res || roleFromToken
      }
      )
    this.getRoles();
  }

  /////////////////////////////////////////

  public getRoles() {
    this.RoleService.getallroles().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editrole(roleId: number, roleName: string) {
    this.matdialog.open(EditRolesComponent, {
      data: { roleId, roleName }
    });

  }


}
