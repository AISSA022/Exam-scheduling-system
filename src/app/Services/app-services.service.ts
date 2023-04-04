import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usersmodel } from '../Models/Users';

@Injectable({
  providedIn: 'root'
})
export class AppServicesService {
  private urlUsers = "Users";
  private apiUrl = 'https://localhost:7246/api';

  constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<Usersmodel[]> {
    return this.http.get<Usersmodel[]>(`${this.apiUrl}/${this.urlUsers}`);
  }
  public Createuser(user: Usersmodel): Observable<Usersmodel[]> {
    return this.http.post<Usersmodel[]>(`${this.apiUrl}/${this.urlUsers}`, user);
  }
  public getuser(id: string): Observable<Usersmodel[]> {
    return this.http.get<Usersmodel[]>(`${this.apiUrl}/${this.urlUsers}/` + id);
  }
}
