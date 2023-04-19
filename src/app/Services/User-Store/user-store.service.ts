import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<number>(0);

  constructor() { }

  public getRolefromstore() {
    return this.role$.asObservable();
  }

  public setRolefromstore(role: number) {
    return this.role$.next(role);
  }

  public getfullNamefromstore() {
    return this.fullName$.asObservable()
  }

  public setfullNamefromstore(fullname: string) {
    return this.fullName$.next(fullname);
  }


}
