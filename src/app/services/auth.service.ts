import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment';
import { Observable, BehaviorSubject, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  public token$ = this.tokenSubject.asObservable();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  createUser(user: any): Observable<any> {
    let url = `${environment.serverBaseURL}/user`;
    const userdata = user;
    console.log(userdata);
    return this.http.post(url, user);
  }

  getUsers(): Observable<any> {
    console.log('Inside the service');
    let url = `${environment.serverBaseURL}/user`;
    return this.http.get(url);
  }

  loginUser(logindata: any): Observable<any> {
    let url = `${environment.serverBaseURL}/user/login`;
    const userdata = logindata;
    console.log(userdata);
    return this.http.post(url, userdata).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setToken(response.token);
        }
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(null);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  removeToken(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }
}
