import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '~/components/Button';

import { Header } from '~/components/Header';
import { Input } from '~/components/Input';
import { Select } from '~/components/Select';

import { formatCurrency } from '~/utils/formatCurrency';

export default function Modal() {
  const [value, setValue] = useState(formatCurrency('0.00'));
  const [type, setType] = useState('Receita');
  const [category, setCategory] = useState('Gym');
  const [description, setDescription] = useState('');

  function handleChange(text: string) {
    const formatted = formatCurrency(text);
    setValue(formatted);
  }

  function handleSaveCashFlow() {
    
  }

  function handleCloseModal() {
    router.dismissAll();
  }

  return (
    <SafeAreaView className={`flex-1 ${type === 'Receita' ? 'bg-green-500' : 'bg-red-500'}`}>
      <View className="h-60 flex-col justify-between p-5">
        <Header
          type="DARK"
          pickerOptions={['Gasto', 'Receita']}
          selectedItem={type}
          setSelectedItem={setType}
        />
        <TextInput
          value={value}
          keyboardType="numeric"
          className="text-4xl font-bold text-white"
          onChangeText={handleChange}
        />
      </View>
      <View className="flex-1 flex-col bg-black p-5">
        <Input title="Descrição" value={description} onChangeText={setDescription} />

        <View className="flex-1">
          <Text className="mb-3 text-white">Categoria</Text>
          <Select
            options={['Academia', 'Escola', 'Mercado']}
            selectedItem={category}
            setSelectedItem={setCategory}
            background
          />
        </View>
        <View className="gap-2">
          <Button title="Salvar" type="CONFIRM" onPress={handleSaveCashFlow}/>
          <Button title="Cancelar" type="CANCEL" onPress={handleCloseModal}/>
        </View>
      </View>
    </SafeAreaView>
  );
}