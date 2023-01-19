import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/enviorement/environment';
import { User } from '../main/user/user';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUser: User = new User();

  constructor(private http: HttpClient, public router: Router) { }

  register(user: User): Observable<User> {
    const url = `${environment.api}/auth/register`;
    return this.http.post<User>(url, user);
  }

  login(user: User) {
    return this.http.post<User>(`${environment.api}/auth/login`, user)
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
