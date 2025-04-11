import { SafeAreaView } from 'react-native';

export function Container ({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView className='flex-1 justify-center items-center p-5 bg-black'>
      {children}
    </SafeAreaView>
  );
};