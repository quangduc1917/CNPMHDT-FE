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
export class OrderService {

  constructor(private http: HttpClient) { }
  
  getAllOrder(): Observable<any> {
    return this.http.get(AUTH_API + '/api/public/order/all', httpOptions);
  }


  getAllOrder1(params): Observable<any> {
    return this.http.get(AUTH_API + '/api/public/order/all1', { params });
  }


  getAllOrder12(): Observable<any> {
    return this.http.get(AUTH_API + '/api/public/order/sale', httpOptions);
  }
}
