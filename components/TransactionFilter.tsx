import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Props {
  period: string;
  setPeriod: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
}

const TransactionFilter: React.FC<Props> = ({
  period,
  setPeriod,
  type,
  setType,
  category,
  setCategory,
}) => {
  return (
    <View style={styles.filters}>
      <Picker
        selectedValue={period}
        style={styles.picker}
        onValueChange={(value) => setPeriod(value)}>
        <Picker.Item label="Período" value="all" />
        <Picker.Item label="Hoje" value="today" />
        <Picker.Item label="Últimos 7 dias" value="7days" />
      </Picker>

      <Picker selectedValue={type} style={styles.picker} onValueChange={(value) => setType(value)}>
        <Picker.Item label="Tipo" value="all" />
        <Picker.Item label="Receita" value="Receita" />
        <Picker.Item label="Gasto" value="Gasto" />
      </Picker>

      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(value) => setCategory(value)}>
        <Picker.Item label="Categoria" value="all" />
        <Picker.Item label="Comida" value="Comida" />
        <Picker.Item label="Salário" value="Salário" />
        <Picker.Item label="Transporte" value="Transporte" />
        {/* Adicione mais categorias conforme necessário */}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  filters: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
  },
  picker: {
    color: '#fff',
    backgroundColor: '#222',
    marginBottom: 8,
    borderRadius: 8,
  },
});

export default TransactionFilter;
