import { Category } from "./category";
import { TransactionType } from "./transaction-type"

export class Transaction {
  id: number;
  description: string;
  value: number;
  category: Category;
  type: TransactionType;
  createdAt: Date;

  constructor(id: number, description: string, value: number, category: Category, type: TransactionType, createdAt: Date) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.category = category;
    this.type = type;
    this.createdAt = createdAt;
  }
}
