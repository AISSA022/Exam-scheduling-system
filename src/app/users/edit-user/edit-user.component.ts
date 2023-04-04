import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  details?:Usersmodel;
  constructor(private route: ActivatedRoute, private services: AppServicesService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (z) => {
        const id = z.get('id');

        if (id) {
          this.services.getuser(id)
          .subscribe({
              next: (result) => {
                // this.userdetails.name=result.values.name
                this.details=result.values
              }
            });
        }
      }
    })
  }

}
