import { Text, Switch, View } from 'react-native';

interface SettingsItemProps {
    label: string;
    current: boolean;
    handler: (value: boolean) => void;
}

export default function Setting(props: SettingsItemProps) {
    return (
        <View className='flex flex-row bg-gray-300 p-3 justify-between rounded-lg m-1'>
            <Text className='text-lg'>{props.label}</Text>
            <Switch value={props.current} onValueChange={() => props.handler(!props.current)}/>
        </View>
    );
}