import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { AppServicesService } from 'src/app/Services/app-services.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  title = 'angular-system';
  opened = false;
  greencolor = "#88b77b"

  ///////////////////////////////////////////////////////////////////////
  token: string = "";
  userid!: number;
  showDiv = false;
  ////////////////////////////////////////////////////////////////////////
  ngOnInit(): void {

  }

  constructor(private authservice: AuthService,
    private appservice: AppServicesService,
    private router: Router
  ) {

    this.token = this.authservice.getToken()!;
  }


  logout() {
    this.authservice.logout()
  }

  gettoken() {
    return this.authservice.getToken()
  }

  navigateToUserProfile() {
    const id = this.authservice.getid()
    this.router.navigate(['users/profile', id])
  }

  opensetup() {
    const hello = document.getElementById('droplistt')!;
    this.showDiv = !this.showDiv;

    if (this.showDiv) {
      hello.style.display = 'block';
    } else {
      hello.style.display = 'none';
    }
  }
  Periodcomp() {
    this.router.navigate(['period'])
  }
  Roomcomp() {
    this.router.navigate(['room'])
  }
}
