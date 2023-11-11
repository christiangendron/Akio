import { Text, TouchableOpacity, View } from 'react-native';

interface MessagePostProps {
    message: string;
    action?: () => void;
}

export default function MessagePost(props: MessagePostProps) {
    const content = <View className='rounded-lg m-2 bg-secondary dark:bg-secondaryDark'>
        <Text className='text-center p-5 dark:text-white'>
            {props.message}
        </Text>
    </View>

    if (props.action) return (
        <TouchableOpacity onPress={props.action}>
            {content}
        </TouchableOpacity>
    )

    return (content);
}
