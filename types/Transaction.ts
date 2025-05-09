export type TransactionType = 'income' | 'expense';
export type TransactionTypeLabel = 'Receita' | 'Despesa';

export interface Category {
  id: number;
  name: string;
  user: number;
}

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
  category_id: number;
  date: string;
}