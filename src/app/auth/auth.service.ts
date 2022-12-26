import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from './user';

const API_URL = 'http://localhost:8080';
const TOKEN_KEY = 'token';
const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  headers = new HttpHeaders().set('Content-Type','application/json');
  currentUser: User = new User();

  constructor(private http: HttpClient, public router: Router) { }

  ngOnInit() {
    if (new JwtHelperService().isTokenExpired(this.getToken() || '{}')) {
      this.logout();
    }
  }

  register(user: User): Observable<User> {
    const url = `${API_URL}/auth/register`;
    return this.http.post<User>(url, user).pipe(catchError(this.handleError));
  }

  login(user: User) {
    return this.http.post<User>(`${API_URL}/auth/login`, user)
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  getUserId() {
    const decodedToken = new JwtHelperService().decodeToken(this.getToken() || '{}');
    return decodedToken.id;
  }

  logout() {
    let removeToken = localStorage.removeItem(TOKEN_KEY);
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  getUserProfile(id: any): Observable<User> {
    const url = `${API_URL}/users/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem(TOKEN_KEY);
    return authToken !== null ? true : false;
  }
}
