import { Text, TextInput, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ButtonMode } from "~/types/ButtonMode";

interface Props extends TouchableOpacityProps {
    title: string;
    type?: ButtonMode;
    onPress: () => void;
}

export function CustomButton({ title, type, onPress }: Props) {
    const getBackgroundColor = () => {
        switch (type) {
            case 'CONFIRM':
                return 'bg-zinc-800';
            case 'CANCEL':
                return 'bg-zinc-700';
            case 'DANGER':
                return 'bg-red-600';
            case 'PRIMARY':
                return 'bg-green-600';
            default:
                return 'transparent';
        }
    };

    return (
        <TouchableOpacity className={`h-14 ${getBackgroundColor()} justify-center items-center rounded-lg`} onPress={onPress}>
            <Text className="text-white text-base font-bold">
                { title }
            </Text>
        </TouchableOpacity>
    );
}