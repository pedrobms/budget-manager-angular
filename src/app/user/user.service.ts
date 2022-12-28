import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from './user';

const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserData(id: any): Observable<User> {
    const url = `${API_URL}/users/${id}`;
    return this.http.get(url).pipe(
      map((res) => {
        return res || {}
      })
    );
  }
}
