import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useRef } from 'react';

interface OptionProps {
    label: string,
    icon?: boolean,
    selected?: boolean,
    handler: () => void
    isLoading?: boolean,
}

export default function Option(props: OptionProps) {
    const style = 'w-full p-5 bg-black rounded-lg items-center m-1';

    if (props.isLoading) return (
        <View className={style}>
            <ActivityIndicator />
        </View>
    )

    return (
        <TouchableOpacity onPress={props.handler} className={style}>
            <Text className='text-center text-white'>{props.label}</Text>
        </TouchableOpacity>
    );
}