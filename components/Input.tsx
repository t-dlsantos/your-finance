import { Text, TextInput, TextInputProps, View } from 'react-native';

interface Props extends TextInputProps  {
  title: string;
  value?: string;
  onChangeText: (text: string) => void;
}

export function Input({ title, value, onChangeText, ...rest}: Props) {
  return (
    <View className="mb-3 flex flex-col gap-2">
      <Text className="text-white text-sm">{title}</Text>
      <TextInput
        className="w-full rounded-lg bg-zinc-900 p-4 text-white" 
        placeholder={value}
        placeholderTextColor="#666"
        onChangeText={onChangeText} 
        {...rest}
      />
    </View>
  );
}
