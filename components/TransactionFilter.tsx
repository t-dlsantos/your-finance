import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Category } from '~/types/Transaction';
import { getCategories } from '~/services/categories';

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
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  }

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
        <Picker.Item label="Receita" value="income" />
        <Picker.Item label="Gasto" value="expense" />
      </Picker>

      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(value) => setCategory(value)}>
        {/* Adicionando a opção "Todas" */}
        <Picker.Item label="Todas as categorias" value="all" />
        {categories.map((cat) => (
          <Picker.Item
            key={cat.id}
            label={cat.name}
            value={cat.id.toString()} // Certifique-se de passar o id como valor
          />
        ))}
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