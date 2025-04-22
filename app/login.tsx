import { View, Text, Button } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuth } from '~/context/AuthContext';
import { router } from 'expo-router';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { Logo } from '~/components/Logo';
import { Input } from '~/components/Input';
import { CustomButton } from '~/components/CustomButton';

export default function Login() {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { onLogin, onRegister } = useAuth();

  async function login() {
    const result = await onLogin!(username, password);
    
    if (result && result.error) {
      alert(result.msg);
    }

    router.replace('/(protected)/(tabs)');
  }

  async function register() {
    router.push('/register');
  }
  return (
    <View className="flex-1 items-center justify-center bg-black p-4">
      <View className="w-full flex-row items-center justify-center mb-4">
        <Text className="font-bold text-3xl text-white">Bem vindo ao </Text> 
        <Logo type="PRIMARY" />
      </View>

      <View className="w-full">
        <View className='mb-4'>
            <Input title="Username" onChangeText={setEmail} placeholder="Digite seu nome de usuário" />
            <Input title="Senha" onChangeText={setPassword} secureTextEntry={true} placeholder="Digite sua senha" />
        </View>

        <CustomButton type='PRIMARY' onPress={login} title="Fazer login" />
        <View className='flex-row items-center justify-center gap-2'>
            <Text className='text-gray-400 '>Não possui uma conta?</Text>
            <CustomButton onPress={register} title="Criar Agora" />
        </View>
      </View>
    </View>
  );
}
