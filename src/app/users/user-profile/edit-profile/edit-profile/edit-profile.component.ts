import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { ResetPasswordService } from 'src/app/Services/Resetpass/reset-password.service';
import { AppServicesService } from 'src/app/Services/app-services.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editprofileForm!: FormGroup;
  userid!: number;
  selectedfile!: File;
  ///////////////////////////////
  constructor(private router: Router, private authService: AuthService, private appservice: AppServicesService, private fb: FormBuilder,) {

  }
  ////////////////////////////////////////
  ngOnInit() {
    this.userid = this.authService.getid()
    /////////////////
    this.editprofileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      image: ''
    })
    this.addValues();

  }

  ///////////////////////////////////////
  addValues() {
    const userinfo = this.appservice.getuseracc(this.userid).subscribe({
      next: (res) => {
        this.editprofileForm.setValue({
          firstName: res.firstname,
          lastName: res.lastname,
          email: res.email,
          phoneNumber: res.phone,
          image: ''
        });
      }
    })
  }
  //////////////////////////////
  updateuser() {
    // if (this.file) {
    //   this.appservice.addimage(this.userid, this.file).subscribe(() => {
    //     console.log('Image uploaded successfully.');
    //   }, (error) => {
    //     console.log('Error uploading image:', error);
    //   });
    // }
    if (this.editprofileForm.valid) {
      const formData = new FormData();
      formData.append('file', this.selectedfile);
      formData.append('userId', this.userid.toString());

      this.appservice.addimage(formData).subscribe(() => {
        this.appservice.updateuser(this.userid, this.editprofileForm.value).subscribe(() => {
          console.log('Profile updated successfully');
        });
      });
    }
  }
  ////////////////////////////
  onFileSelected(event: any) {
    this.selectedfile = event.target.files[0];
  }

}
