import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '~/components/CustomButton';

import { Header } from '~/components/Header';
import { Input } from '~/components/Input';
import { Select } from '~/components/Select';

import CurrencyInput from 'react-native-currency-input';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { createTransaction } from '~/services/transactions';
import { getCategories } from '~/services/categories';

import { TransactionTypeLabel } from '~/types/Transaction';

import { getTransactions } from '~/services/transactions';

import { TRANSACTION_TYPE_MAP } from '~/utils/transactions';
import { useTransactions } from '~/context/TransactionsContext';

import { CreateTransactionDTO } from '~/dtos/transaction.dto';
import { useCategories } from '~/context/CategoriesContext';
import { Logo } from '~/components/Logo';
import { Category } from '~/dtos/category.dto';

export default function Modal() {
  const [amount, setAmount] = useState(0);
  const [transactionTypeLabel, setTransactionTypeLabel] = useState<any>(1);
  const [category, setCategory] = useState<any>(null);
  const [title, setTitle] = useState('');

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const { setTransactions } = useTransactions();

  const { categories } = useCategories();

  async function handleSaveTransaction() {
    if (!category) {
      alert('Por favor, selecione uma categoria');
      return;
    }
    console.log(transactionTypeLabel)
    try {
      const newTransaction: CreateTransactionDTO = {
        amount,
        title,
        transaction_type: transactionTypeLabel === 1 ? 'income' : 'expense',
        date: date.toLocaleDateString('en-CA'),
        category_id: category,
      };
      console.log(newTransaction)
      const createdTransaction = await createTransaction(newTransaction);
      setTransactions((prev) => [createdTransaction, ...prev]);
      router.back();
    } catch (error) {
      console.error('Erro ao salvar transação:', error);
      alert('Erro ao salvar transação');
    }
  }

  function handleCloseModal() {
    router.dismissAll();
  }

  const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    if (selectedDate) {
      setShow(false);
      setDate(selectedDate);
    }
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <SafeAreaView
      className={`flex-1 ${transactionTypeLabel === 1 ? 'bg-green-500' : 'bg-red-500'}`}>
      <View className="h-60 flex-col justify-between p-5">
        <View className="flex flex-row justify-between">
          <Logo type="DARK" />
          <Select
            options={[
              { name: 'Receita', id: 1 },
              { name: 'Despesa', id: 2 },
            ]}
            selectedItem={transactionTypeLabel}
            setSelectedItem={setTransactionTypeLabel}
          />
        </View>
        <CurrencyInput
          value={amount}
          keyboardType="numeric"
          className="text-4xl font-bold text-white"
          prefix="R$"
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          onChangeValue={(value) => setAmount(value ?? 0)}
        />
      </View>
      <View className="flex-1 flex-col bg-black p-5">
        <Input title="Título" value={title} onChangeText={setTitle} />

        <View className="flex-1">
          <Text className="mb-3 text-white">Categoria</Text>
          <Select
            options={categories}
            selectedItem={category}
            setSelectedItem={setCategory}
            background
          />
          <View className="mt-4">
            <Text className="mb-2 text-white">Data</Text>
            <TouchableOpacity
              onPress={showDatepicker}
              className="flex-row items-center justify-between rounded-lg bg-zinc-900 p-3">
              <Text className="text-lg text-white">
                {date.toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </Text>
              <Text className="text-gray-400">Alterar</Text>
            </TouchableOpacity>
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode as any}
              is24Hour={true}
              onChange={onChange}
              display="spinner"
              locale="pt-BR"
            />
          )}
        </View>
        <View className="gap-2">
          <CustomButton title="Salvar" type="CONFIRM" onPress={handleSaveTransaction} />
          <CustomButton title="Cancelar" type="CANCEL" onPress={handleCloseModal} />
        </View>
      </View>
    </SafeAreaView>
  );
}
