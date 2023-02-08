import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TransactionType } from 'src/app/main/transaction/transaction-type';
import { BalanceService } from '../../balance.service';

@Component({
  selector: 'app-balance-panel',
  templateUrl: './balance-panel.component.html',
  styleUrls: ['./balance-panel.component.scss']
})
export class BalancePanelComponent implements OnInit, OnChanges {
  currentMonthBalance: number = 0;
  currentMonthIncome: number = 0;
  currentMonthExpense: number = 0;
  @Input() currentMonth: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  constructor(private balanceService: BalanceService) {}

  ngOnInit(): void {
    this.updateBalances(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0]
    );
  }

  ngOnChanges(): void {
    this.updateBalances(
      new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1).toISOString().split('T')[0],
      new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0).toISOString().split('T')[0]
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
}
