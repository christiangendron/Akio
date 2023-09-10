import { Text, Switch, View } from 'react-native';
import { SettingsItemProps } from '../../types/SettingsItem';

export default function Setting(props: SettingsItemProps) {
    return (
        <View className='flex flex-row bg-slate-300 p-3 justify-between rounded-lg m-1'>
            <Text className='text-center text-lg'>{props.label}</Text>
            <Switch value={props.current} onValueChange={() => props.handler(!props.current)}/>
        </View>
    );
}