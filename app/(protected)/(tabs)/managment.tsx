import { Text, View } from 'react-native';

import { Container } from '~/components/Container';
import { Header } from '~/components/Header';

export default function Managment() {
  return (
    <Container>
      <Header type='PRIMARY' pickerOptions={['Teste', 'Ola mundo']}/>
      <View className='flex-1 items-center justify-center'>
        <Text className='text-white'>Managment Tab</Text>
      </View>
    </Container>
  );
}