import { Switch, Text, TouchableOpacity, View } from 'react-native';

interface MenuItemProps {
    label: string;
    withSwitch?: boolean;
    current?: boolean;
    handler: (value?: boolean) => void;
    disabled?: boolean;
    extraStyles?: string;
}

export default function MenuItem(props: MenuItemProps) {
    if (props.withSwitch) return (
        <View className={'flex flex-row bg-secondary dark:bg-secondaryDark p-3 items-center justify-between rounded-lg ' + props.extraStyles}>
            <Text className='dark:text-white'>{props.label}</Text>
            <Switch value={props.current} onValueChange={() => props.handler(!props.current)} disabled={props.disabled}/>
        </View>
    );

    return (
        <TouchableOpacity className={'flex flex-row bg-secondary dark:bg-secondaryDark p-3 justify-between rounded-lg' + props.extraStyles} onPress={() => props.handler()}>
            <Text className='dark:text-white'>{props.label}</Text>
        </TouchableOpacity>
    );
}