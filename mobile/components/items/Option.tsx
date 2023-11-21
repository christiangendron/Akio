import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface OptionProps {
    label: string,
    icon?: boolean,
    selected?: boolean,
    handler: () => void
    isLoading?: boolean,
}

/**
 * Option item component : Used by modal components to show different options.
 * @param props OptionProps
 * @returns JSX.Element
 */
export default function Option(props: OptionProps) {
    const [selected, setSelected] = useState<boolean>(props.selected || false);

    const style = selected ? ' bg-accentDark' : ' bg-black';

    const onPress = () => {
        setSelected(!selected);
        props.handler();
    };

    return (
        <TouchableOpacity 
            className={'w-full p-5 rounded-lg items-center m-1' + style}
            onPress={onPress} 
            disabled={props.isLoading}>
            <Text className='text-center text-white'>{props.label}</Text>
        </TouchableOpacity>
    );
}