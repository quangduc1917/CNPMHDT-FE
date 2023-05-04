import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-manager-users',
  templateUrl: './manager-users.component.html',
  styleUrls: ['./manager-users.component.css']
})
export class ManagerUsersComponent implements OnInit {
  closeResult = '';

  keyWord !: string;

  userid !: number;
  username!: string;
  password!: string;
  email!: string;
  names!: string;
  address !: string;
  numberPhone !: string;

  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private modalService: NgbModal, private router: Router, private auth: AuthService) {
    if (localStorage.getItem('role') !== '[ROLE_ADMIN]' && localStorage.getItem('role') === null && this.auth.getLogin() === false) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.retrieveTutorials();
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.auth.register(this.username, this.password, this.email).subscribe(
        (data) => {
          alert('Register success');
          window.location.reload();
        },
        (error) => {
          alert('Register failed');
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

  getRequestParams(offset, limit, keyWord): any {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (offset) {
      params[`offset`] = offset - 1;
    }

    if (limit) {
      params[`limit`] = limit;
    }

    if (keyWord) {
      params[`keyWork`] = keyWord;
    } else {
      params[`keyWork`] = '';
    }

    return params;
  }


  retrieveTutorials(): void {
    const params = this.getRequestParams(this.page, this.pageSize, this.keyWord);

    this.auth.getAll(params).subscribe(
      (data) => {
        this.tutorials = data?.content;
        this.count = data?.totalElements;
      }, (err) => {
        console.log(err);
      }
    );
  }

  handlePageChange(event): void {
    this.page = event;
    this.retrieveTutorials();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveTutorials();
  }

  delete(id: number) {
    this.auth.deleteUser(id).subscribe(
      (data) => {
        this.retrieveTutorials();
        alert('Delete success!');
      }, (err) => {
        alert('Delete failed!');
      }
    );
  }

  edit(id: number, names: string, numberPhone: string, address: string, contentUpdate) {
    this.userid = id;
    this.names = names;
    this.numberPhone = numberPhone;
    this.address = address;
    console.log(this.names);
    this.modalService.open(contentUpdate, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.auth.udpateUser(this.userid, this.names, this.numberPhone, this.address).subscribe(
        (data) => {
          this.retrieveTutorials();
          alert('Update user success!');
          window.location.reload();
        }, (err) => {
          alert('Update user failed!');
        }
      );

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

}
