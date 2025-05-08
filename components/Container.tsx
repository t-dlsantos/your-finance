import { SafeAreaView } from 'react-native-safe-area-context';

export function Container ({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView className='flex-1 p-5 bg-black'>
      {children}
    </SafeAreaView>
  );
};