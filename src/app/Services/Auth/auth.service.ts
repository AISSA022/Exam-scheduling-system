import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from 'src/app/Models/Token-Api.models';
import { AppServicesService } from '../app-services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userPayload: any;
  email: string = '';
  constructor(private http: HttpClient, private router: Router, private appservice: AppServicesService) {
    this.userPayload = this.decodedToken();
  }


  public register(user: any): Observable<any> {
    return this.http.post<any>('https://localhost:7246/api/Authentication/register', user)
  }

  public login(user: any): Observable<string> {
    return this.http.post<any>('https://localhost:7246/api/Authentication/authenticate', user).pipe(
      tap((response: any) => {
        const token = response.accessToken;
        const refreshToken = response.refreshToken;
        this.storetoken(token);
        this.storeRefreshToken(refreshToken);
      })
    );;
  }
  storeid() {
    this.appservice.getId(this.getEmail()!).subscribe(
      (idvalue) => {
        localStorage.setItem('userid', JSON.stringify(idvalue));
      }
    )
  }
  getid() {
    const obj = JSON.parse(localStorage.getItem('userid') || '{}');
    return obj.id;
  }
  getEmail() {
    return localStorage.getItem('Email')
  }
  storetoken(tokenvalue: string) {
    localStorage.setItem('token', tokenvalue)
  }

  storeRefreshToken(tokenvalue: string) {
    localStorage.setItem('refreshToken', tokenvalue)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken')
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login'])
    localStorage.removeItem('token')
  }

  isloggedin(): boolean {
    return !!localStorage.getItem('token')
  }

  decodedToken() {
    const jwthelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwthelper.decodeToken(token)
  }

  getfullnamefromtoken() {
    if (this.userPayload)
      return this.userPayload.unique_name
  }

  getrolefromtoken() {
    if (this.userPayload)
      return this.userPayload.role
  }

  renewToken(tokenApi: TokenApiModel) {
    return this.http.post<any>("https://localhost:7246/api/Authentication/refresh", tokenApi)
  }



}
