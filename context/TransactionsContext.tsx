import { useState, createContext, ReactNode, useContext, useEffect } from 'react';

import { Transaction } from '~/dtos/transaction.dto';

import { getTransactions } from '~/services/transactions';

type TransactionsContextType = {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  reloadTransactions: () => Promise<void>;
};

export const TransactionsContext = createContext<TransactionsContextType>({
  transactions: [],
  setTransactions: () => {},
  reloadTransactions: async () => {},
});

export function useTransactions() {
  return useContext(TransactionsContext);
}

type Props = {
  children: ReactNode;
};

export const TransactionsProvider = ({ children }: Props) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function reloadTransactions() {
    try {
      const fetched = await getTransactions();
      setTransactions(fetched);
    } catch (error) {
      alert(`Erro ao carregar transações iniciais: ${error}`);
    }
  }

  useEffect(() => {
    reloadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions, reloadTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};