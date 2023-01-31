import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastsContainer } from './components/toast/toasts-container.component';
import { VmessageComponent } from './components/vmessage/vmessage.component';



@NgModule({
  declarations: [
    VmessageComponent
  ],
  imports: [
    CommonModule,
    ToastsContainer
  ],
  exports: [
    ToastsContainer,
    VmessageComponent
  ]
})
export class SharedModule { }
