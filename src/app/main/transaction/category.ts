import { TransactionType } from "./transaction-type";

export class Category {
  id: number;
  name: string;
  type: TransactionType;
  createdAt: Date;

  constructor(id: number, name: string, type: TransactionType, createdAt: Date) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.createdAt = createdAt;
  }
}
