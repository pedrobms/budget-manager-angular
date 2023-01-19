import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';


@NgModule({
  declarations: [
    HomeComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    UserModule,
    TransactionModule
  ]
})
export class MainModule { }
