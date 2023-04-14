import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Usersmodel } from 'src/app/Models/Users';
import { AppServicesService } from 'src/app/Services/app-services.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userdetails:Usersmodel={
    id:0,
    name:''
  };
  id?: number;
  constructor(private route: ActivatedRoute, private services: AppServicesService,) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.services.getuser(this.id).subscribe({
        next:(res)=>
        this.userdetails=res
      })
    });
  }

  ////////////////////updateuser///////////////
//   updateuser(){
//     const name=this.userdetails.name
// this.services.updateuser(this.userdetails.id,this.userdetails.name).subscribe({
//   next:(res)=>
//   console.log(res)
// })
// }
/////////////////////////////////////////
  


}
