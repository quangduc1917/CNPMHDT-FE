import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {

  name!: string;
  numberPhone!: string;
  address !: string;
  userId !: number;
  avatar !: string;

  img: File = null;

  constructor(public auth: AuthService, private token: TokenStorageService, private router: Router) { }




  ngOnInit() {
    if (this.token.getToken() === null) {
      this.router.navigate(['/home']);
    }

    if (this.token.getToken() != null) {
      this.auth.getUserInfo().subscribe(
        (data) => {
          this.name = data?.name;
          this.numberPhone = data?.numberPhone;
          this.address = data?.address;
          this.userId = data?.userId;
          this.avatar = data?.imgAvatar;
        }
      );
    }
  }

  update() {
    this.auth.updateProfile(this.name, this.numberPhone, this.address, this.userId).subscribe(
      (data) => {
        alert('Update success!');
        window.location.reload();
      }, (err) => {
        alert('Update failed!');
      }
    );
  }

  onChange(event) {
    this.img = event.target.files[0];
  }

  updateAvatar() {

    console.log(this.img);

    this.auth.updateImg(this.img).subscribe(
      (data) => {
        window.location.reload();
        alert('Update avatar success!');

      }, err => {
        alert('Update avatar failed!');
      }
    );
  }

}
