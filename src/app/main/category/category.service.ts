import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/enviorement/environment';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  addCategory(value: Category) {
    const url = `${environment.api}/users/${this.authService.getUserId()}/categories`;
    return this.http.post(url, value);
  }

  getCategories(type: string): Observable<any> {
    const url = `${environment.api}/users/${this.authService.getUserId()}/categories/find?type=${type}`;
    return this.http.get(url);
  }
}
