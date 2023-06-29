import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private apiUrl = 'https://localhost:7246/api';
  constructor(private http: HttpClient) { }
  //////////////////////////////////////////////////////////
  getTimeConflict(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Reports/CountTimeConflicts`)
  }
  getStudentConflict(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Reports/CountStudentConflicts`)
  }
  getAllTimeConflict(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Reports/GetAllTimeConflict`)
  }
  getAllstudentConflict(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Reports/GetAllStudentConflict`)
  }
  deleteReport(reportId: number) {
    return this.http.delete<any>(`${this.apiUrl}/Reports/DeleteReport/${reportId}`)
  }
}
