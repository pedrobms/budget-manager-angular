import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastsContainer } from './components/toast/toast-container.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ToastsContainer
  ],
  exports: [
    ToastsContainer
  ]
})
export class SharedModule { }
