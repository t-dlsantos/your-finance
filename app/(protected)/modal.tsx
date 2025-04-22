import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '~/components/CustomButton';

import { Header } from '~/components/Header';
import { Input } from '~/components/Input';
import { Select } from '~/components/Select';

import CurrencyInput from 'react-native-currency-input';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import api from '~/services/api';

import { Transaction, TransactionType, TransactionTypeLabel } from '~/types/Transaction';
import { TRANSACTION_TYPE_MAP } from '~/utils/transactions';

export default function Modal() {
  const [amount, setAmount] = useState(0);
  const [transactionTypeLabel, setTransactionTypeLabel] = useState<TransactionTypeLabel>('Receita');
  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  async function handleSaveTransaction() {
    try {
      await api.createTransaction({
        amount,
        title,
        transaction_type: TRANSACTION_TYPE_MAP[transactionTypeLabel],
        date: date.toLocaleDateString('en-CA'),
        category_id: 1,
      });
      router.push('/(protected)/(tabs)/history');
    } catch (error) {
      console.log(error);
    }
  }

  function handleCloseModal() {
    router.dismissAll();
  }

  const onChange = (event: DateTimePickerEvent, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <SafeAreaView
      className={`flex-1 ${transactionTypeLabel === 'Receita' ? 'bg-green-500' : 'bg-red-500'}`}>
      <View className="h-60 flex-col justify-between p-5">
        <Header
          type="DARK"
          pickerOptions={['Gasto', 'Receita']}
          selectedItem={transactionTypeLabel}
          setSelectedItem={setTransactionTypeLabel}
        />
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
            options={['Academia', 'Escola', 'Mercado']}
            selectedItem={category}
            setSelectedItem={setCategory}
            background
          />
          <View className="mt-4">
            <Text className="text-white">Data Selecionada</Text>
            <Text className="text-gray-400">{date.toLocaleDateString('pt-BR')}</Text>
          </View>
          <View className="w-32 mt-7">
            <TouchableOpacity onPress={showDatepicker} className='bg-zinc-800 rounded h-8 items-center justify-center'>
              <Text className='text-white'>Selecionar data</Text>
            </TouchableOpacity>
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              onChange={onChange}
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
