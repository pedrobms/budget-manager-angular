import { Component } from '@angular/core';
import { BalanceService } from 'src/app/transaction/balance.service';
import { TransactionType } from 'src/app/transaction/transaction-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentMonthName: string = new Date().toLocaleString('pt-br', { month: 'long' });
  currentMonthBalance: any;
  currentMonthIncome: any;
  currentMonthExpense: any;

  constructor(private balanceService: BalanceService) { }

  ngOnInit(): void {
    this.balanceService.getBalanceByMonth(new Date().getMonth() + 1).subscribe(
      data => {
        this.currentMonthBalance = data;
      }
    );

    this.balanceService.getBalanceByType(TransactionType.INCOME).subscribe(
      data => {
        this.currentMonthIncome = data;
      }
    );

    this.balanceService.getBalanceByType(TransactionType.EXPENSE).subscribe(
      data => {
        this.currentMonthExpense = data;
      }
    );
  }
}
