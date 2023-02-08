import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionType } from 'src/app/main/transaction/transaction-type';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { Category } from '../../category';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent {
  categoryId: number = 0;
  category: Category = new Category(0, '', TransactionType.EXPENSE, new Date(), true);

  constructor(
    private toastService: ToastService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.categoryId = params['id'];
    });
    this.loadCategory();
  }

  loadCategory() {
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (res: Category) => {
        this.category = res;
      },
      error: (err) => {
        this.toastService.showError(err.error);
      }
    });
  }

  edit() {
    this.categoryService.updateCategory(this.category).subscribe({
      next: () => {
        this.toastService.showSuccess('Categoria editada com sucesso!');
        this.router.navigate(['/main/category']);
      },
      error: (err) => {
        this.toastService.showError(err.error);
      }
    });
  }

}
