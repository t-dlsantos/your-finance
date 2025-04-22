export type TransactionType = 'income' | 'expense';
export type TransactionTypeLabel = 'Receita' | 'Despesa';

export interface Transaction {
  id: number;
  amount: number;
  title: string;
  transaction_type: TransactionType;
  category: object;
  user: number;
  date: string;
}