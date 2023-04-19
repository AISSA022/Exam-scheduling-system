import { Injectable } from '@angular/core';
import {  CanActivate, Route, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authservice:AuthService,private router:Router){}
 
 
  canActivate():boolean {
   if(this.authservice.isloggedin()){
    return true
   }
   else{
    this.router.navigate(['login'])
    return false
   }
  }
  
}
