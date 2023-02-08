import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { Category } from '../../category';
import { CategoryService } from '../../category.service';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: Array<Category> = new Array<Category>();

  constructor(private categoryService: CategoryService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.updateList();
  }

  updateList(): void {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });;
      }
    );
  }

  changeActivation(category: Category): void {
    category.active = !category.active;
    this.categoryService.updateCategory(category).subscribe({
      next: () => {
        this.toastService.showSuccess(`Categoria ${category.active ? 'ativada' : 'desativada'} com sucesso!`);
        this.updateList();
      },
      error: (err) => {
        this.toastService.showError(err.error);
      }
    });
  }
}
