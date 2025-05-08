import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import TransactionFilter from '~/components/TransactionFilter';

import { Transaction } from '~/types/Transaction';

import { useTransactions } from '~/context/TransactionsContext';
import { Container } from '~/components/Container';
import { Logo } from '~/components/Logo';

export default function History() {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const { transactions } = useTransactions();

  const filteredTransactions = useMemo(() => {
    const now = new Date();
    return transactions.filter((tx) => {
      const txDate = new Date(`${tx.date}T00:00:00`);
      
      if (selectedPeriod === 'today') {
        if (txDate.toDateString() !== now.toDateString()) return false;
      }

      if (selectedPeriod === '7days') {
        const diff = Math.floor((now.getTime() - txDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diff > 7 || diff < 0) return false;
      }

      if (selectedType !== 'all' && tx.transaction_type !== selectedType) return false;
      if (selectedCategory !== 'all' && tx.category.name !== selectedCategory) return false;

      return true;
    });
  }, [transactions, selectedPeriod, selectedType, selectedCategory]);

  const grouped = useMemo(() => {
    const groups: Record<string, Transaction[]> = {};
    filteredTransactions.forEach((tx) => {
      if (!groups[tx.date]) groups[tx.date] = [];
      groups[tx.date].push(tx);
    });
    return groups;
  }, [filteredTransactions]);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: '2-digit' });
    return `${day} ${month} ${year}`;
  };

  return (
    <Container>
      <View style={styles.headerContainer}>
        <Logo />
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

      {Object.keys(grouped)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime()) // <-- ordena decrescente
        .map((date) => (
          <View key={date} style={styles.section}>
            <Text style={styles.date}>{formatDate(date)}</Text>
            {grouped[date].map((tx) => (
              <View key={tx.id} style={styles.card}>
                <Text style={styles.title}>{tx.title}</Text>
                <Text
                  style={[
                    styles.amount,
                    {
                      color: tx.transaction_type === 'income' ? '#2ecc71' : '#e74c3c',
                    },
                  ]}>
                  {tx.transaction_type === 'expense' ? '-' : '+'} R$ {tx.amount}
                </Text>
              </View>
            ))}
          </View>
      ))}
      </ScrollView>
    </Container>
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