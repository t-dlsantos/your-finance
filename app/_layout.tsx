import { StatusBar, View } from 'react-native';
import '../global.css';

import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <>
      <View className="flex-1 bg-black">
        <StatusBar 
          barStyle='light-content'
          translucent
          backgroundColor='transparent'
        /> 
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: false, animation: 'none' }} />
        </Stack>
      </View>
    </>
  );
}