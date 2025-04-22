import { TransactionType, TransactionTypeLabel } from '~/types/Transaction';

export const TRANSACTION_TYPE_MAP: Record<TransactionTypeLabel, TransactionType> = {
  Receita: 'income',
  Despesa: 'expense',
};

export const TRANSACTION_TYPE_LABELS: Record<TransactionType, TransactionTypeLabel> = {
  income: 'Receita',
  expense: 'Despesa',
};
