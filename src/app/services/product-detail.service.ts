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
export class ProductDetailService {

  constructor(private http: HttpClient) { }

  findId(productId: number): Observable<any> {
    return this.http.get(AUTH_API + '/api/public/productDetail/find/' + productId, httpOptions);
  }

  saveDetail(id: number,
             ram: string,
             color: string,
             partNumber: string,
             processor: string,
             chipSet: string,
             numberOfSlot: number,
             expansionSlot: string,
             maximumCapacity: string,
             vga: string,
             hardDrive: string,
             opticalDrive: string,
             cardReader: string,
             content: string
  ): Observable<any> {
    return this.http.post(AUTH_API + '/api/productDetail/insert/' + id, {
      ram,
      color,
      partNumber,
      processor,
      chipSet,
      numberOfSlot,
      expansionSlot,
      maximumCapacity,
      vga,
      hardDrive,
      opticalDrive,
      cardReader,
      content
    }, httpOptions);
  }


  updateDetail(id: number,
               ram: string,
               color: string,
               partNumber: string,
               processor: string,
               chipSet: string,
               numberOfSlot: number,
               expansionSlot: string,
               maximumCapacity: string,
               vga: string,
               hardDrive: string,
               opticalDrive: string,
               cardReader: string,
               content: string
  ): Observable<any> {
    return this.http.put(AUTH_API + '/api/productDetail/update/' + id, {
      ram,
      color,
      partNumber,
      processor,
      chipSet,
      numberOfSlot,
      expansionSlot,
      maximumCapacity,
      vga,
      hardDrive,
      opticalDrive,
      cardReader,
      content
    }, httpOptions);
  }
}
