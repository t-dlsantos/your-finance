import { Text, TextInput, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ButtonMode } from "~/types/ButtonMode";

interface Props extends TouchableOpacityProps {
    title: string;
    type: ButtonMode;
    onPress: () => void;
}

export function Button({ title, type, onPress }: Props) {
    const getBackgroundColor = () => {
        switch (type) {
            case 'CONFIRM':
                return 'bg-zinc-800';
            case 'CANCEL':
                return 'bg-zinc-700';
            case 'DANGER':
                return 'bg-red-600';
            case 'PRIMARY':
                return 'bg-blue-600';
            default:
                return 'bg-zinc-700';
        }
    };

    return (
        <TouchableOpacity className={`w-full h-14 ${getBackgroundColor()} justify-center items-center rounded-lg`} onPress={onPress}>
            <Text className="text-white text-base font-bold">
                { title }
            </Text>
        </TouchableOpacity>
    );
}