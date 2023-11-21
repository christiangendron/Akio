import { Text, TouchableOpacity } from 'react-native';

interface PillProps {
    text: string;
    handler: () => void;
}

/**
 * Pill component : Used to show community tag, username, etc.
 * @param props PillProps
 * @returns JSX.Element
 */
export default function Pill(props: PillProps) {
    return (
        <TouchableOpacity className='bg-black p-2 rounded-lg mr-1' onPress={props.handler}>
            <Text className='text-white'>{props.text}</Text>
        </TouchableOpacity>
    );
}