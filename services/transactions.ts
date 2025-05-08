import { api, getAuthHeaders } from '.';
import { CreateTransactionDTO, Transaction } from '~/dtos/transaction.dto';

export async function createTransaction(data: CreateTransactionDTO): Promise<Transaction> {
  const headers = await getAuthHeaders();
  const response = await api.post('/transactions/', data, { headers });
  return response.data;
}

export async function getTransactions(): Promise<Transaction[]> {
  const headers = await getAuthHeaders();
  const response = await api.get('/transactions/', { headers });
  return response.data.results;
}