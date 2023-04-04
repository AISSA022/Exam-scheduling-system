import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Usersmodel } from 'src/app/Models/Users';
import { AppServicesService } from 'src/app/Services/app-services.service';


@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})

export class CreateuserComponent implements OnInit {
  adduserrequest: Usersmodel = {
    id: 0,
    name: ''
  }
  constructor(private service: AppServicesService, private formBuilder: FormBuilder, private router: Router) { }


  ngOnInit() {

  }
  ////////////////////////getback/////////////
  getback() {
    this.router.navigate(['users'])
  }


  ////////////////////ADDUSER////////////////////
  adduser() {
    this.service.Createuser(this.adduserrequest)
      .subscribe({
        next: (user) =>
          this.router.navigate(['users'])
      })
    // console.log(this.adduserrequest)
  }
  ////////////////////ADDUSER////////////////////
}
