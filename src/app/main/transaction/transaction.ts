import { Category } from "../category/category";
import { TransactionType } from "./transaction-type"

export class Transaction {
  id: number;
  description: string;
  value: number;
  categoryName: string;
  category: Category;
  type: TransactionType;
  createdAt: Date;

  constructor(id: number, description: string, value: number, category: Category, type: TransactionType, createdAt: Date, categoryName: string) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.category = category;
    this.type = type;
    this.createdAt = createdAt;
    this.categoryName = categoryName;
  }
}
