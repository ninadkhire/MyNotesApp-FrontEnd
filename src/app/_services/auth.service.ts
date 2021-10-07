import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8088/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any>{
    //Traditional method: sending credentials as parameters
    /*return this.http.post(AUTH_API+'signin', {
      username,
      password
    }, httpOptions);*/

    //New method: Sending credentials in Authorization header
    const httpOptions = {
      headers: new HttpHeaders({Authorization: 'Basic' + btoa(username+':'+password)})
        .append('Content-Type', 'application/json')
    };
    return this.http.post(AUTH_API+'signin', {}, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any>{
    //Traditional method: sending credentials as parameters
    /*return this.http.post(AUTH_API+'signup', {
      username,
      email,
      password
    }, httpOptions);*/
    
    //New method: Sending credentials in Authorization header
    const httpOptions = {
      headers: new HttpHeaders({Authorization: 'Basic' + btoa(username+':'+email+':'+password)})
        .append('Content-Type', 'application/json')
    };

    console.log("Register "+username);

    return this.http.post(AUTH_API+'signup', {}, httpOptions);
  }
}
