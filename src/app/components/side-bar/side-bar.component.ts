import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  userinfo!: string;
  avatar !: string;
  constructor(public auth: AuthService, private token: TokenStorageService, private router: Router) { }

  ngOnInit() {
    if (this.token.getToken() === null) {
      this.router.navigate(['/home']);
    }

    if (this.token.getToken() != null) {
      this.auth.getUserInfo().subscribe(
        (data) => {
          this.avatar = data?.imgAvatar;
          this.userinfo = data?.name;
        }
      );
    }


  }

}
