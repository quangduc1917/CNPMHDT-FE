import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-manager-notify',
  templateUrl: './manager-notify.component.html',
  styleUrls: ['./manager-notify.component.css']
})
export class ManagerNotifyComponent implements OnInit {

  orders?: any;
  comments?:any;
  test!: string;
  keyWord !: string;
  sort !: number;
  selected !: number;
  tutorials: any;


  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  currentIndex = -1;

  constructor(public modalService: NgbModal, private router: Router, private auth: AuthService,private order: OrderService,private noti:NotifyService) {
    if (localStorage.getItem('role') !== '[ROLE_ADMIN]' && localStorage.getItem('role') === null && this.auth.getLogin() === false) {
      this.router.navigate(['/home']);
    }
   }

  ngOnInit(): void {
    this.loadData();
    
  }


  loadData() {
    this.noti.getAllNotify().subscribe(
      (data) => {
        this.comments = data;
        console.log(this.comments)
      }
    );

  }


  getRequestParams(offset, limit, keyWord, sort, Id): any {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (offset) {
      params[`offset`] = offset - 1;
    }

    if (limit) {
      params[`limit`] = limit;
    }

    if (keyWord) {
      params[`keyWord`] = keyWord;
    } else {
      params[`keyWord`] = '';
    }

    if (sort) {
      params[`sort`] = sort;
    } else {
      params[`sort`] = '';
    }

    if (Id) {
      params[`id`] = Id;
    } else {
      params[`id`] = '';
    }

    return params;
  }

  retrieveTutorials(): void {
    const params = this.getRequestParams(this.page, this.pageSize, this.keyWord, this.sort, this.selected);

    this.noti.getAllNotify1(params).subscribe(
      (data) => {
        console.log(data);
        this.comments = data?.content;
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


  delete(id: number) {
    this.noti.deleteComment(id).subscribe(
      (data) => {
        this.retrieveTutorials();
        alert('Delete success!');
      }, (err) => {
        alert('Delete failed!');
      }
    );
  }
}
