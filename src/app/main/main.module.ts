import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { CategoryModule } from './category/category.module';
import { BalanceModule } from './balance/balance.module';


@NgModule({
  declarations: [
    HomeComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    UserModule,
    TransactionModule,
    CategoryModule,
    BalanceModule
  ]
})
export class MainModule { }
