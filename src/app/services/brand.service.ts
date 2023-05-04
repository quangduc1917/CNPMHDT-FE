import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const AUTH_API = 'http://localhost:8080';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  saveBrand(namebrand: string): Observable<any> {
    return this.http.post(AUTH_API + '/api/brand/save', { brandName: namebrand }, httpOptions);
  }

  updateBrand(namebrand: string, idBrand: number): Observable<any> {
    return this.http.put(AUTH_API + '/api/brand/update/' + idBrand, { brandName: namebrand }, httpOptions);
  }

  getAllBrand(): Observable<any> {
    return this.http.get(AUTH_API + '/api/public/brand/all', httpOptions);
  }

}
