import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dash-broad',
  templateUrl: './dash-broad.component.html',
  styleUrls: ['./dash-broad.component.scss']
})
export class DashBroadComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) {
    if (localStorage.getItem('role') !== '[ROLE_ADMIN]' && localStorage.getItem('role') === null && this.auth.getLogin() === false) {
        this.router.navigate(['/home']);
        // window.location.href = '/home';
    }
  }

  ngOnInit() {
  }

}
