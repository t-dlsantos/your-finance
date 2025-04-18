import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import TransactionFilter from '~/components/TransactionFilter';

//Dados mocados
const transactions = [
  {
    id: 1,
    title: 'Salário',
    amount: 3000,
    type: 'Receita',
    category: 'Salário',
    date: '2025-04-10',
  },
  {
    id: 2,
    title: 'Almoço',
    amount: 45,
    type: 'Gasto',
    category: 'Comida',
    date: '2025-04-13',
  },
  {
    id: 3,
    title: 'Uber',
    amount: 22,
    type: 'Gasto',
    category: 'Transporte',
    date: '2025-04-13',
  },
  {
    id: 4,
    title: 'Freela',
    amount: 800,
    type: 'Receita',
    category: 'Salário',
    date: '2025-04-12',
  },
];

const History = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTransactions = useMemo(() => {
    const now = new Date();
    return transactions.filter((tx) => {
      const txDate = new Date(tx.date);

      if (selectedPeriod === 'today') {
        if (txDate.toDateString() !== now.toDateString()) return false;
      }

      if (selectedPeriod === '7days') {
        const diff = Math.floor((now.getTime() - txDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diff > 7) return false;
      }

      if (selectedType !== 'all' && tx.type !== selectedType) return false;
      if (selectedCategory !== 'all' && tx.category !== selectedCategory) return false;

      return true;
    });
  }, [selectedPeriod, selectedType, selectedCategory]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof transactions> = {};
    filteredTransactions.forEach((tx) => {
      if (!groups[tx.date]) {
        groups[tx.date] = [];
      }
      groups[tx.date].push(tx);
    });
    return groups;
  }, [filteredTransactions]);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }); // ex: Jan
    return `${day} ${month}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          Your <Text style={styles.green}>Finance</Text>
        </Text>
        <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
          <Text style={styles.menuIcon}>...</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll}>
        {showFilters && (
          <TransactionFilter
            period={selectedPeriod}
            setPeriod={setSelectedPeriod}
            type={selectedType}
            setType={setSelectedType}
            category={selectedCategory}
            setCategory={setSelectedCategory}
          />
        )}

        {Object.keys(grouped).length === 0 && (
          <Text style={styles.empty}>Nenhuma transação encontrada.</Text>
        )}

        {Object.keys(grouped).map((date) => (
          <View key={date} style={styles.section}>
            <Text style={styles.date}>{formatDate(date)}</Text>
            {grouped[date].map((tx) => (
              <View key={tx.id} style={styles.card}>
                <Text style={styles.title}>{tx.title}</Text>
                <Text
                  style={[
                    styles.amount,
                    {
                      color: tx.type === 'Receita' ? '#2ecc71' : '#e74c3c',
                    },
                  ]}>
                  {tx.type === 'Gasto' ? '-' : '+'} R$ {tx.amount}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  green: {
    color: '#2ecc71',
  },
  menuIcon: {
    fontSize: 22,
    color: '#fff',
  },
  scroll: {
    marginTop: 10,
  },
  section: {
    marginBottom: 24,
  },
  date: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 4,
  },
  card: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  empty: {
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default History;
