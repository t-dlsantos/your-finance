import { View, Text } from 'react-native';
import { useAuth } from '~/context/AuthContext';
import { router } from 'expo-router';
import { useState } from 'react';
import { Logo } from '~/components/Logo';
import { Input } from '~/components/Input';
import { CustomButton } from '~/components/CustomButton';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('normal');

  const { onRegister } = useAuth();

  async function handleRegister() {
    const result = await onRegister!(email, password, username, userType);
    
    if (result && result.error) {
      alert(result.msg);
    } else {
      router.replace('/login');
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-black p-4">
      <View className="w-full flex-row items-center justify-center mb-4">
        <Text className="font-bold text-3xl text-white">Criar conta no </Text> 
        <Logo type="PRIMARY" />
      </View>

      <View className="w-full">
        <View className='mb-4'>
          <Input 
            title="Username" 
            onChangeText={setUsername} 
            placeholder="Digite seu nome de usuário"
          />
          <Input 
            title="Email" 
            onChangeText={setEmail} 
            placeholder="Digite seu email"
            keyboardType="email-address"
          />
          <Input 
            title="Senha" 
            onChangeText={setPassword} 
            secureTextEntry={true}
            placeholder="Digite sua senha"
          />
        </View>

        <CustomButton 
          type='PRIMARY' 
          onPress={handleRegister} 
          title="Criar conta" 
        />
        
        <View className='flex-row items-center justify-center gap-2 mt-4'>
          <Text className='text-gray-400'>Já possui uma conta?</Text>
          <CustomButton 
            onPress={() => router.replace('/login')} 
            title="Fazer login" 
          />
        </View>
      </View>
    </View>
  );
}