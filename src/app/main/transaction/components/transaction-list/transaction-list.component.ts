import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '../../transaction';
import { TransactionType } from '../../transaction-type';
import { TransactionService } from '../../transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit, OnChanges {
  transactions: Array<Transaction> = new Array<Transaction>();
  @Input() currentMonth: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  constructor (private transactionService: TransactionService) {}

  ngOnChanges(): void {
    this.updateList(
      this.currentMonth.toISOString().split('T')[0],
      new Date(new Date(this.currentMonth).getFullYear(), new Date(this.currentMonth).getMonth() + 1, 0).toISOString().split('T')[0]
    );
  }

  ngOnInit(): void {
    this.updateList(
      this.currentMonth.toISOString().split('T')[0],
      new Date(new Date(this.currentMonth).getFullYear(), new Date(this.currentMonth).getMonth() + 1, 0).toISOString().split('T')[0]
    );
  }

  getCellColor(transaction: Transaction): string {
    return transaction.type == TransactionType.EXPENSE ? 'table-danger' : 'table-primary';
  }

  updateList(startDate: string, endDate: string): void {
    this.transactionService.getTransactionsBetweenDates(startDate, endDate).subscribe(
      data => {
        this.transactions = data;
        console.log(data);
      }
    );
  }

  loadNextPage(): void {
    this.updateList(
      this.currentMonth.toISOString().split('T')[0],
      new Date(new Date(this.currentMonth).getFullYear(), new Date(this.currentMonth).getMonth() + 1, 0).toISOString().split('T')[0]
    );
  }
}
