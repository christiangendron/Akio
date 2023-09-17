import { Image, Text, TouchableOpacity, View } from 'react-native';
import { OptionProps } from '../../types/Options';
import { useRef } from 'react';

export default function Option(props: OptionProps) {
    const style = useRef('flex flex-row w-full justify-center p-5 bg-gray-50 rounded-lg m-1 items-center');

    if (props.selected) {
        style.current = 'flex flex-row w-full justify-center p-5 bg-gray-400 rounded-lg m-1 items-center'
    }

    return (
        <TouchableOpacity onPress={props.handler} className={style.current}>
            <Text className='text-center'>{props.label}</Text>
        </TouchableOpacity>
    );
}