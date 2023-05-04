import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { BrandService } from 'src/app/services/brand.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-manager-products',
  templateUrl: './manager-products.component.html',
  styleUrls: ['./manager-products.component.scss']
})
export class ManagerProductsComponent implements OnInit {

  closeResult = '';
  id!: number;
  brands!: any;
  name!: string;
  price!: number;
  year!: number;
  origin!: string;
  amount!: number;
  selected !: number;
  sort !: number;
  productId !: number;
  image !: string;

  keyWord !: string;
  myFiles: string[] = [];

  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  // tslint:disable-next-line: max-line-length
  constructor(private modalService: NgbModal, private brand: BrandService, private product: ProductService, private auth: AuthService, private router: Router) {
    if (localStorage.getItem('role') !== '[ROLE_ADMIN]' && localStorage.getItem('role') === null && this.auth.getLogin() === false) {
      this.router.navigate(['/home']);
    }
  }



  ngOnInit() {
    this.brand.getAllBrand().subscribe(
      (data) => {
        this.brands = data;
      }, err => {
        alert('Failed!');
      }
    );

    this.retrieveTutorials();

  }


  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      
      this.product.uploadImage1(this.myFiles).subscribe(
        (data1) => {
          window.location.reload();
          alert('Upload success!');
        }, err => {
          console.log(err);
          alert('Upload image failed!');
        }
      );
      this.product.saveProduct(this.name, this.price, this.year, this.origin, this.amount, this.selected).subscribe(
        (data) => {
          this.retrieveTutorials();
          alert('Insert product success!');
        }, err => {
          alert('Insert product failed!');
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

  getRequestParams(offset, limit, keyWord, sort, brandId): any {
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

    if (sort) {
      params[`sort`] = sort;
    } else {
      params[`sort`] = '';
    }

    if (brandId) {
      params[`brandId`] = brandId;
    } else {
      params[`brandId`] = '';
    }

    return params;
  }

  retrieveTutorials(): void {
    const params = this.getRequestParams(this.page, this.pageSize, this.keyWord, this.sort, this.selected);

    this.product.getAllProduct(params).subscribe(
      (data) => {
        console.log(data);
        this.tutorials = data?.content;
        for(let i=0;i<this.tutorials.length;i++){
          this.tutorials[i].price=this.formatCash(this.tutorials[i].price.toString());
        }
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
  formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + '.')) + prev
    })
  }


  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveTutorials();
  }


  delete(id: number) {
    this.productId = id;
    this.product.changeState(this.productId, 3).subscribe(
      (data) => {
        window.location.reload();
        alert('Delete product success!');
      }, err => {
        alert('Delete product failed!');
      }
    );
  }

  onFileChange(event) {

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }

  



}
