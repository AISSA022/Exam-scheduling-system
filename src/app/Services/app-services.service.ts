import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usersmodel } from '../Models/Users';
import { ResetPassword } from '../Models/reset-password-model';

@Injectable({
  providedIn: 'root'
})
export class AppServicesService {
  private urlUsers = "Users";
  private apiUrl = 'https://localhost:7246/api';

  constructor(private http: HttpClient) { }
  /////////////////////////////////User//////////////////////////////////////////////////////////
  public getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.urlUsers}`);
  }
  public Createuser(user: Usersmodel): Observable<Usersmodel[]> {
    return this.http.post<Usersmodel[]>(`${this.apiUrl}/${this.urlUsers}`, user);
  }
  public getuser(id: number): Observable<Usersmodel> {
    return this.http.get<Usersmodel>(`${this.apiUrl}/${this.urlUsers}/` + id);
  }
  public deleteuser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${this.urlUsers}/` + id);
  }
  public updateuser(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${this.urlUsers}/` + id, data);
  }
  public getId(email: string) {
    return this.http.get<any>(`${this.apiUrl}/${this.urlUsers}/getid/` + email);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////

}
