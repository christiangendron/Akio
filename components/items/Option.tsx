import { Image, Text, TouchableOpacity, View } from 'react-native';
import { timeSince } from '../../tools/Formating';
import { OptionProps } from '../../types/Options';

/**
 * Option component for items in modal window.
 * @param props needs an icon, a text and a function
 */
export default function Option(props: OptionProps) {

    const icon = props.icon ? 
    <Image source={require(`../../assets/icons/best.png`)} className='mx-2 w-5 h-5 place-self-start' /> :
    <></>;

    return (
        <TouchableOpacity onPress={props.handler} className="flex flex-row w-full justify-center p-5 bg-slate-200 rounded-lg m-1 items-center">
            {icon}
            <Text className='text-center'>{props.label}</Text>
        </TouchableOpacity>
    );
}