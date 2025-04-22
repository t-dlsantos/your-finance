import { Transaction } from "~/types/Transaction";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { ACCESS_TOKEN_KEY } from '~/context/AuthContext';

const BASE_URL = 'http://10.0.2.2:8000/api';

async function createTransaction(newTransaction: Omit<Transaction, 'user' | 'id'>) {
  try {
    const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    const response = await axios.post(`${BASE_URL}/transactions/`, newTransaction, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('Resposta da transação:', response.status, response.statusText);
    console.log('Dados da resposta:', response.data);

    return response.data;
  } catch (error) {
    console.error('Erro durante a criação da transação:', error);
    throw error;
  }
}

async function getTransactions() {
  try {
    const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    
    if (!token) {
      throw new Error('Token de autenticação não encontrado');
    }

    const response = await axios.get(`${BASE_URL}/transactions/`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('Resposta da transação:', response.status, response.statusText);
    console.log('Dados da resposta:', response.data);

    return response.data.results;
  } catch (error) {
    console.error('Erro durante a criação da transação:', error);
    throw error;
  }
}

export default {
  createTransaction,
  getTransactions
};