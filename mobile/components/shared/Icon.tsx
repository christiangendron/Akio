import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import CustomActivityIndicator from './CustomActivityIndicator';

type IconProps = {
    icon: JSX.Element,
    handler: () => void,
    isLoading?: boolean,
    extraStyles?: string,
}

export default function Icon(props: IconProps) {

    if (props.isLoading) {
        return (
            <View className={'' + props.extraStyles}>
                <CustomActivityIndicator />
            </View>
        );
    }

    return (
        <TouchableOpacity onPress={props.handler} className={'' + props.extraStyles}>
            {props.icon}
        </TouchableOpacity>
    );
}