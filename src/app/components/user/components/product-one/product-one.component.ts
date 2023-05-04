import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ReviewService } from 'src/app/services/review.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-product-one',
  templateUrl: './product-one.component.html',
  styleUrls: ['./product-one.component.css']
})
export class ProductOneComponent implements OnInit {



  constructor(private product: ProductService, private cart: CartService, private token: TokenStorageService, private reviewAction: ReviewService) { }

  products?: any;

  keyWord !: string;
  page = 1;
  pageSize = 8;

  selected !: number;
  sort !: number;

  img !: string;

  items?: any;
  convert!: string;





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
    
    let x = document.getElementById("sao").style.width="100%";
    


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
