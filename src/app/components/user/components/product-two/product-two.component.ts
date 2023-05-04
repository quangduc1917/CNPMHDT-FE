import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-product-two',
  templateUrl: './product-two.component.html',
  styleUrls: ['./product-two.component.css']
})
export class ProductTwoComponent implements OnInit {

  products?: any;

  keyWord !: string;
  page = 1;
  pageSize = 8;

  selected !: number;
  sort = 1;

  img !: string;
  constructor(private product: ProductService, private cart: CartService, private token: TokenStorageService) { }

  ngOnInit() {
    const params = this.getRequestParams(this.page, this.pageSize, this.keyWord, this.sort, this.selected);
    this.product.getAllProduct(params).subscribe(
      (data) => {
        this.products = data?.content;
        for(let i=0;i<this.products.length;i++){
          this.products[i].price=this.formatCash(this.products[i].price.toString());
        }
      }
    );
  }

  formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + '.')) + prev
    })
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
