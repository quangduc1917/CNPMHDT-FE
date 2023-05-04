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

  // public canvas: any;
  // public ctx: any;
  // canvas: any;
  // ctx: any;
  // @ViewChild('myChart') mychart: any;
    
  //   realdata: any[] = [];
  //   labeldata: any[]=[]
  //  chartdata: any;
    
  

  // constructor(private service:OrderService) { }

  // ngOnInit(): void {}


    
  //   this.service.getAllOrder12().subscribe((result: any) => {
  //     this.chartdata = result;
  //     if(this.chartdata!=null){
  //       for(let i=0; i<this.chartdata.length ;i++){
  //         this.labeldata.push(this.chartdata[i].year);
  //         this.realdata.push(this.chartdata[i].amount);
        
  //       }
  //     }
  //   });
  //   this.createLineChart(this.labeldata, this.realdata);
    

  //  ;
    
    
  // }


  // ngAfterViewInit() {


  //   this.service.getAllOrder12().subscribe((result: any) => {
  //         this.chartdata = result;
  //         if(this.chartdata!=null){
  //           for(let i=0; i<this.chartdata.length ;i++){
  //             this.labeldata.push(this.chartdata[i].year);
  //             this.realdata.push(this.chartdata[i].amount);
            
  //           }
  //         }
  //       });
  //       console.log(this.realdata);

  //   this.canvas = this.mychart.nativeElement;
  //   this.ctx = this.canvas.getContext('2d');
  //   let chart = new Chart(this.ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: this.labeldata,
  //       datasets: [{
  //         label: "Chart 1",
  //         data: this.realdata,
  //         backgroundColor: '#ffbb33',
  //         borderColor: '#ffbb33',
  //         fill: false,
  //         borderWidth: 2
  //       }]
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       legend: {
  //         display: true
  //     },
  //       title: {
  //         display: true,
  //         text: "First chart"
  //       },
  //       hover: {
  //         mode: 'nearest',
  //         intersect: true
  //       },
  //       scales: {
  //         yAxes: [{
  //           ticks: {
  //             beginAtZero: true
  //           }
  //         }]
  //       }
        
  //     }
  //   });
 
    
  // }

}

