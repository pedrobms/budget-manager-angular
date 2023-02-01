import { Component } from '@angular/core';
import { BalanceService } from 'src/app/main/transaction/balance.service';
import { TransactionType } from 'src/app/main/transaction/transaction-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentMonth: string = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
  currentMonthName: string = new Date().toLocaleString('pt-br', { month: 'long' }) + ' de ' + new Date().getFullYear();
  currentMonthBalance: number = 0;
  currentMonthIncome: number = 0;
  currentMonthExpense: number = 0;

  constructor(private balanceService: BalanceService) { }

  ngOnInit(): void {
    this.updateBalances(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0]
    );
  }

  updateBalances(startDate: string, endDate: string): void {
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

  changeMonth(direction: string): void {
    let newMonth: Date = new Date(this.currentMonth);
    newMonth.setMonth(newMonth.getMonth() + (direction == 'next' ? 1 : -1));
    this.currentMonth = newMonth.toISOString().split('T')[0];
    this.currentMonthName = newMonth.toLocaleString('pt-br', { month: 'long' }) + ' de ' + newMonth.getFullYear();
    this.updateBalances(
      new Date(newMonth.getFullYear(), newMonth.getMonth(), 1).toISOString().split('T')[0],
      new Date(newMonth.getFullYear(), newMonth.getMonth() + 1, 0).toISOString().split('T')[0]
    );
  }
}
