import { Button, Text, View } from 'react-native';

import { Container } from '~/components/Container';
import { Header } from '~/components/Header';
import { useAuth } from '~/context/AuthContext';

export default function Profile() {
  const { onLogout } = useAuth()
  return (
    <Container>
      <Header type='PRIMARY' pickerOptions={['Teste', 'Ola mundo']} />
      <View className='flex-1 items-center justify-center'>
        <Text className='text-white'>Profile Tab</Text>
      </View>
      <View>
        <Button title='Sair da conta' onPress={onLogout}/>
      </View>
    </Container>
  );
}