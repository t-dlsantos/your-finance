import { Text, View } from 'react-native';

import { Container } from '~/components/Container';
import { Header } from '~/components/Header';
import { Logo } from '~/components/Logo';

export default function Home() {
  return (
    <Container>
      <View>
        <Logo />
      </View>
      <View className='flex-1 items-center justify-center'>
        <Text className='text-white'>Profile Tab</Text>
      </View>
    </Container>
  );
}