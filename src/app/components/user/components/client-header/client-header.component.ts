import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import jwtDecode from 'jwt-decode';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';



@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.css']
})
export class ClientHeaderComponent implements OnInit, OnChanges {

  roles: any;
  username!: string;
  password!: string;
  email!: string;
  userinfo!: string;
  order?: any;

  confirmpassword!:String;

  cnewpass !: string;
  cnewspass !: string;
  coldpass !: string;

  name!: string;
  numberphone!: string;
  address!: string;
  id!: number;
  avatar !: string;

  img: File = null;

  @Input()
  keyWork !: string;

  @Input()
  nCountCart !: number;




  constructor(public auth: AuthService, private token: TokenStorageService, private router: Router,private formbuilder: FormBuilder, private orders: OrderService) {
    if (this.token.getToken() != null) {
      this.auth.setLogin(true);
    }

    

  }
  ngOnChanges(): void {
    
  }

  
  ngOnInit() {
    if (this.token.getToken() != null) {
      this.auth.getUserInfo().subscribe(
        (data) => {
          this.userinfo = data?.userName;
          this.name = data?.name;
          this.numberphone = data?.numberPhone;
          this.address = data?.address;
          this.id = data?.userId;
          this.avatar = data?.imgAvatar;
        }
      );
      this.loadData();
    }
  }

  loadData() {
    this.orders.getOrder().subscribe(
      (data) => {
        this.order = data;
        for(let i=0;i<this.order.length;i++){
          this.order[i].order_total=this.formatCash(this.order[i].order_total.toString());
        }
      }
    );
    console.log(this.order);

  }

  login() {

    this.auth.login(this.username, this.password).subscribe(
      (data) => {
        this.token.saveToken(data.accessToken);
        this.auth.setLogin(true);
        this.roles = jwtDecode(data.accessToken);
        if (this.roles?.roles === '[ROLE_ADMIN]') {
          localStorage.setItem('role', this.roles?.roles);
          window.location.href = '/dashbroad';
        } else {
          window.location.reload();
        }

      },
      (error) => {
        alert('Login failed!');
      }
    );

  }

  register() {
   
      this.auth.register(this.username, this.password, this.email).subscribe(
        (data) => {
          alert('Đăng kí thành công');
          window.location.reload();
        },
        (error) => {
          alert('Đăng ký không thành công, email hoặc username đã tồn tại');
        }
      )
    
   
    
  }

  formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + '.')) + prev
    })
  }
  logout() {
    this.token.singOut();
  }

  changePass() {
    this.auth.changePass(this.cnewpass, this.cnewspass, this.coldpass).subscribe(
      (data) => {
        alert('Change password success!');
        window.location.reload();
      }, (error) => {
        alert('change password failed');
      }
    );
  }


  updateProfile() {
    this.auth.updateProfile(this.name, this.numberphone, this.address, this.id).subscribe(
      (data) => {
        alert('Update profile success!');
      }, err => {
        alert('Update profile failed!');
      }
    );
  }

  onChange(event) {
    this.img = event.target.files[0];
  }

  updateAvatar() {

    console.log(this.img);

    this.auth.updateImg(this.img).subscribe(
      (data) => {
        window.location.reload();
        alert('Update avatar success!');

      }, err => {
        alert('Update avatar failed!');
      }
    );
  }

  search() {
    this.router.navigate(['/products/' + this.keyWork]);
  }

  reset()
  {
    this.auth.reset( this.email).subscribe(
      (data) => {
        alert('Reset success');
        window.location.reload();
      },
      (error) => {
        alert('Reset failed');
      }
    );
  }












  

}


