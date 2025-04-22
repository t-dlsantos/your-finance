import { StatusBar } from 'expo-status-bar';
import '~/services/axiosSetup';
import '../global.css';

import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '~/context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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