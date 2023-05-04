import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-trending-product',
  templateUrl: './trending-product.component.html',
  styleUrls: ['./trending-product.component.css']
})
export class TrendingProductComponent implements OnInit {

  trends?: any;

  keyWord !: string;
  page = 1;
  pageSize = 3;

  selected !: number;
  sort !: number;

  img !: string;

  constructor(private product: ProductService) { }

  ngOnInit() {
    const params = this.getRequestParams(this.page, this.pageSize, this.keyWord, this.sort, this.selected);
    this.product.getAllProduct(params).subscribe(
      (data) => {
        this.trends = data?.content;
        console.log(data);
      }
    );
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


}
