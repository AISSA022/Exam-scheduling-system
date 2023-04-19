import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userid!: number;
  bluecolor = "#0a66c2;"
  showDiv = false;
  //////////////////////////////////////////////////////////////////
  constructor(private router: Router, private authService: AuthService) { }

  ///////////////////////////////////////////////////////////
  ngOnInit(): void {
    this.userid = this.authService.getid()
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
}

