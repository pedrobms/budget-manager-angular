import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/enviorement/environment';
import { AuthService } from '../auth/auth.service';
import { TransactionType } from './transaction-type';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getBalanceByMonth(month: number): Observable<any> {
    const url = `${environment.api}/users/${this.authService.getUserId()}/balance/month/${month}`;
    return this.http.get(url).pipe(
      map((res) => {
        return res || 0
      })
    );
  }

  getBalanceByType(type: TransactionType): Observable<any> {
    const url = `${environment.api}/users/${this.authService.getUserId()}/balance/${type}`;
    return this.http.get(url).pipe(
      map((res) => {
        return res || 0
      })
    );
  }
}
