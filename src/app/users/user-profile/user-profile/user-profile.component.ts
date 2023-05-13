import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { ResetPasswordService } from 'src/app/Services/Resetpass/reset-password.service';
import { AppServicesService } from 'src/app/Services/app-services.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userid!: number;
  bluecolor = "#0a66c2;"
  showDiv = false;
  email!: string;
  number!: number;
  //////////////////////////////////////////////////////////////////
  constructor(private router: Router, private authService: AuthService, private resetService: ResetPasswordService, private appservice: AppServicesService) {
  }

  ///////////////////////////////////////////////////////////
  ngOnInit(): void {
    this.email = this.authService.getEmail() ?? '';
    this.userid = this.authService.getid()
    ////user phone///
    this.appservice.getnumber(this.userid).subscribe({
      next: (res) => {
        this.number = res.phone
      }
    })
    //////////
  }
  ///////////////////////////////////////////////////////////////
  toggleDiv() {
    const hello = document.getElementById('droplist')!;
    this.showDiv = !this.showDiv;

    if (this.showDiv) {
      hello.style.display = 'block';
    } else {
      hello.style.display = 'none';
    }
  }
  ///////////////////////////////////////////////////////////////
  EditProfile() {
    this.router.navigate(['/edit-profile']);
  }
  ///////////////////////////////////////////////////////////////
  sendreset() {
    const email = localStorage.getItem('Email');
    if (email) {
      this.resetService.resetpassword(email).subscribe({
        next: (res) => {
          const navigationExtras: NavigationExtras = {
            queryParams: {
              email: email,
              code: res.tokenBytes
            }
          }
          this.router.navigate(['/reset'], navigationExtras);
          console.log(res.tokenBytes)

        }
      })
    }

  }
}

