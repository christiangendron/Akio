import { Switch, Text, TouchableOpacity, View } from 'react-native';

interface MenuItemProps {
    label: string;
    subLabel?: string;
    withSwitch?: boolean;
    current?: boolean;
    handler: (value?: boolean) => void;
    disabled?: boolean;
    extraStyles?: string;
}

export default function MenuItem(props: MenuItemProps) {
    if (props.withSwitch) return (
        <View className={'flex flex-row bg-secondary dark:bg-secondaryDark p-3 items-center justify-between rounded-lg ' + props.extraStyles}>
            <View>
                <Text className='text-lg dark:text-white'>{props.label}</Text>
                {props.subLabel && <Text className='dark:text-white text-xs'>{props.subLabel}</Text>}
            </View>
            <Switch value={props.current} onValueChange={() => props.handler(!props.current)} disabled={props.disabled}/>
        </View>
    );

    return (
        <TouchableOpacity className={'flex flex-row bg-secondary dark:bg-secondaryDark p-3 justify-between rounded-lg' + props.extraStyles} onPress={() => props.handler()}>
            <Text className='dark:text-white'>{props.label}</Text>
        </TouchableOpacity>
    );
}