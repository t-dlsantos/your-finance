import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
}

export function TabBarIcon({ name, color }: Props) {
  return ( 
    <MaterialIcons
      size={30} 
      name={name}
      color={color}
    />
  );
};