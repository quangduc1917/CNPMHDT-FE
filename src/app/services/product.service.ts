import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  saveProduct(nameProduct: string, price: number, year: number, origin: string, amount: number, brandId: number): Observable<any> {
    return this.http.post(AUTH_API + '/api/product/insert', { nameProduct, price, year, origin, amount, brandId }, httpOptions);
  }

 
  getAllProduct(params): Observable<any> {
    return this.http.get(AUTH_API + '/api/public/product/all', { params });
  }

  changeState(id: number, state: number) {
    return this.http.put(AUTH_API + '/api/product/changeState?productId=' + id + '&state=' + state, {}, httpOptions);
  }

  findProduct(params): Observable<any> {
    return this.http.get(AUTH_API + '/api/public/product/find', { params });
  }

  // tslint:disable-next-line: max-line-length
  updateProduct(productId: number, nameProduct: string, price: number, year: number, origin: string, amount: number, brandId: number): Observable<any> {
    return this.http.put(AUTH_API + '/api/product/update/' + productId, { nameProduct, price, year, origin, amount, brandId }, httpOptions);

  }

  uploadImage(files: string[], productId: number): Observable<any> {
    const formData = new FormData();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    return this.http.put(AUTH_API + '/api/product/uploadImage/' + productId, formData);
  }

 

  uploadImage1(files: string[]): Observable<any> {
    const formData = new FormData();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    return this.http.put(AUTH_API + '/api/product/uploadImage1', formData);
  }

}
