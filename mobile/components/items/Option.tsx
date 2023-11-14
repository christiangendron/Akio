import { Text, TouchableOpacity } from 'react-native';

interface OptionProps {
    label: string,
    icon?: boolean,
    selected?: boolean,
    handler: () => void
    isLoading?: boolean,
}

export default function Option(props: OptionProps) {
    const style = props.selected ? ' bg-neutral-800' : ' bg-black';

    return (
        <TouchableOpacity onPress={props.handler} className={'w-full p-5 rounded-lg items-center m-1' + style} disabled={props.isLoading}>
            <Text className='text-center text-white'>{props.label}</Text>
        </TouchableOpacity>
    );
}