import { Switch, Text, TouchableOpacity, View } from 'react-native';

interface MenuItemProps {
    label: string;
    withSwitch?: boolean;
    current?: boolean;
    handler: (value?: boolean) => void;
}

export default function MenuItem(props: MenuItemProps) {

    if (props.withSwitch) return (
        <View className='flex flex-row bg-secondary dark:bg-secondaryDark p-3 justify-between rounded-lg mx-2 my-1'>
            <Text className='text-lg dark:text-white'>{props.label}</Text>
            <Switch value={props.current} onValueChange={() => props.handler(!props.current)}/>
        </View>
    );

    return (
        <TouchableOpacity className='flex flex-row bg-secondary dark:bg-secondaryDark p-3 justify-between rounded-lg mx-2 mb-2' onPress={() => props.handler()}>
            <Text className='text-lg dark:text-white'>{props.label}</Text>
        </TouchableOpacity>
    );
}