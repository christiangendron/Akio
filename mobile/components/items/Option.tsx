import { Image, Text, TouchableOpacity, View } from 'react-native';
import { OptionProps } from '../../types/Options';
import { useRef } from 'react';

export default function Option(props: OptionProps) {
    const style = useRef('flex flex-row w-full justify-center p-5 bg-slate-50 rounded-lg m-1 items-center');

    if (props.selectable && props.filter == props.label.toLowerCase()) {
        style.current = 'flex flex-row w-full justify-center p-5 bg-slate-400 rounded-lg m-1 items-center'
    }
    
    const icon = props.icon ? 
    <Image source={require(`../../assets/icons/best.png`)} className='mx-2 w-5 h-5' /> :
    <></>;

    return (
        <TouchableOpacity onPress={props.handler} className={style.current}>
            {icon}
            <Text className='text-center text-lg'>{props.label}</Text>
        </TouchableOpacity>
    );
}