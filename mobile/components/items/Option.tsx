import { Text, TouchableOpacity } from 'react-native';

interface OptionProps {
    label: string,
    icon?: boolean,
    selected?: boolean,
    handler: () => void
    isLoading?: boolean,
}

export default function Option(props: OptionProps) {
    return (
        <TouchableOpacity onPress={props.handler} className='w-full p-5 bg-black rounded-lg items-center m-1' disabled={props.isLoading}>
            <Text className='text-center text-white'>{props.label}</Text>
        </TouchableOpacity>
    );
}