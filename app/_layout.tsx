import { StatusBar } from 'expo-status-bar';
import '../global.css';

import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AuthProvider } from '~/context/AuthContext';
import { TransactionsProvider } from '~/context/TransactionsContext';
import { CategoriesProvider } from '~/context/CategoriesContext';

export default function RootLayout() {
  return (
    <AuthProvider>

          <GestureHandlerRootView>
            <SafeAreaProvider>
                <StatusBar style="auto" />
                <Stack screenOptions={{ headerShown: false }} />
            </SafeAreaProvider>
          </GestureHandlerRootView>

    </AuthProvider>
  );
}