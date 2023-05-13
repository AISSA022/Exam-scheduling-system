import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  private apiUrl = 'https://localhost:7246/api';
  constructor(private http: HttpClient) { }
  ////////////////////////////////////Rooms//////////////////////////////////////////////////
  public getrooms(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Rooms`)
  }

  public insertRoom(room: any) {
    return this.http.post(`${this.apiUrl}/Rooms`, room)
  }

  public deleteRoom(id: number) {
    return this.http.delete(`${this.apiUrl}/Rooms/${id}`)
  }

  public UpdateRoom(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Rooms/${id}`, data)
  }

  public getRoomName(id:number){
    return this.http.get<string>(`${this.apiUrl}/Rooms/GetRoomName/${id}`)
  }
  
  ////////////////////////////////////Period//////////////////////////////////////////////////
  public getPeriods(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Periods`)
  }

  public insertPeriod(period: any) {
    return this.http.post(`${this.apiUrl}/Periods`, period)
  }

  public deletePeriod(id: number) {
    return this.http.delete(`${this.apiUrl}/Periods/${id}`)
  }

  public UpdatePeriod(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Periods/${id}`, data)
  }

  // public getRoomNameByPeriodId(periodid:number){
  //   return this.http.get<string>(`${this.apiUrl}/GetRoomNameByPeriodIdd/${periodid}`)
  // }
}
