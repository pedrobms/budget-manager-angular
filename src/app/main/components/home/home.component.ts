import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentMonth: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  currentMonthName: string = new Date().toLocaleString('pt-br', { month: 'long' }) + ' de ' + new Date().getFullYear();
  hasCategories: boolean = false;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getHasCategories();
  }

  changeMonth(direction: string): void {
    this.currentMonth = new Date(new Date(this.currentMonth).getFullYear(), new Date(this.currentMonth).getMonth() + (direction == 'next' ? 1 : -1), 1);
    this.currentMonthName = this.currentMonth.toLocaleString('pt-br', { month: 'long' }) + ' de ' + this.currentMonth.getFullYear();
  }

  getHasCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.hasCategories = data.length > 0;
      }
    );
  }
}
