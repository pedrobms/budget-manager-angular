import { Component } from '@angular/core';
import { Transaction } from '../../transaction';
import { TransactionType } from '../../transaction-type';
import { TransactionService } from '../../transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent {
  transactions: Array<Transaction> = new Array<Transaction>();

  constructor (private transactionService: TransactionService) {}

  ngOnInit(): void {
    const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
    const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0];

    this.transactionService.getTransactionsBetweenDates(startDate, endDate).subscribe(
      data => {
        this.transactions = data;
      }
    );
  }

  getClassnameByType(transaction: Transaction): string {
    return transaction.type == TransactionType.EXPENSE ? 'table-danger' : 'table-primary';
  }
}
