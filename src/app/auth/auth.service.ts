import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../user/user';

const API_URL = 'http://localhost:8080';
const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUser: User = new User();

  constructor(private http: HttpClient, public router: Router) { }

  register(user: User): Observable<User> {
    const url = `${API_URL}/auth/register`;
    return this.http.post<User>(url, user);
  }

  login(user: User) {
    return this.http.post<User>(`${API_URL}/auth/login`, user)
  }

  logout() {
    let removeToken = localStorage.removeItem(TOKEN_KEY);
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  getUserId() {
    const decodedToken = new JwtHelperService().decodeToken(this.getToken() || '{}');
    return decodedToken.id;
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem(TOKEN_KEY);
    return authToken !== null ? true : false;
  }
}
