import { View } from 'react-native';
import { TabBarIcon } from '~/components/TabBarIcon';
import '../global.css';

export function AddButtom() {
  return (
    <View className='w-14 h-14 bg-green-500 rounded-full justify-center items-center -mt-8'>
      <TabBarIcon name="add" color='#000' />
    </View>
  );
}