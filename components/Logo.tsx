import { View, Text } from 'react-native';
import { ThemeMode } from '~/types/ThemeMode';

export type LogoStyleProps = {
    type?: ThemeMode;
}

export function Logo({ type = 'PRIMARY' }: LogoStyleProps) {
    const financeColor = type === 'PRIMARY' ? 'text-green-500' : 'text-black';
    const baseTextClass = 'font-bold text-3xl';

    return (
        <View className='flex-row gap-2'>
            <Text className={`text-white ${baseTextClass}`}>Your</Text>
            <Text className={`${financeColor} ${baseTextClass}`}>Finance</Text>
        </View>
    );
}