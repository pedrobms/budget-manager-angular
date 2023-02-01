import { Category } from "./category";
import { TransactionType } from "./transaction-type"

export class Transaction {
  id: number;
  description: string;
  value: number;
  categoryName: string;
  type: TransactionType;
  createdAt: Date;

  constructor(id: number, description: string, value: number, categoryName: string, type: TransactionType, createdAt: Date) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.categoryName = categoryName;
    this.type = type;
    this.createdAt = createdAt;
  }
}
