import { Text, View } from 'react-native';

import { Container } from '~/components/Container';
import { Header } from '~/components/Header';

export default function History() {
  return (
    <Container>
      <Header type='PRIMARY' pickerOptions={['Teste', 'Ola mundo']}/>
      <View className='flex-1 items-center justify-center'>
        <Text className='text-white'>History Tab</Text>
      </View>
    </Container>
  );
}