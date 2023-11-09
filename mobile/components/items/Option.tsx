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
    const style = useRef('flex flex-row w-full justify-center p-5 bg-black rounded-lg m-1 items-center');

    if (props.selected) {
        style.current = 'flex flex-row w-full justify-center p-5 bg-gray-400 rounded-lg m-1 items-center'
    }

    if (props.isLoading) return (
        <View className={style.current}>
            <ActivityIndicator />
        </View>
    )

    return (
        <TouchableOpacity onPress={props.handler} className={style.current}>
            <Text className='text-center text-white'>{props.label}</Text>
        </TouchableOpacity>
    );
}