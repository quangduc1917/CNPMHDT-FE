import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { orders } from '../commons/orders';

const AUTH_API = 'http://localhost:8080';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  addItem(productId: number, amountItem: number): Observable<any> {
    return this.http.post(AUTH_API + '/api/cart/addItem?productId=' + productId + '&amountItem=' + amountItem, {}, httpOptions);
  }

  updateCart(cartId: number, amountItem: number): Observable<any> {
    return this.http.put(AUTH_API + '/api/cart/updateItem?cartId=' + cartId + '&amountItem=' + amountItem, {}, httpOptions);
  }

  deleteCart(productId: number): Observable<any> {
    return this.http.delete(AUTH_API + '/api/cart/deleteItem/' + productId);
  }

  getAll(): Observable<any> {
    return this.http.get(AUTH_API + '/api/cart/all');
  }

  countItem(): Observable<any> {
    return this.http.get(AUTH_API + '/api/cart/count');
  }

  checkOut(cardId: number): Observable<any> {
    return this.http.put(AUTH_API + '/api/cart/checkout/' + cardId, {}, httpOptions);
  }


  checkOut1(orders: string,total:number,infor:string): Observable<any> {
    return this.http.post(AUTH_API + '/api/cart/checkout1', { orderName: orders,orderTotal:total,orderInfor:infor}, httpOptions);
  }


}
