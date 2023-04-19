import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../Services/User-Store/user-store.service';
import { AuthService } from '../Services/Auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public fullname: string = "";
  public role!: number;
  constructor(private userstore: UserStoreService, private authservice: AuthService) { }

  ngOnInit() {
    this.userstore.getfullNamefromstore()
      .subscribe( res => {
          const fullnameFromToken = this.authservice.getfullnamefromtoken()
          this.fullname = res || fullnameFromToken
        }
      )

      this.userstore.getRolefromstore()
      .subscribe( res => {
          const roleFromToken = this.authservice.getrolefromtoken()
          this.role = res || roleFromToken
        }
      )
  }
}
