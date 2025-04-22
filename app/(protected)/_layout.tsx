import { View, ActivityIndicator } from 'react-native';

import { Redirect, Stack } from 'expo-router';
import { useAuth } from '~/context/AuthContext';

export const unstable_settings = {
  initialRouteName: "(tabs)",
}

export default function AppLayout() {
  const { authState } = useAuth();

  if (authState?.isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!authState?.authenticated) {
    console.log(`User is not authenticated: ${authState?.authenticated}`)
    console.log('Redirecting to login')
    return <Redirect href="/login" />
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: false, animation: 'none' }} />
    </Stack>
  );
}