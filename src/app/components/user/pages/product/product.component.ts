import { Component, Directive, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HostListener } from '@angular/core';
import { ElementRef} from '@angular/core';

import { ProductDetail } from 'src/app/commons/productDetail';
import { CartService } from 'src/app/services/cart.service';
import { CommentService } from 'src/app/services/comment.service';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { ProductService } from 'src/app/services/product.service';
import { ReviewService } from 'src/app/services/review.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],

  
})


export class ProductComponent implements OnInit {

  id!: number;
  dataDetail?: any;

  comment !: string;

  im2!: string;

  imageFirst !: string;
  imageTwo !: string;
  imageThree !: string;
  imageFour !: string;
  nameProduct !: string;
  price !: number;
  content !: string;


  cardReader !: string;
  chipSet !: string;
  color!: string;
  expansionSlot!: string;
  hardDrive!: string;
  maximumCapacity!: string;
  numberOfSlot!: string;
  opticalDrive!: string;
  partNumber!: string;
  processor!: string;
  ram!: string;
  vga!: string;

  point !: number;
  review !: string;

  reviews: any;
  nCountReview = 0;
  pager = 1;
  pageSizer = 3;


  tutorials: any;
  page = 1;
  pageSize = 3;
  currentTutorial = null;
  currentIndex = -1;
  count = 0;

  item = 1;

  countReview = 0;


  @ViewChild('test1') el1:ElementRef;
  @ViewChild('test2') el2:ElementRef;
  @ViewChild('test3') el3:ElementRef;
  @ViewChild('test4') el4:ElementRef;



  // tslint:disable-next-line: max-line-length
  constructor(private route: ActivatedRoute, private product: ProductService,
              private detail: ProductDetailService, private commentActice: CommentService, private reviewAction: ReviewService,
              private token: TokenStorageService,
              private cart: CartService,
              private elementRef: ElementRef
              ) {
    if (this.route.snapshot.params[`id`]) {
      this.id = this.route.snapshot.params[`id`];
    }

    const params = this.getParams(this.id);
    this.product.findProduct(params).subscribe(
      (data) => {
        this.imageFirst = data?.imageFirst;
        this.imageTwo = data?.imageTwo;
        this.imageFour = data?.imageFour;
        this.imageThree = data?.imageThree;
        this.nameProduct = data?.nameProduct;
        // this.price = data?.price;
        this.price=this.formatCash(data?.price.toString());
        this.content = data?.content;
      }
    );
  }


  ngOnInit() {




    this.detail.findId(this.id).subscribe(
      (data) => {
        console.log(data);
        this.dataDetail = data;
        this.cardReader = data?.cardReader;
        this.chipSet = data?.chipSet;
        this.color = data?.color;
        this.expansionSlot = data?.expansionSlot;
        this.hardDrive = data?.hardDrive;
        this.maximumCapacity = data?.maximumCapacity;
        this.numberOfSlot = data?.numberOfSlot;
        this.opticalDrive = data?.opticalDrive;
        this.partNumber = data?.partNumber;
        this.processor = data?.processor;
        this.ram = data?.ram;
        this.vga = data?.vga;

      }
    );

    this.retrieveTutorials();

    this.getAllReviews();

    this.countReviewProduct();

  }

  formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + '.')) + prev
    })
  }

  getRequestParams(offset, limit, productId): any {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (offset) {
      params[`offset`] = offset - 1;
    }

    if (limit) {
      params[`limit`] = limit;
    }

    if (productId) {
      params[`productId`] = productId;
    }

    return params;
  }

  retrieveTutorials(): void {

    const params = this.getRequestParams(this.page, this.pageSize, this.id);

    this.commentActice.getAllComment(params).subscribe(
      (data) => {
        this.tutorials = data?.content;
        this.count = data?.totalElements;
      }, (error) => {
        console.log(error);
      }
    );
  }

  handlePageChangeC(event): void {
    this.page = event;
    this.retrieveTutorials();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveTutorials();
  }


  getAllReviews(): void {
    const paramss = this.getRequestParams(this.pager, this.pageSizer, this.id);
    this.reviewAction.getAllReview(paramss).subscribe(
      (dt) => {
        console.log(dt);
        this.reviews = dt?.content;
        this.nCountReview = dt?.totalElements;
      }, (error) => {
        console.log(error);
      }
    );
  }

  handlePageChangeReview(event): void {
    this.pager = event;
    this.getAllReviews();
  }

  handlePageSizeChangeReview(event): void {
    this.pageSizer = event.target.value;
    this.pager = 1;
    this.getAllReviews();
  }


  getParams(productId) {
    const params = {};

    if (productId) {
      params[`productId`] = productId;
    }
    return params;
  }

  fun_review() {
    if (this.token.getToken() == null) {
      alert('You can login!');
    } else {
      this.reviewAction.review(this.id, this.point, this.review).subscribe(
        (data) => {
          this.getAllReviews();
          this.point = null;
          this.review = '';
          alert('Review success!');
        }, (error) => {
          alert('Review failed!');
        }
      );
    }

  }

  fun_comment() {
    if (this.token.getToken() == null) {
      alert('You can login!');
    } else {
      this.commentActice.commentAction(this.id, this.comment).subscribe(
        (data) => {
          alert('Comment success!');
          this.retrieveTutorials();
          this.comment = '';
        }, (err) => {
          alert('Comment failed!');
        }
      );
    }
  }

  addToCart() {
    if (this.token.getToken() == null) {
      alert('You can login!');
    } else {
      this.cart.addItem(this.id, this.item).subscribe(
        (data) => {
          alert('Add item to cart success!');
        }, err => {
          // alert('Add item to cart failed!');
          alert('Số lượng sản phẩm k đủ');
        }
      );
    }
  }

  countReviewProduct() {
    this.reviewAction.countReview(this.id).subscribe(
      (data) => {
        this.countReview = data;
      }, err => {
        console.log(err);
      }
    );
  }



  // @HostListener('click')
  // image1()
  // {
  //   console.log(this.elementRef.nativeElement.src);
  //   var src = this.el1.nativeElement.src;
  //   var pr:any= document.getElementById("preview");
  //   pr.src=src;
    

  // }
  image1()
  {
    console.log(this.el1.nativeElement.src)
    var src = this.el1.nativeElement.src;
    var pr:any= document.getElementById("preview");
    pr.src=src;

  }

  image2()
  {
    console.log(this.el2.nativeElement.src)
    var src = this.el2.nativeElement.src;
    var pr:any= document.getElementById("preview");
    pr.src=src;
  }
  image3()
  {
    console.log(this.el3.nativeElement.src)
    var src = this.el3.nativeElement.src;
    var pr:any= document.getElementById("preview");
    pr.src=src;
  }
  image4()
  {
    console.log(this.el4.nativeElement.src)
    var src = this.el4.nativeElement.src;
    var pr:any= document.getElementById("preview");
    pr.src=src;
  }

}
