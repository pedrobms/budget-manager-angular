import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/enviorement/environment';
import { AuthService } from '../../auth/auth.service';
import { TransactionType } from './transaction-type';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getBalanceBetweenDates(startDate: String, endDate: String): Observable<any> {
    const url = `${environment.api}/users/${this.authService.getUserId()}/balance/find?startDate=${startDate}&endDate=${endDate}`;
    return this.http.get(url).pipe(
      (res) => {
        return res || 0
      }
    );
  }

  getBalanceBetweenDatesByType(startDate: String, endDate: String, type: TransactionType): Observable<any> {
    const url = `${environment.api}/users/${this.authService.getUserId()}/balance/find?type=${type}&startDate=${startDate}&endDate=${endDate}`;
    return this.http.get(url).pipe(
      (res) => {
        return res || 0
      }
    );
  }
}
