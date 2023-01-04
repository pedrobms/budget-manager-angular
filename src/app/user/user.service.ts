import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/env';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserData(id: any): Observable<User> {
    const url = `${environment.api}/users/${id}`;
    return this.http.get(url).pipe(
      map((res) => {
        return res || {}
      })
    );
  }
}
