import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';



@NgModule({
  declarations: [
    TransactionListComponent,
    TransactionDetailsComponent,
    TransactionFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TransactionListComponent
  ]
})
export class TransactionModule { }
