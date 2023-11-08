import { Switch, Text, TouchableOpacity, View } from 'react-native';

interface MenuItemProps {
    label: string;
    withSwitch?: boolean;
    current?: boolean;
    handler: (value?: boolean) => void;
}

export default function MenuItem(props: MenuItemProps) {

    if (props.withSwitch) return (
        <View className='flex flex-row bg-gray-200 p-3 justify-between rounded-lg m-1'>
            <Text className='text-lg'>{props.label}</Text>
            <Switch value={props.current} onValueChange={() => props.handler(!props.current)}/>
        </View>
    );

    return (
        <TouchableOpacity className='flex flex-row bg-gray-200 p-3 justify-between rounded-lg m-1' onPress={() => props.handler()}>
            <Text className='text-lg'>{props.label}</Text>
        </TouchableOpacity>
    );
}