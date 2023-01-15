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
    const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
    const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0];

    this.balanceService.getBalanceBetweenDates(startDate, endDate).subscribe(
      data => {
        this.currentMonthBalance = data;
      }
    );

    this.balanceService.getBalanceBetweenDatesByType(startDate, endDate, TransactionType.INCOME).subscribe(
      data => {
        this.currentMonthIncome = data;
      }
    );

    this.balanceService.getBalanceBetweenDatesByType(startDate, endDate, TransactionType.EXPENSE).subscribe(
      data => {
        this.currentMonthExpense = data;
      }
    );
  }
}
