import { Component } from '@angular/core';
import { BalanceService } from 'src/app/main/transaction/balance.service';
import { TransactionType } from 'src/app/main/transaction/transaction-type';
import { CategoryService } from '../../category/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentMonth: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  currentMonthName: string = new Date().toLocaleString('pt-br', { month: 'long' }) + ' de ' + new Date().getFullYear();
  currentMonthBalance: number = 0;
  currentMonthIncome: number = 0;
  currentMonthExpense: number = 0;
  hasExpenseCategories: boolean = false;
  hasIncomeCategories: boolean = false;

  constructor(private balanceService: BalanceService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.updateBalances(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0]
    );

    this.getHasCategories();
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
    this.currentMonth = new Date(new Date(this.currentMonth).getFullYear(), new Date(this.currentMonth).getMonth() + (direction == 'next' ? 1 : -1), 1);
    this.currentMonthName = this.currentMonth.toLocaleString('pt-br', { month: 'long' }) + ' de ' + this.currentMonth.getFullYear();
    this.updateBalances(
      this.currentMonth.toISOString().split('T')[0],
      new Date(new Date(this.currentMonth).getFullYear(), new Date(this.currentMonth).getMonth() + 1, 0).toISOString().split('T')[0]
    );
  }

  getHasCategories(): void {
    this.categoryService.getCategories(TransactionType.EXPENSE).subscribe(
      data => {
        this.hasExpenseCategories = data.length > 0;
      }
    );

    this.categoryService.getCategories(TransactionType.INCOME).subscribe(
      data => {
        this.hasIncomeCategories = data.length > 0;
      }
    );
  }

}
