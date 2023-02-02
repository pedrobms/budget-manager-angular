import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/enviorement/environment';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserData(id: number): Observable<User> {
    const url = `${environment.api}/users/${id}`;
    return this.http.get(url).pipe(
      map((res) => {
        return res || {}
      })
    );
  }

  updateUser(user: User): Observable<User> {
    const url = `${environment.api}/users/${user.id}`;
    return this.http.put(url, user).pipe(
      map((res) => {
        return res || {}
      })
    );
  }
}
