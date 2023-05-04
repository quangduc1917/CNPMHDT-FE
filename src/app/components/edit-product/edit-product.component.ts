import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BrandService } from 'src/app/services/brand.service';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  id!: number;
  productName !: string;
  price !: number;
  year !: number;
  origin !: string;
  amount !: number;
  brands !: number;
  selectbrand !: number;

  image1 !: string;
  image2 !: string;
  image3 !: string;
  image4 !: string;

  myFiles: string[] = [];
  modalService: any;
  closeResult: string;

  isEdit !: boolean;

  ram !: string;
  color!: string;
  partnumber!: string;
  processor!: string;
  chipset!: string;
  numberofslot!: number;
  expansionslot!: string;
  maximum!: string;
  vga!: string;
  harddrive!: string;
  optiondriver!: string;
  cardreader!: string;
  content!: string;



  constructor(private route: ActivatedRoute, private product: ProductService
    ,         private brand: BrandService, private detail: ProductDetailService) {
    if (route.snapshot.params[`id`]) {
      this.id = route.snapshot.params[`id`];
    }
  }

  getParams(productId) {
    const params = {};

    if (productId) {
      params[`productId`] = productId;
    }
    return params;
  }

  ngOnInit() {
    const params = this.getParams(this.id);
    this.product.findProduct(params).subscribe(
      (data) => {
        this.productName = data?.nameProduct;
        this.price = data?.price;
        this.year = data?.year;
        this.origin = data?.origin;
        this.amount = data?.amount;
        this.selectbrand = data?.brandId;
        this.image1 = data?.imageFirst;
        this.image2 = data?.imageTwo;
        this.image3 = data?.imageThree;
        this.image4 = data?.imageFour;
      }
    );

    this.brand.getAllBrand().subscribe(
      (data) => {
        this.brands = data;
      }, err => {
        alert('Failed!');
      }
    );

    this.detail.findId(this.id).subscribe(
      (data) => {

        if (data == null) {
          this.isEdit = true;

        } else {
          this.isEdit = false;

          this.ram = data?.ram;
          this.color = data?.color;
          this.partnumber = data?.partNumber;
          this.processor = data?.processor;
          this.chipset = data?.chipSet;
          this.numberofslot = data?.numberOfSlot;
          this.expansionslot = data?.expansionSlot;
          this.maximum = data?.maximumCapacity;
          this.vga = data?.vga;
          this.harddrive = data?.hardDrive;
          this.optiondriver = data?.opticalDrive;
          this.cardreader = data?.cardReader;
          this.content = data?.content;
        }
      }, err => {
        this.isEdit = true;
        console.log(err);
      }
    );

  }

  update() {
    this.product.updateProduct(this.id, this.productName, this.price, this.year, this.origin, this.amount, this.selectbrand).subscribe(
      (data) => {
        window.location.reload();
        alert('Update success!');
      }, err => {
        alert('Update failed!');
      }
    );
  }

  onFileChange(event) {

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }

  upload() {

    this.product.uploadImage(this.myFiles, this.id).subscribe(
      (data) => {
        window.location.reload();
        alert('Upload success!');
      }, err => {
        console.log(err);
        alert('Upload image failed!');
      }
    );
  }

  stock() {
    this.product.changeState(this.id, 1).subscribe(
      (data) => {
        alert('Stock product success!');
      }, err => {
        alert('Stock product failed!');
      }
    );
  }

  OutStock() {
    this.product.changeState(this.id, 0).subscribe(
      (data) => {
        alert('Out stock product success!');
      }, err => {
        alert('Out stock product failed!');
      }
    );
  }

  saveDetail() {
    this.detail.saveDetail(this.id , this.ram, this.color, this.partnumber, this.processor, this.chipset,
      this.numberofslot,
      this.expansionslot,
      this.maximum,
      this.vga,
      this.harddrive,
      this.optiondriver,
      this.cardreader,
      this.content
    ).subscribe(
      (data) => {
        this.isEdit = false;
        alert('Save detail success!');
        window.location.reload();
      }, err => {
        alert('Save detail failed');
      }
    );
  }

  updateDetail() {
    this.detail.updateDetail(this.id, this.ram, this.color, this.partnumber, this.processor, this.chipset,
      this.numberofslot,
      this.expansionslot,
      this.maximum,
      this.vga,
      this.harddrive,
      this.optiondriver,
      this.cardreader,
      this.content).subscribe(
        (data) => {
          this.isEdit = false;
          alert('Update detail success!');
          window.location.reload();
        }, err => {
          alert('Update detail failed');
        }
      );
  }



}
