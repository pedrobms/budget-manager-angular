import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { Category } from '../../../category/category';
import { Transaction } from '../../transaction';
import { TransactionType } from '../../transaction-type';
import { TransactionService } from '../../transaction.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent {
  transactionId: number = 0;
  transaction: Transaction = new Transaction(0, '', 0, new Category(0, '', TransactionType.EXPENSE, new Date()), TransactionType.EXPENSE, new Date());

  constructor(
    private toastService: ToastService,
    private transactionService: TransactionService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.transactionId = params['id'];
    });
    this.loadTransaction();
  }

  loadTransaction() {
    this.transactionService.getTransactionById(this.transactionId).subscribe({
      next: (res: Transaction) => {
        this.transaction = res;
      },
      error: (err) => {
        this.toastService.show(`${err.error}`, { classname: 'bg-danger text-light', delay: 5000 });
      }
    });
  }

  edit(){
    this.transactionService.editTransaction(this.transaction).subscribe({
      next: () => {
        this.toastService.show('Transação editada com sucesso!', { classname: 'bg-success text-light', delay: 5000 });
        this.router.navigate(['/main']);
      },
      error: (err) => {
        this.toastService.show(`${err.error}`, { classname: 'bg-danger text-light', delay: 5000 });
      }
    });
  }

  delete(){
    this.transactionService.deleteTransaction(this.transaction.id).subscribe({
      next: () => {
        this.toastService.show('Transação excluída com sucesso!', { classname: 'bg-success text-light', delay: 5000 });
        this.router.navigate(['/main']);
      },
      error: (err) => {
        this.toastService.show(`${err.error}`, { classname: 'bg-danger text-light', delay: 5000 });
      }
    });
  }
}
