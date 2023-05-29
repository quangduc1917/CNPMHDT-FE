import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { orders } from 'src/app/commons/orders';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  idcart!: number;
  items?: any;
  items1?: any;
  amount !: number;
  total !: number;
  total1 !: number;

  name!: string;
  numberphone!: string;
  address!: string;

  infor!: string;

  inforOrder!:orders;


  phoneorder!: string;
  addressoder!: string;
  nameorder!: string;
  inforadd!: string;
  

  constructor(private auth: AuthService, private token: TokenStorageService,
    private router: Router, private route: ActivatedRoute, private cart: CartService) {
    if (this.token.getToken() == null) {
      alert('You can login!');
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.fecthData();

    if (this.token.getToken() != null) {
      this.auth.getUserInfo().subscribe(
        (data) => {
          this.name = data?.name;
          this.numberphone = data?.numberPhone;
          this.address = data?.address;
        }
      );
    }
  }

  fecthData() {
    this.cart.getAll().subscribe(
      (data) => {
        this.items = data;
        this.items1=data;
        console.log(this.items1);

      

        this.totalPrice1();
        for(let i=0;i<this.items1.length;i++){
          this.items1[i].price=this.formatCash(this.items1[i].price.toString());

          let sum12 = this.items1[i].totalPrice;
          this.items1[i].totalPrice  = this.formatCash(sum12.toString());

        }
      }
    );
  }



  updateAmountItem(event, cartId) {
    const id = cartId;
    const amount = event.target.value;
    this.cart.updateCart(id, amount).subscribe(
      (data) => {
        alert('Cập nhật số lượng sản phẩm thành công');
        this.fecthData();
        window.location.reload();
      },err => {
        alert('Số lượng sản phẩm k đủ');
        window.location.reload();
      }
    );
  }

  deleteItem(cartId) {
    this.cart.deleteCart(cartId).subscribe(
      (data) => {
        this.fecthData();
      }
    );
  }

  totalPrice1() {
    let sum = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].state === 0) {
        sum += this.items[i].totalPrice;
        console.log(sum)

      }

    }

    this.total1=sum;

    this.total = this.formatCash(sum.toString());;
    
  }

  formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + '.')) + prev
    })
  }
  checkOut() {
    // tslint:disable-next-line: prefer-for-of
    this.infor="";
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].state === 0) {
        
        this.infor=this.infor+this.items[i].nameProduct+this.items[i].price+" (x"+this.items[i].amountItem+") ";
        if(i!=this.items.length-1)
      {
        this.infor=this.infor+"<br>";
      }
      }
      
     
    }

    this.inforadd="";
    this.inforadd="Tên người nhận hàng: "+this.nameorder+"<br>"+"Số điện thoại: "+this.phoneorder+"<br>"+"Địa chỉ nhận hàng: "+this.addressoder;
  
    this.cart.checkOut1(this.infor,this.total1,this.inforadd).subscribe();
    for (let i = 0; i < this.items.length; i++) {
      this.cart.checkOut(this.items[i].cartId).subscribe();
      this.fecthData();
    }
    window.location.reload();
    alert('Checkout success!');
  }


}
