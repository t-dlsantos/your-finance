import { View } from 'react-native';

import { Logo } from '~/components/Logo';
import { PickerOptions } from '~/types/PickerOptions';
import { ThemeMode } from '~/types/ThemeMode';
import { Select } from './Select';

interface Props {
  type?: ThemeMode;
  pickerOptions: PickerOptions;
  selectedItem: any;
  setSelectedItem: any;
}

export function Header({ type, pickerOptions, selectedItem, setSelectedItem }: Props) {
  return (
    <View className="w-full flex-row items-center">
      <Logo type={type} />

    </View>
  );
}