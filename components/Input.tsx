import { Text, TextInput, View } from 'react-native';

interface Props {
  title: string;
  value: string;
  onChangeText: (text: string) => void;
}

export function Input({ title, value, onChangeText }: Props) {
  return (
    <View className="mb-3 flex flex-col gap-2">
      <Text className="text-white">{title}</Text>
      <TextInput
        className="w-full rounded-lg bg-zinc-800 p-4 text-white" 
        value={value}
        onChangeText={onChangeText}  
      />
    </View>
  );
}
