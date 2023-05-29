import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { BrandService } from 'src/app/services/brand.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-manager-order',
  templateUrl: './manager-order.component.html',
  styleUrls: ['./manager-order.component.css']
})
export class ManagerOrderComponent implements OnInit {


  orders?: any;
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

  constructor(public modalService: NgbModal, private router: Router, private auth: AuthService,private order: OrderService) {
    if (localStorage.getItem('role') !== '[ROLE_ADMIN]' && localStorage.getItem('role') === null && this.auth.getLogin() === false) {
      this.router.navigate(['/home']);
    }
   }

  ngOnInit(): void {
    this.loadData();
    
  }


  loadData() {
    this.order.getAllOrder().subscribe(
      (data) => {
        this.orders = data;
        for(let i=0;i<this.orders.length;i++){
          this.orders[i].order_total=this.formatCash(this.orders[i].order_total.toString());
        }
      }
    );

  }

  formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + '.')) + prev
    })
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

    this.order.getAllOrder1(params).subscribe(
      (data) => {
        console.log(data);
        this.orders = data?.content;
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
    this.order.deleteOrder(id).subscribe(
      (data) => {
        this.retrieveTutorials();
        alert('Delete success!');
      }, (err) => {
        alert('Delete failed!');
      }
    );
  }

}