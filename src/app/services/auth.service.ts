import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  createUser(user: any): Observable<any> {
    let url = `${environment.serverBaseURL}/user`;
    const userdata = user;
    console.log(userdata);
    return this.http.post(url,user)
  }

  getUsers(): Observable<any> {
    console.log('Inside the service');
    let url = `${environment.serverBaseURL}/user`;
    return this.http.get(url);
  }

  loginUser(logindata:any):Observable<any>{
    let url = `${environment.serverBaseURL}/user/login`;
    const userdata = logindata;
    console.log(userdata)
    return this.http.post(url,userdata)
  }
}
