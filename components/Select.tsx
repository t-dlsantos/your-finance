import { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { PickerOptions } from '~/types/PickerOptions';

interface Props {
  options: PickerOptions;
  selectedItem: any;
  setSelectedItem: any;
  background?: true | false;
}

export function Select({ options, selectedItem, setSelectedItem, background }: Props) {
  const [open, setOpen] = useState(false);

  const items = options.map(option => ({
    label: option,
    value: option
  }));

  return (
    <View className={`${background ? `bg-zinc-900 w-full rounded-lg`: `w-40`}`}>
      <DropDownPicker
        open={open}
        value={selectedItem}
        items={items}
        setOpen={setOpen}
        setValue={setSelectedItem}
        style={{
          backgroundColor: background ? '#27272a' : 'transparent',
          borderColor: 'transparent',
        }}
        textStyle={{
          color: 'white',
        }}
        dropDownContainerStyle={{
          backgroundColor: 'rgb(24 24 27)',
          borderColor: 'rgb(82 82 91)',
        }}
        placeholder="Selecione"
        placeholderStyle={{
          color: 'white',
        }}
      />
    </View>
  );
}