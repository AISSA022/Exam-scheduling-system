import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SemesterCourseService {
  private apiUrl = 'https://localhost:7246/api';
  //////////////////////////////////////////////////////////////////
  constructor(private http: HttpClient) { }
  /////////////////////////////////////////////////////////////////
  public getSemestersName(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/SemesterCourse/GetSemester`);
  }

  public getCoursesBySemester(semesterid: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/SemesterCourse/GetCoursesBySemester/${semesterid}`);
  }

  public GetStudents(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/SemesterCourse/GetStudents`);
  }

  public AddStudentToCourse(studentIds: number[], semestercourseid: number): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/SemesterCourse/AddStudentsToCourse/${semestercourseid}`, studentIds)
  }

  public getStudentDetails(semestercourseid: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/SemesterCourse/GetStudentsDetails/${semestercourseid}`);
  }

  public getstudentsincourse(semestercourseid: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/SemesterCourse/GetStudentsInCourse/${semestercourseid}`)
  }
  ////////////////////////////////////////////////////////////
  public getcoursesrefertosemester(semsterid: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/StoredProcedure/GetStudentsReferToSemesterCourses/${semsterid}`)
  }
  public AddCourse(course: any, semesterId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/SemesterCourse/AddCourse/${semesterId}`, course)
  }
  public DelteCourseSemesterCourse(id: number) {
    return this.http.delete(`${this.apiUrl}/SemesterCourse/DeleteCourse/${id}`)
  }
  public GetRoomPeriod(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/SemesterCourse/GetRoomPeriods`)

  }
  public editSemesterCourse(courseId: number, semesterId: number, roomPeriod: number): Observable<any> {
    // return this.http.put<any>(`${this.apiUrl}/SemesterCourse/EditSemesterCourses/${courseid}/${semesterid}`, { roomperiod: roomperiod });
    const url = `${this.apiUrl}/SemesterCourse/EditSemesterCourses/${courseId}/${semesterId}?roomperiod=${roomPeriod}`;

    return this.http.put(url, {});
  }
}
