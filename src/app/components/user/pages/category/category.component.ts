import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/services/brand.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  brands!: any;
  keyWork !: string;
  selected !: number;
  sort !: number;
  tutorials: any;

  count = 0;
  page = 1;
  pageSize = 12;

  key !: string;
  currentTutorial = null;
  currentIndex = -1;


  // tslint:disable-next-line: max-line-length
  constructor(private route: ActivatedRoute, private router: Router, private product: ProductService, private brand: BrandService, private cart: CartService, private token: TokenStorageService) {
    this.router.events.subscribe((val) => {
      this.keyWork = this.route.snapshot.params[`key`];
      this.setKey(this.keyWork);

    });


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

  setKey(keys: string) {
    this.key = keys;
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

    const params = this.getRequestParams(this.page, this.pageSize, this.key, this.sort, this.selected);

    this.product.getAllProduct(params).subscribe(
      (data) => {
        console.log(data);
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


  addToCart(productId: number) {
    if (this.token.getToken() == null) {
      alert('You can login!');
    } else {
      this.cart.addItem(productId, 1).subscribe(
        (data) => {
          alert('Add item to cart success!');
        }, err => {
          alert('Add item to cart failed!');
        }
      );
    }

  }




}
