import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { RouterModule } from '@angular/router';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';



@NgModule({
  declarations: [
    CategoryFormComponent,
    CategoryListComponent,
    CategoryDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ]
})
export class CategoryModule { }
