import { TransactionType } from "../transaction/transaction-type";

export class Category {
  id: number;
  name: string;
  type: TransactionType;
  active: boolean;
  createdAt: Date;

  constructor(id: number, name: string, type: TransactionType, createdAt: Date, active: boolean) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.createdAt = createdAt;
    this.active = active;
  }
}
