import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/enviorement/environment';
import { AuthService } from '../../auth/auth.service';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getTransactionsBetweenDates(startDate: String, endDate: String): Observable<any> {
    const url = `${environment.api}/users/${this.authService.getUserId()}/transactions/find?startDate=${startDate}&endDate=${endDate}`;
    return this.http.get(url).pipe(
      (res) => {
        return res || 0
      }
    );
  }

  getTransactionById(id: Number): Observable<any> {
    const url = `${environment.api}/users/${this.authService.getUserId()}/transactions/${id}`;
    return this.http.get(url).pipe(
      (res) => {
        return res || 0
      }
    );
  }

  editTransaction(transaction: Transaction): Observable<any> {
    const url = `${environment.api}/users/${this.authService.getUserId()}/transactions/${transaction.id}`;
    return this.http.put(url, transaction).pipe(
      (res) => {
        return res || 0
      }
    );
  }

  deleteTransaction(id: Number): Observable<any> {
    const url = `${environment.api}/users/${this.authService.getUserId()}/transactions/${id}`;
    return this.http.delete(url).pipe(
      (res) => {
        return res || 0
      }
    );
  }

  addTransaction(transaction: Transaction): Observable<any> {
    const url = `${environment.api}/users/${this.authService.getUserId()}/transactions`;
    return this.http.post(url, transaction).pipe(
      (res) => {
        return res || 0
      }
    );
  }
}
