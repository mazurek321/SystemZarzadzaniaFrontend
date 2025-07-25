import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface Credentials
{
  email: string;
  password: string;
}

export interface RegisterData
{
  name: string;
  lastname: string;
  password: string;
  confirmPassword: string;
  email: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = "http://localhost:5259/api/auth";
  private token = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  register(data: RegisterData):Observable<any>
  {
    return this.http.post(`${this.authUrl}/register`, data);
  }

  login(credentials: Credentials): Observable<any>
  {
    return this.http.post(`${this.authUrl}/login`, credentials, {responseType: 'text'}).pipe(
      tap(response => {
        localStorage.setItem('token', response);
        this.token.next(response);
      })
    );
  }

  logout()
  {
    localStorage.removeItem('token');
    this.token.next(null);
  }

  isLoggedIn():boolean
  {
    return !!localStorage.getItem('token'); 
  }

  getToken() : string | null
  {
    return localStorage.getItem('token');
  }

}
