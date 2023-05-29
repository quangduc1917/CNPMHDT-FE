import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { StatisticalService } from 'src/app/services/statistical.service';

@Component({
  selector: 'app-manager-statistical',
  templateUrl: './manager-statistical.component.html',
  styleUrls: ['./manager-statistical.component.css']
})
export class ManagerStatisticalComponent implements OnInit {

  orders?: any;
  test!: string;
  keyWord !: string;
  sort !: number;
  selected !: number;
  tutorials: any;
  FromDate!:String;
  ToDate!:String;


  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  currentIndex = -1;

  constructor(public modalService: NgbModal, private router: Router, private auth: AuthService,private order: OrderService,private sales:StatisticalService) {
    if (localStorage.getItem('role') !== '[ROLE_ADMIN]' && localStorage.getItem('role') === null && this.auth.getLogin() === false) {
      this.router.navigate(['/home']);
    }
   }

  ngOnInit(): void {
    this.loadData();
  }


  loadData() {
    this.sales.getAllOrderSales().subscribe(
      (data) => {
        this.orders = data;
      }
    );

  }




  getRequestParams1(FromDate,ToDate): any {
    // tslint:disable-next-line:prefer-const
    let params = {};


    if (FromDate) {
      params[`FromDate`] = FromDate;
    }

    if (ToDate) {
      params[`ToDate`] = ToDate;;
    }
    return params;
  }

  // retrieveTutorials(): void {
  //   const params = this.getRequestParams(this.page, this.pageSize, this.keyWord, this.sort, this.selected);

  //   this.order.getAllOrder1(params).subscribe(
  //     (data) => {
  //       this.orders = data;

  //     }
  //   );
  // }

  handlePageChange(event): void {
    this.page = event;
    this.searchmonth();
  }


  searchmonth(): void {
    const params = this.getRequestParams1(this.FromDate, this.ToDate);

    console.log(this.FromDate)
    this.sales.getAllOrder1(params).subscribe(
      (data) => {

        this.orders = data;

      }, (err) => {
        console.log(err);
      }
    );
  }


}