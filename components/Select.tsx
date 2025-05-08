import { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';

interface Props {
  options: any[];
  selectedItem: any;
  setSelectedItem: React.Dispatch<React.SetStateAction<any>>;
  background?: boolean;
}

export function Select({ options, selectedItem, setSelectedItem, background }: Props) {
  const [open, setOpen] = useState(false);

  const items = options.map((option) => ({
  label: option.name,
    value: option.id,
  }));

  return (
    <View className={`${background ? `w-full rounded-lg bg-zinc-900` : `w-40`}`}>
      <DropDownPicker
        open={open}
        value={selectedItem}
        items={items}
        setOpen={setOpen}
        setValue={setSelectedItem}
        style={{
          backgroundColor: background ? '#18181b' : 'transparent',
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
        listItemLabelStyle={{
          color: 'white',
        }}
        selectedItemLabelStyle={{
          color: 'white',
          fontWeight: 'bold',
        }}
        selectedItemContainerStyle={{
          backgroundColor: 'rgb(39 39 42)',
        }}
        schema={{
          label: 'label',
          value: 'value',
        }}
      />
    </View>
  );
}
