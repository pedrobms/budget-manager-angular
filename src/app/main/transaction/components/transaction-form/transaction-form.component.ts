import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/main/category/category';
import { CategoryService } from 'src/app/main/category/category.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { TransactionType } from '../../transaction-type';
import { TransactionService } from '../../transaction.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent {

  transactionForm: FormGroup = new FormGroup({});
  categories: Array<Category> = [];
  hasExpenseCategories: boolean = false;
  hasIncomeCategories: boolean = false;
  addingExpense: boolean = false;
  addingIncome: boolean = false;

  constructor(
    private toastService: ToastService,
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.transactionForm = this.formBuilder.group({
      description: [''],
      type: [],
      category: [''],
      value: [''],
      createdAt: ['']
    });
    this.getHasCategories();
  }

  loadCategories(type: string) {
    this.addingExpense = type == TransactionType.EXPENSE ? true : this.addingExpense = true;
    this.categoryService.getCategories(type).subscribe({
      next: (res: Array<Category>) => {
        this.categories = res.filter((category) => category.active);
        this.toastService.showInfo(`Cadastrando ${type === TransactionType.EXPENSE ? 'despesa' : 'receita'}`);
        this.transactionForm.reset();
      },
      error: (err) => {
        this.toastService.showError(err.error);
      }
    });
  }

  create() {
    this.transactionForm.value.type = this.addingExpense ? TransactionType.EXPENSE : TransactionType.INCOME;
    this.transactionForm.value.createdAt = new Date().toISOString();
    this.transactionService.addTransaction(this.transactionForm.value).subscribe({
      next: () => {
        this.toastService.showSuccess('Transação criada com sucesso!');
        this.router.navigate(['/main']);
      },
      error: (err) => {
        this.toastService.showError(err.error);
      }
    });
  }

  getHasCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.hasExpenseCategories = data.filter((category) => category.type === TransactionType.EXPENSE && category.active).length > 0;
        this.hasIncomeCategories = data.filter((category) => category.type === TransactionType.INCOME && category.active).length > 0;
      }
    );
  }

}
