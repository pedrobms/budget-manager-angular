import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';



@NgModule({
  declarations: [
    TransactionListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TransactionListComponent
  ]
})
export class TransactionModule { }
