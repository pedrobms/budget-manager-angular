import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {

  categoryForm: FormGroup = new FormGroup({});

  constructor(
    public formBuilder: FormBuilder,
    public categoryService: CategoryService,
    public router: Router,
    public toastService: ToastService
  ) { }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      name: [''],
      type: ['']
    });
  }

  create() {
    this.categoryService.addCategory(this.categoryForm.value).subscribe({
      next: (res: any) => {
        this.toastService.show('Categoria criada', { classname: 'bg-success text-light', delay: 5000 });
        this.router.navigate(['/main']);
      },
      error: (err) => {
        this.toastService.show(`${err.error}`, { classname: 'bg-danger text-light', delay: 5000 });
      }
    });
  }

}
