import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/main/category/category';
import { CategoryService } from 'src/app/main/category/category.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { TransactionService } from '../../transaction.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent {

  transactionForm: FormGroup = new FormGroup({});
  type: string = '';
  categories: Array<Category> = [];

  constructor(
    private toastService: ToastService,
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.type = params['type'];
    });
    this.transactionForm = this.formBuilder.group({
      description: [''],
      type: [this.type],
      category: [''],
      value: [''],
      createdAt: [new Date().toISOString()]
    });
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories(this.type).subscribe({
      next: (res: Array<Category>) => {
        this.categories = res;
      },
      error: (err) => {
        this.toastService.show(`${err.error}`, { classname: 'bg-danger text-light', delay: 5000 });
      }
    });
  }

  create() {
    this.transactionService.addTransaction(this.transactionForm.value).subscribe({
      next: () => {
        this.toastService.show('Transação adicionada', { classname: 'bg-success text-light', delay: 5000 });
        this.router.navigate(['/main']);
      },
      error: (err) => {
        this.toastService.show(`${err.error}`, { classname: 'bg-danger text-light', delay: 5000 });
      }
    });
  }

}
