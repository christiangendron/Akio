import { Text, TouchableOpacity } from 'react-native';

interface PillProps {
    text: string;
    handler: () => void;
}

export default function Pill(props: PillProps) {
    return (
        <TouchableOpacity className='bg-gray-300 p-2 rounded-lg mr-1' onPress={props.handler}>
            <Text>{props.text}</Text>
        </TouchableOpacity>
    );
}