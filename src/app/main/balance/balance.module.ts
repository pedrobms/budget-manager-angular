import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalancePanelComponent } from './components/balance-panel/balance-panel.component';
import { BalanceCardComponent } from './components/balance-card/balance-card.component';



@NgModule({
  declarations: [
    BalancePanelComponent,
    BalanceCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BalancePanelComponent
  ]
})
export class BalanceModule { }
