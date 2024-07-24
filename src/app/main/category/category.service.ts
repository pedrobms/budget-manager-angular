import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/enviorement/environment';
import { Category } from './category';
import { Page } from 'src/app/shared/models/page.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  addCategory(value: Category) {
    const url = `${environment.api}/users/${this.authService.getUserId()}/categories`;
    return this.http.post(url, value);
  }

  updateCategory(value: Category) {
    const url = `${environment.api}/users/${this.authService.getUserId()}/categories/${value.id}`;
    return this.http.put(url, value);
  }

  getCategories(type: string): Observable<Page<Category>> {
    const url = `${environment.api}/users/${this.authService.getUserId()}/categories/find?type=${type}`;
    return this.http.get<Page<Category>>(url);
  }

  getAllCategories(): Observable<Page<Category>> {
    const url = `${environment.api}/users/${this.authService.getUserId()}/categories`;
    return this.http.get<Page<Category>>(url);
  }

  getCategoryById(id: number): Observable<Category> {
    const url = `${environment.api}/users/${this.authService.getUserId()}/categories/${id}`;
    return this.http.get<Category>(url);
  }
}
