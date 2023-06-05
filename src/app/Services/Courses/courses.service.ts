import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private apiUrl = 'https://localhost:7246/api';
  constructor(private http: HttpClient) { }
  //////////////////////////////////////////////////////////
  public getCourse(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Courses`)
  }

  public AddCourse(course: any) {
    return this.http.post(`${this.apiUrl}/Courses`, course);
  }

  public DelteCourse(id: number) {
    return this.http.delete(`${this.apiUrl}/Courses/${id}`)
  }

  public EditCourse(id: number, Course: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Courses/${id}`, Course)
  }
  
}
