import { Category } from "./category.dto";

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: number;
  amount: number;
  title: string;
  transaction_type: TransactionType;
  category: Category;
  category_id?: number;
  user: number;
  date: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTransactionDTO {
  title: string;
  amount: number;
  transaction_type: TransactionType;
  date: string;
  category_id: number;
} 