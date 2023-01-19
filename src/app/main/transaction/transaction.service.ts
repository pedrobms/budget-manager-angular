import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/enviorement/environment';
import { AuthService } from '../../auth/auth.service';

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
}
