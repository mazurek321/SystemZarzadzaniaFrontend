import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UsersService } from '../users/users';

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

  constructor(
    private http: HttpClient, 
    public usersService: UsersService
  ) {
    const tokenLocal = localStorage.getItem("token");
    const tokenSession = sessionStorage.getItem("token");

    const token = tokenLocal || tokenSession;

    if(token)
    {
      this.token.next(token);
    }
  }

  register(data: RegisterData):Observable<any>
  {
    return this.http.post(`${this.authUrl}/register`, data);
  }

  login(email: string, password: string, rememberMe: boolean): Observable<any>
  {
    const Credentials = {email, password};

    return this.http.post(`${this.authUrl}/login`, Credentials, {responseType: 'text'}).pipe(
      tap(response => {
        rememberMe ? localStorage.setItem('token', response) : sessionStorage.setItem('token', response);
        this.token.next(response);
      })
    );
  }

  logout()
  {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.token.next(null);
    this.usersService.clearCurrentsUserData();
  }

  isLoggedIn():boolean
  {
    const tokenLocal = localStorage.getItem('token');
    const tokenSession = sessionStorage.getItem('token');

    return !!tokenLocal || !!tokenSession; 
  }

  getToken() : string | null
  {
    const tokenLocal = localStorage.getItem('token');
    const tokenSession = sessionStorage.getItem('token');

    return tokenLocal || tokenSession;
  }

}
