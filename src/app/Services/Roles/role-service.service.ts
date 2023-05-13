import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {
  private apiUrl = 'https://localhost:7246/api';
  constructor(private http: HttpClient) { }

  ///////////////////////////
  public getrole(id: number) {
    return this.http.get<number>(`${this.apiUrl}/Roles/` + id)
  }

  public editrole(id: number, roleid: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/Roles/Edit-Role/${id}/${roleid}`, {})
  }
  public getPermissions(roleid: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Roles/get-Permissions/${roleid}`)
  }
  public editRolePermission(id: number, permissionIds: number[]) {
    return this.http.post(`${this.apiUrl}/Roles/Edit-RolePermission/${id}`, permissionIds)
  }
}
