import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userinfo!: string;
  closeResult = '';

  cnewpass!: string;
  cnewpasss!: string;
  coldpass!: string;

  constructor(public auth: AuthService, private token: TokenStorageService, private router: Router, private modalService: NgbModal) {
  }

  ngOnInit() {
    if (this.token.getToken() === null) {
      this.router.navigate(['/home']);
    }

    if (this.token.getToken() != null) {
      this.auth.getUserInfo().subscribe(
        (data) => {
          this.userinfo = data?.name;
        }
      );
    }
  }

  logout() {
    this.token.singOut();
    localStorage.removeItem('role');
    window.location.href = '/home';
  }


  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.auth.changePass(this.cnewpass, this.cnewpasss, this.coldpass).subscribe(
        (data) =>{
          alert('Change password success!');
        }, (err) =>{
          alert('Change password failed');
        }
      );
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
