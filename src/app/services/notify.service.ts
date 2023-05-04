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
export class NotifyService {
  

  constructor(private http: HttpClient) { }
  
  getAllNotify(): Observable<any> {
    return this.http.get(AUTH_API + '/api/public/comment/all1', httpOptions);
  }


  getAllNotify1(params): Observable<any> {
    return this.http.get(AUTH_API + '/api/public/comment/all2', { params });
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete(AUTH_API + '/api/comment/delete/' + id, httpOptions);
  }


}
