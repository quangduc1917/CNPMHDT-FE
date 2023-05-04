import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { BrandService } from 'src/app/services/brand.service';


@Component({
  selector: 'app-manager-brands',
  templateUrl: './manager-brands.component.html',
  styleUrls: ['./manager-brands.component.scss']
})


export class ManagerBrandsComponent implements OnInit {

  closeResult = '';
  brands?: any;
  nameBrand !: string;
  brandId !: number;
  isEdit = false;

  constructor(public modalService: NgbModal, private router: Router, private auth: AuthService, private brand: BrandService) {
    if (localStorage.getItem('role') !== '[ROLE_ADMIN]' && localStorage.getItem('role') === null && this.auth.getLogin() === false) {
      this.router.navigate(['/home']);
    }
  }



  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.brand.getAllBrand().subscribe(
      (data) => {
        this.brands = data;
      }
    );

  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.brand.saveBrand(this.nameBrand).subscribe(
        (data) => {
          this.loadData();
          alert('Save brand success!');
        }, (err) => {
          alert('Save brand failed!');
        }
      );
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.isEdit = false;
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.isEdit = false;
      return 'by clicking on a backdrop';
    } else {
      this.isEdit = false;
      return `with: ${reason}`;
    }
  }

  edit(content, idBrand: number, nameBrand: string) {
    this.isEdit = true;
    this.brandId = idBrand;
    this.nameBrand = nameBrand;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.brand.updateBrand(this.nameBrand, this.brandId).subscribe(
        (data) => {
          this.loadData();
          alert('Update brand success!');
        }, (err) => {
          alert('Update brand failed!');
        }
      );
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

}
