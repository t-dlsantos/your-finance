import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

import { Container } from '~/components/Container';
import { Header } from '~/components/Header';
import { useAuth } from '~/context/AuthContext';
import { useCategories } from '~/context/CategoriesContext';
import { createCategory } from '~/services/categories';

export default function Profile() {
  const { onLogout } = useAuth();
  const { categories, reloadCategories } = useCategories();
  const [newCategoryName, setNewCategoryName] = useState('');

  async function handleAddCategory() {
    if (!newCategoryName.trim()) return;

    try {
      await createCategory({ name: newCategoryName });
      setNewCategoryName('');
      reloadCategories();
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error);
      alert('Erro ao adicionar categoria');
    }
  }

  return (
    <Container>
      <Header type='PRIMARY' pickerOptions={['Teste', 'Ola mundo']} />

      <View className='p-4'>
        <Text className='text-white text-xl mb-2'>Categorias</Text>

        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text className='text-white border-b border-zinc-700 py-2'>{item.name}</Text>
          )}
        />

        <TextInput
          placeholder="Nova categoria"
          placeholderTextColor="#999"
          value={newCategoryName}
          onChangeText={setNewCategoryName}
          className='bg-zinc-800 text-white rounded px-3 py-2 mt-4'
        />

        <TouchableOpacity
          onPress={handleAddCategory}
          className='bg-green-600 rounded mt-2 p-3 items-center'
        >
          <Text className='text-white'>Adicionar Categoria</Text>
        </TouchableOpacity>
      </View>

      <View className='p-4'>
        <TouchableOpacity onPress={onLogout} className=' p-3 rounded items-center'>
          <Text className='text-red-600'>Sair da conta</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}
