import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from 'src/app/Models/reset-password-model';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private urlUsers = "Users";
  private apiUrl = 'https://localhost:7246/api';

  constructor(private http: HttpClient) { }
  /////////////////////////////////User//////////////////////////////////////////////////////////
  public SendResetPasswordLink(email: string) {
    return this.http.post<any>(`${this.apiUrl}/${this.urlUsers}/send-reset-email/${email}`, {})
  }
  public resetpasswordByEmail(resetpasswordobj: ResetPassword) {
    return this.http.post<any>(`${this.apiUrl}/${this.urlUsers}/reset-password`, resetpasswordobj);
  }

  public resetpassword(email: string) {
    return this.http.post<any>(`${this.apiUrl}/${this.urlUsers}/send-reset-pass/${email}`,{} );
  }
}
