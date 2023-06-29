import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomDetail, RoomDetails } from 'src/app/Models/RoomDetail';

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
    return this.http.put<any>(`${this.apiUrl}/Rooms/EditRoom?roomId=${id}`,data)
  }

  public getRoomName(name: string) {
    return this.http.get<number>(`${this.apiUrl}/Rooms/GetRoomName/${name}`)
  }
  public AddRoomDetials(roomDetails: RoomDetails[], roomId: number){
    const url = `${this.apiUrl}/RoomDetails/AddRoomDetails?roomId=${roomId}`;
    return this.http.post<any>(url, roomDetails);
  }

  public GetRoomDetails(roomId:number){
    return this.http.get<any[]>(`${this.apiUrl}/RoomDetails/GetRoomDetailsByRoomId?roomId=${roomId}`)
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
  ////////////////////////////////////Days//////////////////////////////////////////////////
  public getDays(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Days`)
  }
  public insertDay(day: any) {
    return this.http.post(`${this.apiUrl}/Days`, day)
  }
  public deleteDay(id: number) {
    return this.http.delete(`${this.apiUrl}/Days/${id}`)
  }

  public UpdateDay(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Days/${id}`, data)
  }

  public GetAllDays(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Days/GetAllDayTimes`)
  }
  //////////////////////////////////////////////////////////
  public GetRoomPeriod(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/StoredProcedure/GetRoomPeriod`);
  }
}
