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
export class AuthService {

  constructor(private http: HttpClient) { }


  isLogin = false;
  isAdmin = false;


  checkAdmin() {
    // tslint:disable-next-line: variable-name
    const promise = new Promise<boolean>((resovle, _reject) => {
      setTimeout(() => resovle(this.isAdmin), 100);
    });

    return promise;
  }

  setAdmin(isAdmin: boolean) {
    this.isAdmin = isAdmin;
  }

  isAuthenticated() {
    // tslint:disable-next-line: variable-name
    const promise = new Promise<boolean>((_resolve, _reject) => {
      setTimeout(() => _resolve(this.isLogin), 100);
    });
    return promise;
  }

  setLogin(isLogin: boolean): void {
    this.isLogin = isLogin;
  }

  getLogin(): boolean {
    return this.isLogin;
  }

  login(username: string, passwords: string): Observable<any> {
    return this.http.post(AUTH_API + '/api/auth/signin', { usernameOrEmail: username, password: passwords }, httpOptions);
  }

  getUserInfo(): Observable<any> {
    return this.http.get(AUTH_API + '/api/user/info', httpOptions);
  }

  register(usernamer: string, passwordr: string, emailr: string): Observable<any> {
    return this.http.post(AUTH_API + '/api/auth/signup', { username: usernamer, password: passwordr, email: emailr }, httpOptions);
  }


  changePass(newpasswords: string, newsdpassword: string, oldPasswordd: string): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.post(AUTH_API + '/api/user/password', { newPassword: newpasswords, newSecondPassword: newsdpassword, oldPassword: oldPasswordd }, httpOptions);
  }

  updateProfile(name: string, numberPhone: string, address: string, id: number): Observable<any> {
    return this.http.post(AUTH_API + '/api/user/update/' + id, { name, numberPhone, address }, httpOptions);
  }

  getAll(params): Observable<any> {
    return this.http.get(AUTH_API + '/api/user/all', { params });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(AUTH_API + '/api/user/delete/' + id, httpOptions);
  }

  udpateUser(id: number, name: string, numberPhone: string, address: string): Observable<any> {
    return this.http.post(AUTH_API + '/api/user/update/' + id, { name, numberPhone, address }, httpOptions);
  }

  updateImg(file) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(AUTH_API + '/api/user/uploadAvatar', formData);
  }

  reset(emailr: string): Observable<any> {
    return this.http.post(AUTH_API + '/api/auth/reset', {email: emailr }, httpOptions);
  }

}



