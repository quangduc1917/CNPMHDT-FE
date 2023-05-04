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
export class CommentService {

    constructor(private http: HttpClient) { }

    commentAction(productId: number, commentText: string): Observable<any> {
        return this.http.post(AUTH_API + '/api/comment/add/' + productId, { commentText }, httpOptions);
    }

    getAllComment(params): Observable<any> {
        return this.http.get(AUTH_API + '/api/public/comment/all', { params });
    }

}
