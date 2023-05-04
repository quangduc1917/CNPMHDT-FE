import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ReviewService {

    constructor(private http: HttpClient) { }


    review(productId: number, star: number, contentReview: string): Observable<any> {
        return this.http.post(AUTH_API + '/api/review/add/' + productId, { star, contentReview }, httpOptions);
    }

    getAllReview(params): Observable<any> {
        return this.http.get(AUTH_API + '/api/public/review/all', { params });
    }

    countReview(productId: number): Observable<any> {
        return this.http.get(AUTH_API + '/api/public/review/count/' + productId);
    }

}
