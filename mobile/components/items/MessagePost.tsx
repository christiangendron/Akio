import { Text, TouchableOpacity } from 'react-native';

interface MessagePostProps {
    message: string;
    action?: () => void;
}

export default function MessagePost(props: MessagePostProps) {
    return (
        <TouchableOpacity 
            className='rounded-lg m-2 bg-secondary dark:bg-secondaryDark'
            onPress={props.action}  
            disabled={!props.action}>
            <Text className='text-center p-5 dark:text-white'>{props.message}</Text>
        </TouchableOpacity>
    )
}
